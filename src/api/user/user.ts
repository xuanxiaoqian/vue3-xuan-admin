import http from '@/utils/http'
import { getUserDataResult, userLoginDto } from './types'


export const userLogin = (data: userLoginDto) => http.post('/user/userLogin', data)

export const getUserData = () => http.get<getUserDataResult>('/user/getUserData')
