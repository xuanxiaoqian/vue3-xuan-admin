import { useSettingsStore } from '@/store/modules/settings'

let SIDEBAR_WIDTH = 256 // 侧边栏宽度
let NAVBAR_HEIGHT = 64 // 菜单栏高度
let TABS_HEIGHT = 44  // Tab高度

// 布局属性
export const useLayout = () => {
  const { sidebar, navbar, tab } = useSettingsStore()

  const isSidebarDesktopOpen = computed(() => {
    return sidebar.opened && !sidebar.isfixed
  })

  const rightWidth = computed(() => {
    return isSidebarDesktopOpen.value ? `width:calc(100% - ${SIDEBAR_WIDTH}px)` : 'width:100%'
  })

  const rightMarginLeft = computed(() => {
    return isSidebarDesktopOpen.value ? `margin-left: ${SIDEBAR_WIDTH}px` : 'margin-left: 0px'
  })

  const appMainMarginTop = computed(() => {
    const navbarH = navbar.enable ? NAVBAR_HEIGHT : 0
    const tabsH = tab.enable ? TABS_HEIGHT : 0

    return `margin-top: ${navbarH + tabsH}px;`
  })

  return { rightWidth, rightMarginLeft, appMainMarginTop, SIDEBAR_WIDTH, NAVBAR_HEIGHT, TABS_HEIGHT }
}