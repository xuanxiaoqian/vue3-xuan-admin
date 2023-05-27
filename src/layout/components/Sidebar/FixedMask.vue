<template>
  <div v-show="isMobileOpen" class="fixed top-0 left-0 z-50 h-screen w-screen bg-black bg-opacity-75 opacity-70" @click="settingStore.updateSidebarOpened()"></div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings'

const settingStore = useSettingsStore()

const isMobileOpen = computed(() => {
  return settingStore.sidebar.opened && settingStore.sidebar.isfixed
})
</script>

<style lang="scss" scoped></style>
