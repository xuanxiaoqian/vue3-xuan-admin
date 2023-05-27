import i18n from '@/i18n'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    sidebar: {
      opened: true,
      title: 'xuanxiaoqian',
      backgroundColor: '#424649',
      activeTextColor: '#ffd04b',
      textColor: '#fff',
      showLogo: true,
      isfixed: false, // 移动端定位触发
      uniqueOpened: true, // 是否只保持一个子菜单的展开
      isDefaultExpand: false    // 默认展开所有子菜单
    },
    navbar: {
      showBreadcrumb: true, // 显示面包屑
      showRefurbish: true,  // 显示刷新
      showScreenfull: true, // 显示全屏按钮
      showSearch: true, // 显示搜索框
      showSetting: true, // 显示设置
      showLanguage: true,  // 显示翻译
      showCloseSidebar: true,  //显示关闭侧边栏按钮
      enable: true, // 是否整体显示
    },
    tab: {
      enable: true, // 是否整体显示
    },
    navbarAndTab: {
      scrollHide: false, //下滑时隐藏顶栏
    },
    bgColor: '#F5F7F9',  // 背景颜色
    language: localStorage.getItem('language') as "zh-CN" | "en-US", // 语言
    isMobile: false // 是否手机端
  }),
  actions: {
    updateSidebarOpened() {
      this.sidebar.opened = !this.sidebar.opened
    },
    updateLanguage(languageKey: "zh-CN" | "en-US") {
      i18n.global.locale.value = languageKey
      this.language = languageKey
      localStorage.setItem('language', languageKey)
    },
    cleanPersist() {
      localStorage.setItem('userInfo', '')
      this.updateLanguage("zh-CN")
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'userInfo',//设置存储的key
        storage: localStorage,//表示存储在localStorage
      }
    ]
  }
})
