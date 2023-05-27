<template>
  <div
    v-if="navbar.showSetting"
    @click="openSetting"
    class="flex h-full cursor-pointer items-center justify-center p-3 duration-300 hover:bg-[#f8f8f9]"
    :title="$('title')"
  >
    <el-icon><Setting /></el-icon>
  </div>

  <Teleport to="body">
    <VuaModal title="主题风格设置" v-model="showModel">
      <el-form label-width="120px" label-position="left">
        <el-divider>侧边栏设置</el-divider>
        <el-form-item label="标题">
          <el-input v-model="sidebar.title" />
        </el-form-item>

        <el-form-item label="显示LOGO">
          <el-switch v-model="sidebar.showLogo" />
        </el-form-item>

        <el-form-item label="默认展开所有">
          <el-switch v-model="sidebar.isDefaultExpand" />
        </el-form-item>

        <el-form-item label="手风琴模式">
          <el-switch v-model="sidebar.uniqueOpened" />
        </el-form-item>

        <el-divider>顶栏设置</el-divider>
        <el-form-item label="显示菜单栏">
          <el-switch v-model="navbar.enable" />
        </el-form-item>

        <el-form-item label="显示标签页">
          <el-switch v-model="tab.enable" />
        </el-form-item>

        <el-form-item label="标签页持久化">
          <el-switch v-model="tabsStore.isPersist" />
        </el-form-item>

        <el-form-item label="显示关闭侧边栏">
          <el-switch v-model="navbar.showCloseSidebar" />
        </el-form-item>

        <el-form-item label="显示面包屑">
          <el-switch v-model="navbar.showBreadcrumb" />
        </el-form-item>

        <el-form-item label="显示刷新按钮">
          <el-switch v-model="navbar.showRefurbish" />
        </el-form-item>

        <el-form-item label="显示搜索框">
          <el-switch v-model="navbar.showSearch" />
        </el-form-item>

        <el-form-item label="显示翻译">
          <el-switch v-model="navbar.showLanguage" />
        </el-form-item>

        <el-form-item label="下滑时隐藏顶栏">
          <el-switch v-model="navbarAndTab.scrollHide" />
        </el-form-item>

        <!-- <el-form-item label="需要自己刷新">
          <el-button @click="cleanPersist">恢复默认设置</el-button>
        </el-form-item> -->
      </el-form>
    </VuaModal>
  </Teleport>

  <Teleport to="body" v-if="!navbar.enable || !navbar.showSetting">
    <div
      @click="openSetting"
      class="duration-400 fixed right-0 top-[50%] z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-l-[6px] border-[1px] border-solid border-[#999] bg-white"
    >
      <el-icon><Setting /></el-icon>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
// import VuaModal from '@/components/modal/index.vue'
import { curT } from '@/i18n'
import { useSettingsStore } from '@/store/modules/settings'
import { useTabsStore } from '@/store/modules/tabs'
import { Setting } from '@element-plus/icons-vue'

const $ = curT('layout.navbar.Setting')
// 放最后加载
const VuaModal = defineAsyncComponent(() => import('@/components/modal/index.vue'))

const { sidebar, tab, navbarAndTab, navbar, cleanPersist } = useSettingsStore()
const tabsStore = useTabsStore()

watchEffect(() => {
  tabsStore.updatePersist(tabsStore.isPersist)
})

const showModel = ref(false)

const openSetting = () => {
  showModel.value = true
}
</script>

<style lang="scss" scoped></style>
