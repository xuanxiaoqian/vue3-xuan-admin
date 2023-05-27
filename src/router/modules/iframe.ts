import { $t } from '@/i18n'
import { RouteRecordRaw } from "vue-router"

const iframeRoute: RouteRecordRaw =     {
  path: '/iframe/1',
  name: 'iframe',
  component: () => import('@/views/otherRouteView/iframe.vue'),
  meta: {
    isBaseChildren:true,
    title: $t('sidebar.bing'),
    icon: 'Monitor',
    isNoKeep: true,
    iframeUrl: 'https://www.bing.com/?mkt=zh-CN'
  },
}

export default iframeRoute
