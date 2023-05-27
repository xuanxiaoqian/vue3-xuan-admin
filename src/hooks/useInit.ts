import { useUserStore } from '@/store/modules/user'

/**
 * 初始化登录用户个人信息
 */
export const useInitUserData = () => {
  const userStore = useUserStore()
  if (userStore.token) {
    userStore.initUserData()
  }
}


export const useInitVue = () => {
  useInitUserData()

  onMounted(() => {
    document.body.removeChild(document.getElementById('loading') as Node)
  })
}