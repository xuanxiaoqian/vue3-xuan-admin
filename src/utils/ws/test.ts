import requestUtils from '@/utils/ws/requestUtils'
import { WsRequestData } from './types'

class TestServices {
  static baseController: string = 'ClassService'

  constructor() { }

  // 查询所有班级
  static getClassList<T = any>(data: WsRequestData): Promise<T> {
    return requestUtils.request(data)
  }
}

export default TestServices
