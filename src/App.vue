<script setup lang="ts">
import { useInitVue } from '@/hooks/useInit'
import i18n from '@/i18n'
import enLocale from 'element-plus/lib/locale/lang/en'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'

const currentLocale = computed(() => {
  return i18n.global.locale.value == 'zh-CN' ? zhLocale : enLocale
})

useInitVue()
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>

<style scoped></style>
