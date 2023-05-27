/***
 * 本工具类专门用于处理websockt请求
 */

//let datadeal = require('./datadeal.js')
import Socket from '@/utils/ws'
import { PUMS_TOKEN } from '../constant'
import { WsRequestData } from './types'

class RequestUtils {
  static socket = new Socket()

  // 请求方法
  static request<T>(data: WsRequestData): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      let token = localStorage.getItem(PUMS_TOKEN) ?? ''
      // let loginId = localStorage.getItem('loginId')

      // let url = `http://192.168.31.24:4001`

      // // 如果当前token和socket的token不一致，则说明退出登录了需要重新连接
      // if (this.socket.url != url) {
      //   this.socket.url = url
      //   this.socket.token = token

      //   this.socket.connect() // 必须手动链接，不然退出登录的话socket内部的token还是上一次登录的token

      //   console.log('重新连接了')
      // }

      data.key = this.guid()
      data.headerToken = token

      // 发送请求
      this.socket.send(JSON.stringify(data))

      // 注册回调函数
      this.socket.registerCallBack(data.key, {
        success: (data: any) => {
          resolve(data)
        },
        error: (error: any) => {
          reject(error)
        }
      })
    })
  }



  /**
   * 随机生成字符戳 key
   */
  static guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
}

export default RequestUtils
