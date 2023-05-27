<template>
  <div
    v-if="navbar.showRefurbish"
    @click="toggleClick"
    class="flex h-full cursor-pointer items-center justify-center p-3 duration-300 hover:bg-[#f8f8f9]"
    :title="$('title')"
  >
    <svg
      class="refurbish"
      t="1681521173096"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2630"
      width="200"
      height="200"
    >
      <path
        d="M989.86666667 409.6V170.66666667l-77.9264 77.9264a477.55946667 477.55946667 0 0 0-398.50666667-214.49386667C249.51466667 34.0992 35.5328 248.04693333 35.5328 512S249.51466667 989.9008 513.4336 989.9008a477.93493333 477.93493333 0 0 0 442.91413333-298.12053333 40.92586667 40.92586667 0 1 0-75.8784-30.8224 396.11733333 396.11733333 0 0 1-367.03573333 247.02293333c-218.69226667 0-395.9808-177.28853333-395.9808-395.9808S294.74133333 116.0192 513.4336 116.0192c141.27786667 0 268.73173333 74.752 339.21706667 191.82933333L750.93333333 409.6h238.93333334z"
        fill="#7B8291"
        p-id="2631"
      ></path>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { curT } from '@/i18n'
import { LAYOUT_KEY, LayoutInjectContent } from '@/layout/types'
import { useSettingsStore } from '@/store/modules/settings'
import NProgress from '@/utils/nprogress'

const $ = curT('layout.navbar.refurbish')

const { navbar } = useSettingsStore()

const layoutInject = inject<LayoutInjectContent>(LAYOUT_KEY)

const toggleClick = () => {
  NProgress.start()
  layoutInject?.reload()
  NProgress.done()
}
</script>

<style lang="scss" scoped>
.refurbish {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
</style>
