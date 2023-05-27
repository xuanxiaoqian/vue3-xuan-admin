<template>
  <div v-show="navbar.enable" class="border-b-1 flex w-full select-none items-center justify-between bg-white shadow-sm" :style="{ height: NAVBAR_HEIGHT + 'px' }">
    <div class="flex h-full">
      <Hamburger />
      <Refurbish />
      <Breadcrumb />
    </div>

    <div class="flex h-full flex-row-reverse items-center justify-center">
      <Setting />

      <Screenfull />

      <Language />

      <Avatar />

      <Search />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayout } from '@/layout/hooks/useLayout'
import { useSettingsStore } from '@/store/modules/settings'
import Avatar from './Avatar.vue'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import Language from './Language.vue'
import Refurbish from './Refurbish.vue'
import Screenfull from './Screenfull.vue'
import Search from './Search.vue'
import Setting from './Setting.vue'

const { navbar } = useSettingsStore()

const { NAVBAR_HEIGHT } = useLayout()
</script>

<style lang="scss" scoped></style>
