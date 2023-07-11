import { useTabsStore } from '@/store/modules/tabs'

/**
 * 初始化页面
 */
export const useLayoutInit = () => {
  const tabsStore = useTabsStore()

  // 监听tabs栏是否缓存,减少store层的代码
  watch(() => tabsStore.isPersist, () => {
    tabsStore.setItemTagList()
  })
}