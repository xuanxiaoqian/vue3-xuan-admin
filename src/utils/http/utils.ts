import { InternalAxiosRequestConfig } from 'axios'


/**
 * 拼接请求的key
 * @param data
 * @returns
 */
export const requestDateKey = (data: InternalAxiosRequestConfig) => {
  return data.url + JSON.stringify(data.data) + data.method || ''
}

/**
 * 用于获得指定分钟之后的时间戳
 * @param minutes
 * @returns
 */
 export const getTimeAfterMinutes = (minutes: number): number => {
  const date = new Date()
  date.setMinutes(date.getMinutes() + minutes)

  return date.getTime()
}