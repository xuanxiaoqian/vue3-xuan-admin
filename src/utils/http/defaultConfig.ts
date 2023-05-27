import { AxiosRequestConfig } from 'axios'

export const defaultConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  framework: {
    cache: false, // 全局缓存
    exppries: 3 // 全局过期时间
  }
}

export default defaultConfig
