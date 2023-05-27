<template>
  <div v-if="sidebar.showLogo" class="flex h-[64px] items-center justify-center overflow-hidden truncate">
    {{ sidebar.title }}
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings'

const { sidebar } = useSettingsStore()
</script>

<style lang="scss" scoped></style>
