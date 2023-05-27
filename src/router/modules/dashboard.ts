import { $t } from '@/i18n'
import { SYSTEM_INIT_PATH } from '@/layout/hooks/useSidebarRoutes'
import { RouteRecordRaw } from "vue-router"

const dashboard: RouteRecordRaw = {
  path: SYSTEM_INIT_PATH,
  name: "dashboard",
  component: () => import("@/views/dashboard/index.vue"),
  meta: {
    title: $t('dashboard'),
    affix: true,
    icon: 'House',
    isNoKeep: true,

    isBaseChildren: true,
    baseChildrenSort: 1
  },
  children: [],
}

export default dashboard
