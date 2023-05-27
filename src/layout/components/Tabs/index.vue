<template>
  <div v-show="tab.enable" class="flex select-none items-center justify-between overflow-hidden px-2 pt-[6px] pb-[7px]" :style="{ height: TABS_HEIGHT + 'px' }">
    <el-tabs class="flex !h-full flex-1 items-center overflow-hidden" v-model="tabsStore.currentActivePath" type="card" @tab-change="changeTab" @tab-remove="removeTab">
      <el-tab-pane v-for="tab in tabsStore.tabList" :closable="!tab.meta.affix" :key="tab.path" :label="t(tab.meta.title)" :name="tab.path"></el-tab-pane>
    </el-tabs>

    <Dropdown />
  </div>
</template>

<script setup lang="ts">
import { t } from '@/i18n'
import { useLayout } from '@/layout/hooks/useLayout'
import router from '@/router/index'
import { useSettingsStore } from '@/store/modules/settings'
import { useTabsStore } from '@/store/modules/tabs.js'
import Sortable from 'sortablejs'
import Dropdown from './Dropdown.vue'

const { TABS_HEIGHT } = useLayout()

const { tab } = useSettingsStore()
const route = useRoute()
const tabsStore = useTabsStore()

const changeTab = (routePath: string) => {
  router.push(routePath)
}

const removeTab = (routePath: string) => {
  if (routePath !== tabsStore.currentActivePath) {
    return tabsStore.deleteTab(routePath)
  }

  tabsStore.deleteCurrentTag()
}

watch(
  route,
  (newData) => {
    tabsStore.addTab(newData)

    tabsStore.currentActivePath = newData.path
  },
  { immediate: true },
)

onMounted(() => {
  var el = document.getElementsByClassName('el-tabs__nav')[0] as HTMLElement

  Sortable.create(el, {
    animation: 300, //动画
    draggable: '.el-tabs__item', // 允许拖拽的项目类名

    onEnd(evt: any) {
      const oldData = tabsStore.tabList.splice(evt.oldIndex, 1)[0]
      tabsStore.tabList.splice(evt.newIndex, 0, oldData)
    },
  })
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs__item) {
  background-color: white;
  margin-left: 6px;
  height: 32px;
  border-radius: 4px;
  color: #808695;

  border: none !important;
}

:deep(.el-tabs__nav-wrap.is-scrollable) {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

:deep(.el-tabs__item):hover {
  color: #515a6e;
}

:deep(.is-active) {
  color: #2d8cf0;
}

:deep(.is-active):hover {
  color: #2d8cf0;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item .is-icon-close) {
  width: 14px !important;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover) {
  padding-right: 20px !important;
  padding-left: 20px !important;
}

:deep(.el-tabs__header) {
  border: none !important;
  margin-bottom: 0 !important;
  display: flex;
  align-items: center;
  overflow: hidden;
}

:deep(.el-tabs__nav) {
  border: none !important;
}
</style>
