import { getUserData } from '@/api/user/user'
import { PUMS_TOKEN } from '@/utils/constant'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: localStorage.getItem(PUMS_TOKEN),
    userAvatar: '',
    userNickname: ''
  }),
  getters: {
  },
  actions: {
    setToken(token: string) {
      this.token = token
      localStorage.setItem(PUMS_TOKEN, token)
    },

    setUserData(data: { userAvatar: string, userNickname: string }) {
      this.userAvatar = data.userAvatar
      this.userNickname = data.userNickname
    },

    resetAllUserData() {
      this.token = null
      localStorage.setItem(PUMS_TOKEN, '')  // 这里也可以考虑使用localStorage.clean()

      this.userAvatar = ''
      this.userNickname = ''
    },

    async initUserData() {
      const { data } = await getUserData()

      this.userAvatar = data.userAvatar
      this.userNickname = data.userNickname
    }
  }
})
