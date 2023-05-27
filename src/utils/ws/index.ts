import { PUMS_TOKEN } from '../constant'
import { ResultDataType, ResultDataTypePure } from './types'

type CallBackItem = {
  success?: (data: any) => void
  error?: (error: any) => void
}

class Socket {
  static instance: Socket

  token = localStorage.getItem(PUMS_TOKEN)

  url = `ws://192.168.31.24:4001`

  ws?: WebSocket | null // websocket对象

  // Vue注册的回调函数
  callBackList: Map<string, CallBackItem> = new Map<string, CallBackItem>()

  connectFlag: Boolean = false // 标识是否连接

  sendRetryCount: number = 0 // 记录重发的次数

  connectRetryCount: number = 0 // 重新连接尝试的次数

  constructor() {
    this.connect()
  }

  // 单例模式
  static get Instance(): Socket {
    if (!this.instance) {
      this.instance = new Socket()
    }
    return this.instance
  }


  connect() {
    if (!window.WebSocket) {
      throw new Error('您的浏览器不支持WebSocket')
    }

    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      console.log('websocket连接成功!')

      this.connectFlag = true
      this.connectRetryCount = 0
    }

    this.ws.onclose = () => {
      console.log('websocket断开连接!')

      this.connectFlag = false
      this.connectRetryCount++

      setTimeout(() => {
        if(!this.connectFlag){
          this.connect()
        }
      }, 500 * this.connectRetryCount)
    }

    this.ws.onmessage = (result: ResultDataType) => {
      const data = JSON.parse(result.data) as ResultDataTypePure

      if (data.code == 200) {
        if (this.callBackList) {
          this.callBackList.get(data.key)?.success?.call(this, data.data)
          this.callBackList.delete(data.key) // 回调完就销毁进行节能
        } else {
          console.error('未注册websocket回调函数')
        }
      } else {
        this.callBackList.get(data.key)?.error?.call(this, data)
        throw new Error('result code not 200 ' + data.msg)
      }
    }
  }

  // 注册回调函数
  registerCallBack(key: string, callBack: any) {
    this.callBackList.set(key, callBack)
  }

  // 销毁回调函数
  unRegisterCallBack(key: string) {
    this.callBackList.delete(key)
  }

  // 发送数据
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.connectFlag && this.ws?.readyState == 1) {
      this.sendRetryCount = 0
      this.ws?.send(data)
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }
}

export default Socket
