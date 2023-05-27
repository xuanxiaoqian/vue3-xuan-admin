<template>
  <div class="layout">
    <Sidebar />

    <div class="flex min-h-screen duration-300" :style="[rightMarginLeft]">
      <div class="fixed top-0 z-20 bg-[#F5F7F9] duration-300" :style="[rightWidth, scrollHideStyle]">
        <Navbar />
        <Tabs />
      </div>

      <div :style="[appMainMarginTop, 'minWidth:100%']">
        <app-main />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings'
import { useTabsStore } from '@/store/modules/tabs'
import Navbar from './components/Navbar/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Tabs from './components/Tabs/index.vue'
import appMain from './components/appMain.vue'
import { useLayout } from './hooks/useLayout'
import { useLayoutInit } from './hooks/useLayoutInit'
import { useScrollHideStyle } from './hooks/useScrollHideStyle'
import { useWatchMediaQuery } from './hooks/useWatchMediaQuery'
import { LAYOUT_KEY, LayoutInjectContent } from './types'

const { rightWidth, rightMarginLeft, appMainMarginTop } = useLayout()
const { scrollHideStyle } = useScrollHideStyle()

const tabsStore = useTabsStore()
const settingsStore = useSettingsStore()
const bgColor = toRef(settingsStore, 'bgColor')

const route = useRoute()

const isRouterRefurbish = ref(true)
const reload = () => {
  isRouterRefurbish.value = false
  const index = tabsStore.deleteTab(route.path)

  nextTick(() => {
    tabsStore.addTab(route, index)
    isRouterRefurbish.value = true
  })
}
provide<LayoutInjectContent>(LAYOUT_KEY, { reload, isRouterRefurbish })

useWatchMediaQuery()
useLayoutInit()
</script>

<style scoped>
.layout {
  min-height: 100vh;
  width: 100%;

  background-color: v-bind(bgColor);
}
</style>
