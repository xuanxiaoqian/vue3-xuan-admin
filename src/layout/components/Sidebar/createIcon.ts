import * as Icons from "@element-plus/icons-vue"
import { createVNode } from 'vue'


/**
 * 动态创建图标
 */
export const Icon = (props: { icon: string }) => {
  const { icon } = props
  return createVNode(Icons[icon as keyof typeof Icons])
}