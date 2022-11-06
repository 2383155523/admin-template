import type { Component } from "vue"

export interface meta_type {
  title: string //标题
}

export interface childRoute {
  path: string //路由路径
  component?: Component | (() => Promise<Component>) //路由组件
  meta?: meta_type //路由元信息
  icon?: Component | (() => Promise<Component>) //菜单图标组件
  name?: string //路由别名
  fullPath?: string //路由路径全称
  children?: Array<childRoute> //子路由
  redirect?: string
  disabled?: boolean //是否禁用菜单选项
}

export interface route extends childRoute {
  isNoMenuRoute?: boolean //是否不是菜单路由
  onlyOne?: boolean //只是一级菜单路由
}
