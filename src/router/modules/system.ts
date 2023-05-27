import { $t } from '@/i18n'
import { SYSTEM_BASE, SYSTEM_INIT_PATH } from '@/layout/hooks/useSidebarRoutes'
import Layout from '@/layout/index.vue'
import { RouteRecordRaw } from "vue-router"


const systemRoute: RouteRecordRaw = {
  path: SYSTEM_BASE,
  name: "system",
  redirect: SYSTEM_INIT_PATH,
  component: Layout,
  meta: {
    title: $t('index')
  },
  children: [],
}

export default systemRoute
