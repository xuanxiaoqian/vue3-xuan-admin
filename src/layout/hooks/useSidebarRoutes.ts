import { routes } from '@/router'
import { RouteRecordRaw } from 'vue-router'

export const SYSTEM_BASE = '/'  // 管理系统主页根路径
export const SYSTEM_INIT_PATH = '/dashboard'  // 管理系统主页重定向路径

// 过滤侧边栏的路由
export const useSidebarRoutes = () => {

  const systemRoutes = shallowRef<RouteRecordRaw[]>([])  // 树桩路由

  const systemFlatRoutes = shallowRef<RouteRecordRaw[]>([])  // 拍平路由

  systemRoutes.value = routes.filter((v) => v.path == SYSTEM_BASE)[0]?.children as RouteRecordRaw[]
  systemRoutes.value = systemRoutes.value?.filter((v: any) => !v.meta.isHide)

  systemFlatRoutes.value = flatRouteChildren(systemRoutes.value, SYSTEM_BASE)

  return { SYSTEM_BASE, systemRoutes, systemFlatRoutes }
}

// 拍平路由children
function flatRouteChildren(arr2: any[], parentPath = ''): any {
  const arr = JSON.parse(JSON.stringify(arr2))

  if (arr.length == 0) {
    return false
  }

  const result = []

  for (const item of arr) {
    const { path, children } = item

    // 当children为/xxx的时候，就不受父组件的path影响了
    if (item.path.charAt(0) !== '/') {
      item.path = (parentPath === '/' || parentPath === '') ? path : `${parentPath}/${path}`
    }

    result.push(item)

    // 用于搜索跳转使用
    if (children?.length > 0) {
      result.push(...flatRouteChildren(children, `${item.path}`))
    }
  }

  return result
}