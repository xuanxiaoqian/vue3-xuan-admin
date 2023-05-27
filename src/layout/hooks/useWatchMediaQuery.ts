import { useSettingsStore } from '@/store/modules/settings'
import { useMediaQuery as _useMediaQuery } from '@vueuse/core'

/**
 * 媒体查询当前屏幕大小 从而响应式
 */
export const useWatchMediaQuery = () => {
  const settingsStore = useSettingsStore()
  const { isDesktop } = useMediaQuery()

  // TODO: 代码优化
  watch(isDesktop, (newData) => {
    settingsStore.$patch((state) => {
      state.sidebar.opened = newData
      state.sidebar.isfixed = !newData  // 因为手机才会固定 所以需要取反

      state.navbar.showBreadcrumb = newData
      state.navbar.showScreenfull = newData
      state.navbar.showSearch = newData
      state.navbar.showSetting = newData

      state.isMobile = !newData
    })

  }, { immediate: true })
}

// 媒体查询屏幕
export const useMediaQuery = () => {
  const isMobile = _useMediaQuery('screen and (max-width: 1023px)')
  const isDesktop = _useMediaQuery('screen and (min-width: 1024px)')

  // 屏幕宽度
  const windowWidth = ref(window.innerWidth)
  // 屏幕高度
  const windowHeight = ref(window.innerHeight)

  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })

  return {
    isMobile,
    isDesktop,
    windowWidth,
    windowHeight
  }
}
