<template>
  <el-sub-menu v-if="route?.children && route?.children.length > 0" :index="route?.meta?.JumpUrl ? '' : resolvePath(route.path, basePath)">
    <template #title @click="jumpUrlClick(route?.meta?.JumpUrl)">
      <el-icon v-if="route.meta?.icon">
        <Icon :icon="route.meta?.icon"></Icon>
      </el-icon>
      <span>{{ t(route.meta?.title as string) }}</span>
    </template>

    <SidebarItem v-for="child in route.children" :key="child.path" :route="child" :basePath="fatherResolvePath(route.path, basePath)" />
  </el-sub-menu>

  <el-menu-item v-else-if="route.component" :index="route?.meta?.JumpUrl ? '' : resolvePath(route.path, basePath)" @click="jumpUrlClick(route?.meta?.JumpUrl)">
    <el-icon v-if="route.meta?.icon">
      <Icon :icon="route.meta?.icon"></Icon>
    </el-icon>
    <span>{{ t(route.meta?.title as string) }}</span>
  </el-menu-item>
</template>

<script setup lang="ts">
import { t } from '@/i18n'
import { PropType } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps({
  route: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  basePath: {
    type: String,
    required: true,
  },
})

const route = toRef(props, 'route')

const resolvePath = (itemPath: string, basePath?: string) => {
  return basePath === '/' || basePath == '' ? itemPath : `${basePath}/${itemPath}`
}

const fatherResolvePath = (itemPath: string, basePath?: string) => {
  if (itemPath.charAt(0) !== '/') {
    return basePath == '/' || basePath == '' ? itemPath : `${basePath}/${itemPath}`
  }

  return itemPath
}

const jumpUrlClick = (url: any) => {
  if (url) {
    window.open(url)
  }
}
</script>

<style lang="scss" scoped></style>
