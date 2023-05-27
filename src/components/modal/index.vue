<template>
  <div>
    <el-drawer :model-value="props.modelValue" :title="props.title" :size="settingsStore.sidebar.isfixed ? '100%' : '28%'" :before-close="closeClick">
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/store/modules/settings'

const settingsStore = useSettingsStore()

const props = defineProps({
  title: {
    type: String,
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

const closeClick = () => {
  emit('close')

  emit('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
