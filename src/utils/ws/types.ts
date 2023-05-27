export type ResultDataTypePure<T = any> = {
  key: string
  code: number
  data?: T
  msg?: string
}

export type ResultDataType<T = any> = {
  data: any
}


export type WsRequestData<T = any> = {
  data?: T
  key?: string
  event: string
  type?: string
  headerToken?: string
}
