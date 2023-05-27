import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { CANCELTTYPE } from './types'
import { getTimeAfterMinutes, requestDateKey } from './utils'

const requestDate = new Map<string, { data: any, exppries: number }>()  // 数据缓存Map

export const getCacheRequest = (config: InternalAxiosRequestConfig) => {
  if (config.myConfig?.cache ?? config.framework?.cache) {
    const data = requestDate.get(requestDateKey(config))

    if (data && (Date.now() < data.exppries)) {
      config.cancelToken = new axios.CancelToken(cancel =>{
        cancel(JSON.stringify({ data: data.data, type: CANCELTTYPE.CACHE }))
      })
    }
  }
}

export const setCacheRequest = (response: AxiosResponse) => {
  const { config } = response

  if (config.myConfig?.cache ?? config.framework?.cache) {
    requestDate.set(requestDateKey(config), {
      data: response.data,
      exppries: getTimeAfterMinutes(config.myConfig?.exppries ?? config.framework?.exppries ?? 0)
    })
  }
}