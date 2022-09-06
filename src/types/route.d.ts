import type { Component } from "vue"

export type meta_type = {
  title: string
  onlyOne?: boolean
}

export type route = {
  component: Component | (() => Promise<Component>)
  icon?: Component | (() => Promise<Component>)
  meta: meta_type
  name?: string
  path: string
  fullPath?: string
  children?: Array<route>
}
