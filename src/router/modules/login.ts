import { $t } from '@/i18n'
import { RouteRecordRaw } from "vue-router"

const loginRoute: RouteRecordRaw = {
  path: "/login",
  name: "login",
  component: () => import("@/views/login/index.vue"),
  meta: {
    title: $t('login')
  },
  children: [],
}

export default loginRoute
