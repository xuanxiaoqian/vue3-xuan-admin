
export const ResultDataCodeMap = {
  200: '请求成功',
  203: '用户参数错误',
  403: 'token异常',
  999: '后端错误',
}


export type ResultData<T = any> = {
  code: keyof (typeof ResultDataCodeMap)

  msg: string

  data: T
}

export enum CANCELTTYPE {
  CACHE,
  REPEAT
}

export interface responseHandleObject {
  [key: number | string]: any
}