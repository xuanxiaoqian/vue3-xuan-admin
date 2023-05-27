
import { RouteRecordRaw } from 'vue-router'

interface Meta {
  /** 菜单标题 */
  title: string

  /** 是否固定 tabs不显示关闭按钮 */
  affix?: boolean

  /** 是否不显示在侧边栏 */
  isHide?: boolean

  /** 图标 */
  icon?: string

  /** 是否不需要缓存 */
  isNoKeep?: boolean

  /** 内嵌网址 */
  iframeUrl?: string

  /** 跳转网址 */
  JumpUrl?: string

  /** 是否属于管理系统的主界面路由的children */
  isBaseChildren?: boolean

  /** 管理系统的主界面侧边导航栏排第几位 */
  baseChildrenSort?: number
}

interface CustomRouteRecordRaw extends RouteRecordRaw {
  meta?: Meta
}

declare module 'vue-router' {
  interface RouteMeta extends Meta { }
  interface RouteRecordRaw extends CustomRouteRecordRaw { }
}
