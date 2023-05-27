export const LAYOUT_KEY = 'layoutKey'

export interface LayoutInjectContent {
  reload(): void
  isRouterRefurbish: Ref<boolean>
}