import { useSettingsStore } from '@/store/modules/settings'

// 向下滚动隐藏 TODO: 动态设置
export function useScrollHideStyle() {
  const { navbarAndTab } = useSettingsStore()

  const isDownScroll = ref(true)  // TODO:有语义化问题

  let prevScrollY = window.pageYOffset

  const handleScroll = () => {
    const currentScrollY = window.pageYOffset
    isDownScroll.value = prevScrollY > currentScrollY
    prevScrollY = currentScrollY
  }


  watchEffect(() => {
    if (navbarAndTab.scrollHide) {
      window.addEventListener('scroll', handleScroll)
    } else {
      isDownScroll.value = true
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const scrollHideStyle = computed(() => {
    return isDownScroll.value ? '' : `transform: translateY(-108px);`
  })

  return { scrollHideStyle }
}