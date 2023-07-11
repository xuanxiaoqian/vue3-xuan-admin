import { modifyHtmlTitle } from '@/i18n'
import pinia from '@/store'
import { useTabsStore } from '@/store/modules/tabs'
import { useUserStore } from '@/store/modules/user'
import NProgress from '@/utils/nprogress'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { handleBaseRouteChildrenLevel } from './utils'

export let routes: RouteRecordRaw[] = []

const modules = import.meta.glob<any>('./modules/*.ts', { eager: true })
for (const path in modules) {
  if (Array.isArray(modules[path].default)) {
    modules[path].default.map((v: any) => routes.push(v))
  } else {
    routes.push(modules[path].default)
  }
}

routes = handleBaseRouteChildrenLevel(routes)

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  strict: false,
})

const whiteList = ['/login'] // no redirect whitelist

// 初始化不写在拦截器里面应该能快个几毫秒  Hhhh~
let userStore = useUserStore(pinia)
let tabsStore = useTabsStore(pinia)

router.beforeEach((to, from, next) => {
  // 如果前往的路由没有加载过
  if (!tabsStore.tabList.some(v => v.path == to.path)) {
    NProgress.start() // 控制开始加载
  }

  modifyHtmlTitle(to.meta.title)

  if (userStore.token) {
    to.path === '/login' ? next('/') : next()
  } else {
    whiteList.indexOf(to.path) !== -1 ? next() : next(`/login`)
  }
})

router.afterEach(() => {
  NProgress.done() // 控制结束加载
})

export default router
