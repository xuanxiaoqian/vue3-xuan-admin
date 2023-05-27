import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import { frameworkType } from '@/utils/http/axios'
import { default as Axios, AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, default as axios } from 'axios'
import { ElNotification } from 'element-plus'
import { HEAD_TOKEN } from '../constant'
import { getCacheRequest, setCacheRequest } from './cacheRequest'
import { addPendingRequest, removePendingRequest } from './cancelRepeatRequest'
import defaultConfig from './defaultConfig'
import { CANCELTTYPE, ResultData, responseHandleObject } from './types'


const responseHandle = {
  200: (response: AxiosResponse) => {
    const data = response.data as ResultData
    if (data?.msg) {
      ElNotification({
        title: '成功',
        message: data.msg,
        type: 'success',
      })
    }

    return Promise.resolve(response.data)
  },
  203: (err: AxiosResponse) => {
    const data = err.data as ResultData

    if (!axios.isCancel(err)) {
      ElNotification({
        title: '异常错误',
        message: data?.msg,
        type: 'error',
      })
    }

    return Promise.reject(err)
  },

  // token问题
  403: (err: AxiosError) => {
    const data = err?.response?.data as ResultData
    if (data?.msg) {
      ElNotification({
        title: '认证异常',
        message: data?.msg,
        type: 'error',
      })
    }

    const userStore = useUserStore()
    userStore.resetAllUserData()
    setTimeout(() => router.go(-1), 1000)

    return Promise.reject(err)
  },

  default: (err: AxiosError) => {
    const data = err.response?.data as ResultData
    const status = err.response?.status
    const statusText = err.response?.statusText

    if (!axios.isCancel(err)) {
      ElNotification({
        title: '异常错误',
        message: data?.msg ?? (`后端错误: ${status} -> ${statusText}`),
        type: 'error',
      })
    }

    return Promise.reject(err)
  }
} as responseHandleObject

export class Interceptors {
  public instance: AxiosInstance

  constructor() {
    this.instance = Axios.create(defaultConfig)

    this.init()
  }

  // 请求拦截器
  requestInterceptors() {
    this.instance.interceptors.request.use((config) => {
      const userStore = useUserStore()
      config.headers[HEAD_TOKEN] = userStore.token

      getCacheRequest(config)

      addPendingRequest(config)

      return config
    }, (err: AxiosError) => {
      return Promise.reject(err)
    })
  }

  // 响应拦截器
  responseInterceptors() {
    this.instance.interceptors.response.use((response) => {
      const data = response.data as ResultData
      const { config } = response

      setCacheRequest(response)

      removePendingRequest(config)

      return responseHandle[data?.code]?.(response) ?? responseHandle['default']?.(response)
    }, (err: AxiosError) => {
      const data = err.response?.data as ResultData

      return responseHandle[data?.code]?.(err) ?? responseHandle['default']?.(err)
    })
  }

  private init() {
    this.requestInterceptors()
    this.responseInterceptors()
  }

  get<T = any>(url: string, myConfig?: frameworkType) {
    return this.request<T>({ method: 'get', url }, myConfig)
  }

  post<T = any>(url: string, data?: any, myConfig?: frameworkType) {
    return this.request<T>({ method: 'post', url, data }, myConfig)
  }

  put<T = any>(url: string, data?: any, myConfig?: frameworkType) {
    return this.request<T>({ method: 'put', url, data }, myConfig)
  }

  delete<T = any>(url: string, data?: any, myConfig?: frameworkType) {
    const params = new URLSearchParams(data).toString()
    return this.request<T>({ method: 'delete', url: `${url}?${params}` }, myConfig)
  }

  request<T>(config: AxiosRequestConfig, myConfig?: frameworkType): Promise<ResultData<T>> {
    return new Promise((resolve, reject) => {
      this.instance.request<ResultData<T>, ResultData<T>>(Object.assign(config, { myConfig: myConfig })).then(res => resolve(res)).catch(err => {
        if (axios.isCancel(err)) {
          const cancle = JSON.parse(err.message as string) as { data: any, type: CANCELTTYPE }

          switch (cancle.type) {
            case CANCELTTYPE.CACHE:
              return resolve(cancle.data)
            case CANCELTTYPE.REPEAT:
              return reject(err)
          }

        } else {
          return reject(err)
        }
      })
    })
  }


  getInterceptors() {
    return this.instance
  }
}
const instance = new Interceptors()

export default instance
