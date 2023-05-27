<template>
  <div
    v-if="navbar.showCloseSidebar"
    @click="updateSidebarOpened"
    class="flex h-full cursor-pointer items-center justify-center p-3 duration-300 hover:bg-[#f8f8f9]"
    :title="isActive ? $('title.close') : $('title.expand')"
  >
    <svg
      :class="{ 'is-active': isActive }"
      class="hamburger"
      to="1681521297680"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="6415"
      width="200"
      height="200"
    >
      <path
        d="M85.333333 213.333333h853.333334c25.6 0 42.666667-17.066667 42.666666-42.666666s-17.066667-42.666667-42.666666-42.666667H85.333333c-25.6 0-42.666667 17.066667-42.666666 42.666667s17.066667 42.666667 42.666666 42.666666zM938.666667 354.133333H512c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667h426.666667c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667zM938.666667 584.533333H512c-25.6 0-42.666667 17.066667-42.666667 42.666667s17.066667 42.666667 42.666667 42.666667h426.666667c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666667zM938.666667 810.666667H85.333333c-25.6 0-42.666667 17.066667-42.666666 42.666666s17.066667 42.666667 42.666666 42.666667h853.333334c25.6 0 42.666667-17.066667 42.666666-42.666667s-17.066667-42.666667-42.666666-42.666666zM64 546.133333l213.333333 132.266667c8.533333 4.266667 12.8 8.533333 21.333334 8.533333s12.8 0 21.333333-4.266666c12.8-8.533333 21.333333-21.333333 21.333333-38.4V379.733333c0-17.066667-8.533333-29.866667-21.333333-38.4-12.8-8.533333-29.866667-8.533333-42.666667 0l-213.333333 132.266667c-12.8 8.533333-21.333333 25.6-21.333333 38.4s8.533333 29.866667 21.333333 34.133333z"
        p-id="6416"
        fill="#7B8291"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { curT } from '@/i18n'
import { useSettingsStore } from '@/store/modules/settings'

const $ = curT('layout.navbar.Breadcrumb')

const { updateSidebarOpened, sidebar, navbar } = useSettingsStore()
const isActive = toRef(sidebar, 'opened')
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  cursor: pointer;

  transform: rotate(180deg);
}

.hamburger.is-active {
  transform: rotate(0deg);
}
</style>
