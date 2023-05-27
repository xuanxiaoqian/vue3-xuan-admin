<template>
  <div c-title="下拉菜单" class="dropdown">
    <el-dropdown>
      <div class="mr-2 flex h-[32px] w-[32px] flex-shrink-0 cursor-pointer items-center justify-center bg-white">
        <el-icon>
          <ArrowDown />
        </el-icon>
      </div>

      <template #dropdown>
        <div class="py-2 px-1">
          <el-dropdown-item :icon="Close" @click="tabsStore.deleteCurrentTag()" :disabled="route.meta.affix">
            {{ $('closeCurrent') }}
          </el-dropdown-item>

          <el-dropdown-item
            :icon="Back"
            @click="tabsStore.deleteLeftTag()"
            divided
            :disabled="tabsStore.tabList.findIndex((v) => v.path === tabsStore.currentActivePath) == 0"
          >
            {{ $('closeLeft') }}
          </el-dropdown-item>
          <el-dropdown-item
            :icon="Right"
            @click="tabsStore.deleteRightTag()"
            :disabled="
              tabsStore.tabList.findIndex((v) => v.path === tabsStore.currentActivePath) == tabsStore.tabList.length - 1
            "
          >
            {{ $('closeRight') }}
          </el-dropdown-item>

          <el-dropdown-item :icon="Rank" @click="tabsStore.deleteOtherTags()" divided>
            {{ $('closeOther') }}
          </el-dropdown-item>
          <el-dropdown-item :icon="Sort" @click="closeAllTabs">{{ $('closeAll') }}</el-dropdown-item>
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { curT } from '@/i18n'
import router from '@/router'
import { useTabsStore } from '@/store/modules/tabs'
import { ArrowDown, Back, Close, Rank, Right, Sort } from '@element-plus/icons-vue'

const $ = curT('layout.tabs.Dropdown')

const route = useRoute()
const tabsStore = useTabsStore()

const closeAllTabs = () => {
  tabsStore.deleteAllTab()
  router.push('/')
}
</script>

<style lang="scss" scoped></style>
