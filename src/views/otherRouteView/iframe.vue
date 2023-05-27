<template>
  <div class="h-full w-full p-4">
    <iframe :src="route.meta.iframeUrl" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
defineOptions({ title: 'iframe' })

const route = useRoute()
</script>

<style lang="scss" scoped></style>
