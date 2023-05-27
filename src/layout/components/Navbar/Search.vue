<template>
  <div v-if="navbar.showSearch" class="flex h-full items-center p-3">
    <el-select
      filterable
      remote
      reserve-keyword
      :placeholder="$('title') + '...'"
      :remote-method="remoteMethod"
      @change="selectChange"
    >
      <el-option
        v-for="route in routes"
        :key="route.path"
        :label="t(route.meta?.title as string)"
        :value="route.path"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { curT, t } from '@/i18n'
import { useSidebarRoutes } from '@/layout/hooks/useSidebarRoutes'
import router from '@/router'
import { useSettingsStore } from '@/store/modules/settings'
import { RouteRecordRaw } from 'vue-router'

const $ = curT('layout.navbar.Search')

const { navbar } = useSettingsStore()
const { systemFlatRoutes } = useSidebarRoutes()

const routes = ref<RouteRecordRaw[]>([])

const remoteMethod = (query: string) => {
  if (query) {
    routes.value = systemFlatRoutes.value.filter((item) => {
      return t(item.meta?.title as string)
        .toLowerCase()
        .includes(query.toLowerCase())
    })
  } else {
    routes.value = []
  }
}

const selectChange = (routeTitle: string) => {
  router.push(routeTitle)
}
</script>

<style lang="scss" scoped></style>
