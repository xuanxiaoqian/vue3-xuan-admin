import { $t } from '@/i18n'
import { RouteRecordRaw } from "vue-router"

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

export default jumpUrlRoute
