import { SYSTEM_BASE } from '@/layout/hooks/useSidebarRoutes'
import { RouteRecordRaw } from 'vue-router'

/**
  支持两种router的ts文件
  第一种：单文件模式 例-> src/router/modules/system.ts 意思是所有路由都写在一个ts文件里面
  const systemRoute: RouteRecordRaw = {
    path: SYSTEM_BASE,
    name: "system",
    redirect: SYSTEM_INIT_PATH,
    component: Layout,
    meta: {
      title: $t('index')
    },
    children: [
      {
        path: '/index',
        name: "index",
        component: XXX,
        meta: {
          title: $t('index')
        }
      }
    ],
  }

  第二种：多文件模式 意思是每个子页面都单独写一个文件,用meta的isBaseChildren区分 可以重点看 root/types/vue-router.d.ts里面的类型
    const jumpUrlRoute: RouteRecordRaw = {
      path: '/jumpUrl',
      name: 'jumpUrl',
      component: () => import('@/views/otherRouteView/jumpUrl.vue'),  // 因为不需要组件,但是又不能不写,所以就写上一个已加载的
      meta: {
        title: $t('sidebar.jumpUrl'),
        icon: 'Link',
        JumpUrl: 'https://www.bing.com/?mkt=zh-CN',
        isBaseChildren: true
      },
    }

 */


// 处理管理系统的主界面路由的children在其他ts路由文件下的情况
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