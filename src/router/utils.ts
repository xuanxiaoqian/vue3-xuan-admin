import { SYSTEM_BASE } from '@/layout/hooks/useSidebarRoutes'
import { RouteRecordRaw } from 'vue-router'

// 处理管理系统的主界面路由的children在其他ts文件下的情况
export const handleBaseRouteChildrenLevel = (routes: RouteRecordRaw[]) => {
  // 查找管理系统主页面的路由
  const findBaseRoute = routes[routes.findIndex(v => v.path == SYSTEM_BASE)]
  findBaseRoute.children = findBaseRoute.children ?? []

  const handleRoutes = routes.filter(route => {
    if (route.meta?.isBaseChildren) { // 如果是主界面的子路由就要添加这个meta属性isBaseChildren为true
      findBaseRoute.children?.splice(route.meta.baseChildrenSort ?? findBaseRoute.children.length, 0, route)
    } else {
      return route
    }
  })

  return handleRoutes
}