import bus from "@/eventBus/admin"
import {
  adminInfo,
  defaultThemeColor,
  defaultTheme,
  musicDefaulMode,
  menuDefaultIsToRight,
  defaultPageAnimateMode,
} from "@/config/var"
import { setStorage } from "@/util/cache"
import type { adminInfo_type } from "@/types/var"
import type { Theme, PageAnimateMode } from "@/config/var"
export interface adminState {
  adminInfo: adminInfo_type
  isLogin: boolean
  themeColor: string
  theme: string
  routeStack: Array<routerItem>
  isCollapsed: boolean
  menuToRight: boolean
  musicMode: boolean
  pageAnimateMode: PageAnimateMode
}

export interface routerItem {
  canItBeClosed: boolean
  path: string
  title: string
}

const html = document.querySelector("html")
let index = 0

const state: adminState = {
  adminInfo,
  isLogin: false,
  themeColor: defaultThemeColor,
  theme: defaultTheme,
  routeStack: [],
  isCollapsed: false,
  menuToRight: menuDefaultIsToRight, //是否菜单默认在右边
  musicMode: musicDefaulMode, //音乐播放模式
  pageAnimateMode: defaultPageAnimateMode, //页面动画模式
}

const getters = {
  adminInfo: (state: adminState) => state.adminInfo,
  isLogin: (state: adminState) => state.isLogin,
  themeColor: (state: adminState) => state.themeColor,
  theme: (state: adminState) => state.theme,
  routeStack: (state: adminState) => state.routeStack,
  isCollapsed: (state: adminState) => state.isCollapsed,
  menuToRight: (state: adminState) => state.menuToRight,
  musicMode: (state: adminState) => state.musicMode,
  pageAnimateMode: (state: adminState) => state.pageAnimateMode,
}

const mutations = {
  setPageAnimateMode(state: adminState, val: PageAnimateMode) {
    //设置页面动画模式
    state.pageAnimateMode = val
  },
  setMusicMode(state: adminState, val: boolean) {
    //设置音乐播放模式
    state.musicMode = val
  },
  setMenuToRight(state: adminState, val: boolean) {
    //设置菜单是否在右边
    state.menuToRight = val
  },
  setIsCollapsed(state: adminState, val: boolean) {
    state.isCollapsed = val
  },
  setThemeColor(state: adminState, val: string): void {
    //设置主题色
    state.themeColor = val
    document.documentElement.style.setProperty("--themeColor", val)
    setStorage("themeColor", val)
  },
  setAdminInfo(state: adminState, val: adminInfo_type): void {
    //设置管理员信息
    state.adminInfo = val
  },
  setIsLogin(state: adminState, val: boolean): void {
    //设置登录状态
    state.isLogin = val
    setStorage("isLogin", val)
  },
  setTheme(state: adminState, val: Theme): void {
    //设置主题
    state.theme = val
    bus.state.theme = val
    if (val == "light") {
      html.classList.remove("dark")
    } else {
      html.classList.remove("light")
    }
    html.classList.add(val)
    setStorage("theme", val)
  },
  setRouterStack(state: adminState, val: Array<routerItem>): void {
    //直接设置routeStack
    state.routeStack = val
    setStorage("routeStack", JSON.stringify(state.routeStack))
  },
  pushRouterStack(state: adminState, val: routerItem): void {
    //置入routeItem
    const isRepet = state.routeStack.some(item => item.title == val.title) //为真 就表示重复了,反之
    if (!isRepet) {
      state.routeStack.push(val)
      if (index != 0) {
        setStorage("routeStack", JSON.stringify(state.routeStack))
      }
      index++
    }
  },
  filterRouterStack(state: adminState, index: number): void {
    //筛选置入routeStack
    state.routeStack = state.routeStack.filter((item, i) => i != index)
    setStorage("routeStack", JSON.stringify(state.routeStack))
  },
}

const actions = {
  setPageAnimateMode({ commit }, val) {
    commit("actions", val)
  },
}

export interface AdminModuleType {
  state: () => adminState
  getters: object
  mutations: object
  actions: object
}

export default {
  namespaced: true,
  state: () => state,
  getters,
  mutations,
  actions,
}
