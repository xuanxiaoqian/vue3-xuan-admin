import axios, { InternalAxiosRequestConfig } from 'axios'
import { CANCELTTYPE } from './types'
import { requestDateKey } from './utils'

const pendingRequests = [] as any[] // 请求列表

export const addPendingRequest = (config: InternalAxiosRequestConfig) => {

  if (!config.cancelToken) {
    const source = axios.CancelToken.source()
    config.cancelToken = source.token

    const hits = pendingRequests.filter((item) => item.key === requestDateKey(config))

    hits.map((item) => item.source.cancel(JSON.stringify({ data: '重复请求,已取消', type: CANCELTTYPE.REPEAT })))

    pendingRequests.push({ key: requestDateKey(config), source })
  }
}

export const removePendingRequest = (config: InternalAxiosRequestConfig) => {

  const index = pendingRequests.findIndex((item) => item.key === requestDateKey(config))
  if (index > -1) {
    pendingRequests.splice(index, 1)
  }

}