<template>
  <div c-title="导航面包屑" class="flex items-center justify-center p-4" v-if="settingStore.navbar.showBreadcrumb">
    <el-breadcrumb>
      <el-breadcrumb-item v-for="(i, index) in breadcrumb" :key="i.path">
        <span :class="{ gray: index !== breadcrumb.length - 1 }">{{ t(i.title) }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import { t } from '@/i18n'
import { useSettingsStore } from '@/store/modules/settings'

type breadcrumbType = Array<{ path: string; title: string }>

const breadcrumb = ref([]) as Ref<breadcrumbType>

const route = useRoute()
const settingStore = useSettingsStore()

watch(
  route,
  (newData) => {
    // 因为需要删除管理系统根的title
    breadcrumb.value = newData.matched.slice(1).map((v) => ({ path: v.path, title: v.meta.title }))
  },
  { immediate: true },
)
</script>

<style lang="scss" scoped>
.gray {
  color: #999;
}
</style>
