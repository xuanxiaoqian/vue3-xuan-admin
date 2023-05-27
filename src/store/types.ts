import { RouteMeta, RouteRecordName } from 'vue-router'

export interface MatcherLocation {
  /**
   * Name of the matched record
   */
  name: RouteRecordName | null | undefined
  /**
   * Percentage encoded pathname section of the URL.
   */
  path: string

  /**
   * Merged `meta` properties from all the matched route records.
   */
  meta: RouteMeta
}