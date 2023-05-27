import { useTabsStore } from '@/store/modules/tabs'

/**
 * 初始化页面
 */
export const useLayoutInit = () => {
  const tabsStore = useTabsStore()

  watch(() => tabsStore.isPersist, () => {
    tabsStore.setItemTagList()
  })
}