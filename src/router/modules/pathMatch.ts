import { RouteRecordRaw } from "vue-router"


const pathMatchRoute: RouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: "NotFound",
  component: () => import("@/views/error/404.vue"),
  meta: {
    title: "404not found",
    isHide: true,
    isBaseChildren: true
  },
}

export default pathMatchRoute
