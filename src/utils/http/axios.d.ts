import 'axios'

export type frameworkType = {
  /** 缓存 */
  cache?: boolean,

  /** 过期时间 */
  exppries?: number
}

// 定义自己想要新增的属性
interface CustomInternalAxiosRequestConfig {
  framework?: frameworkType
  myConfig?: frameworkType
}


// 声明全局模块，合并 axios 的声明
declare module 'axios' {
  interface InternalAxiosRequestConfig extends CustomInternalAxiosRequestConfig { }
  interface AxiosRequestConfig extends CustomInternalAxiosRequestConfig { }
}