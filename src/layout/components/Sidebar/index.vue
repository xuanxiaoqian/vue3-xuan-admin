<template>
  <div class="sidebar fixed top-0 left-0 z-[60] flex h-screen select-none flex-col overflow-hidden text-[#D1D5DB] duration-300" :class="sidebarClass" :style="{ width: SIDEBAR_WIDTH + 'px' }">
    <Banner />

    <el-scrollbar height="100%" :always="true">
      <el-menu
        class="el-menu-vertical"
        :router="true"
        :default-active="routeActive"
        :background-color="sidebar.backgroundColor"
        :active-text-color="sidebar.activeTextColor"
        :text-color="sidebar.textColor"
        :unique-opened="sidebar.uniqueOpened"
        @select="handleSelect"
        :default-openeds="defaultOpeneds"
      >
        <SidebarItem v-for="route in systemRoutes" :route="route" :basePath="SYSTEM_BASE" :key="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>

  <FixedMask />
</template>

<script lang="ts" setup>
import { useLayout } from '@/layout/hooks/useLayout'
import { useSidebarRoutes } from '@/layout/hooks/useSidebarRoutes'
import { useSettingsStore } from '@/store/modules/settings.js'
import Banner from './Banner.vue'
import FixedMask from './FixedMask.vue'
import SidebarItem from './SidebarItem.vue'
const { SIDEBAR_WIDTH } = useLayout()

const { sidebar } = useSettingsStore()
const route = useRoute()
const { systemRoutes, SYSTEM_BASE } = useSidebarRoutes()


const routeActive = toRef(route, 'path')

const backgroundColor = toRef(sidebar, 'backgroundColor') // 动态css

const sidebarClass = computed(() => {
  return { isfixed: sidebar.isfixed, sidebarClose: !sidebar.opened }
})

const defaultOpeneds = computed(() => {
  return sidebar.isDefaultExpand ? systemRoutes.value.map((v: any) => v.path) : []
})

const handleSelect = () => {
  // 如果是移动端,那么点击跳转后自动关闭侧边导航
  if (sidebar.isfixed && sidebar.opened) {
    sidebar.opened = false
  }
}

const sidebarTranslateX = `-${SIDEBAR_WIDTH + 6}px`
</script>

<style lang="scss" scoped>
.sidebar {
  box-shadow: 2px 0px 6px rgba(0, 21, 41, 0.35);
  background-color: v-bind(backgroundColor);
}

.sidebarClose {
  // width: 0 !important;
  transform: translateX(v-bind(sidebarTranslateX));
}

.isfixed {
  position: fixed;
}

.el-menu-vertical {
  width: 100%;
  flex: 1;

  transition-duration: 300ms;

  border-right-width: 0px !important;
}

:deep(.el-scrollbar__thumb) {
  background-color: white;
}
</style>
