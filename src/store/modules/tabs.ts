import { SYSTEM_BASE, SYSTEM_INIT_PATH } from '@/layout/hooks/useSidebarRoutes'
import router from '@/router'
import { defineStore } from 'pinia'
import { MatcherLocation } from '../types'

const TAB_LIST = 'tabList'
const TAB_LIST_IS_PERSIST = 'tabListIsPersist'

export const useTabsStore = defineStore({
  id: 'tabs',
  state: () => ({
    currentActivePath: '',
    tabList: JSON.parse(localStorage.getItem(TAB_LIST) ?? '[]') as Array<MatcherLocation>,
    isPersist: Boolean(localStorage.getItem(TAB_LIST_IS_PERSIST))
  }),
  actions: {
    addTab(view: MatcherLocation, index?: number) {
      const { name, path, meta } = view

      if (this.tabList.some((v) => v.path === view.path)) return

      // 如果没有指定插入的位置,默认追加
      const pushIndex = index ?? this.tabList.length

      this.tabList.splice(pushIndex, 0, Object.assign({}, { name, path, meta }))
    },

    deleteTab(path: string): number {
      for (const [i, v] of this.tabList.entries()) {
        if (v.path === path) {
          this.tabList.splice(i, 1)
          return i
        }
      }

      return -1
    },

    deleteAllTab() {
      const findDashboardIndex = this.tabList.findIndex(v => v.path === SYSTEM_INIT_PATH)

      this.tabList = findDashboardIndex === -1 ? [] : [this.tabList[findDashboardIndex]]
    },

    // 关闭其他标签
    deleteOtherTags() {
      const findCurrentTabIndex = this.tabList.findIndex(v => v.path === this.currentActivePath)

      this.tabList = [this.tabList[findCurrentTabIndex]]
    },

    // 关闭当前标签
    deleteCurrentTag() {
      if (this.tabList.length == 1 && this.currentActivePath == SYSTEM_INIT_PATH) {
        return false
      }

      const findIndex = this.tabList.findIndex((val) => val.path === this.currentActivePath)
      this.deleteTab(this.currentActivePath)

      if (this.tabList.length == 0) {
        router.push(SYSTEM_BASE)
        this.setItemTagList()
        return false
      }

      // 如果是当前是最后一个tab就往前跳
      const jumpIndex = findIndex === this.tabList.length ? findIndex - 1 : findIndex
      this.currentActivePath = this.tabList[jumpIndex].path
    },

    // 关闭左侧
    deleteLeftTag() {
      const findCurrentIndex = this.tabList.findIndex(v => v.path === this.currentActivePath)

      this.tabList = this.tabList.splice(findCurrentIndex)

    },

    // 关闭右侧
    deleteRightTag() {
      const findCurrentIndex = this.tabList.findIndex(v => v.path === this.currentActivePath)

      this.tabList = this.tabList.splice(0, findCurrentIndex + 1)

    },

    updatePersist(flag: boolean) {
      this.isPersist = flag

      flag ? localStorage.setItem(TAB_LIST_IS_PERSIST, 'true') : localStorage.setItem(TAB_LIST_IS_PERSIST, '')

    },

    setItemTagList() {  // 优化点,每个都需要加
      this.isPersist ? localStorage.setItem(TAB_LIST, JSON.stringify(this.tabList)) : localStorage.setItem(TAB_LIST, '[]')
    }
  },
})
