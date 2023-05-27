<template>
  <div class="h-full w-full">
    <router-view v-slot="{ Component }">
      <keep-alive :include="keppLiveList">
        <component v-if="isRouterRefurbish" :is="Component" :key="Component.key" />
      </keep-alive>
    </router-view>
  </div>

  <el-backtop :right="17" :bottom="37" v-if="settingsStore.isMobile" />
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings'
import { useTabsStore } from '@/store/modules/tabs'
import { LAYOUT_KEY, LayoutInjectContent } from '../types'

const tabsStore = useTabsStore()
const settingsStore = useSettingsStore()
const layoutInject = inject<LayoutInjectContent>(LAYOUT_KEY) as LayoutInjectContent

const isRouterRefurbish = toRef(layoutInject, 'isRouterRefurbish')

const keppLiveList = computed(() => {
  return tabsStore.tabList.map((v) => (v.meta.isNoKeep ? undefined : v.name)) as Array<string>
})
</script>

<style lang="scss" scoped></style>
