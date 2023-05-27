<template>
  <div
    v-if="navbar.showScreenfull"
    @click="screenfull.toggle()"
    class="flex h-full cursor-pointer items-center justify-center p-3 duration-300 hover:bg-[#f8f8f9]"
    :title="fullscreenTitle"
  >
    <el-icon>
      <FullScreen v-if="!isFullscreen" />
      <Aim v-else />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { curT } from '@/i18n'
import { useSettingsStore } from '@/store/modules/settings'
import { Aim, FullScreen } from '@element-plus/icons-vue'
import screenfull from 'screenfull'

const $ = curT('layout.navbar.Screenfull')
const { navbar } = useSettingsStore()

const isFullscreen = ref(false)
screenfull.on('change', () => {
  isFullscreen.value = screenfull.isFullscreen
})

const fullscreenTitle = computed(() => {
  return isFullscreen.value ? $('exitTitle') : $('enterTitle')
})
</script>

<style lang="scss" scoped></style>
