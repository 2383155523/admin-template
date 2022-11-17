import bus from "@/eventBus/admin"
import { defineStore } from "pinia"
import {
  defaultThemeColor,
  defaultTheme,
  musicDefaulMode,
  menuDefaultIsToRight,
  defaultPageAnimateMode,
} from "@/config/var"
import { setStorage } from "@/util/cache"
import type { Theme, PageAnimateMode } from "@/config/var"

interface State {
  pageAnimateMode: PageAnimateMode
  theme: Theme
  themeColor: string
  isCollapsed: boolean
  menuToRight: boolean
  musicMode: boolean
  grayMode: boolean
}

const html: HTMLHtmlElement = document.querySelector("html")

export const useAdminSettingStore = defineStore("AdminSetting", {
  state: (): State => ({
    themeColor: defaultThemeColor,
    theme: defaultTheme,
    isCollapsed: false,
    menuToRight: menuDefaultIsToRight, //是否菜单默认在右边
    musicMode: musicDefaulMode, //音乐播放模式
    pageAnimateMode: defaultPageAnimateMode, //页面动画模式
    grayMode: false,
  }),
  actions: {
    setGrayMode(val: boolean) {
      //设置页面灰度模式
      this.grayMode = val
    },
    setPageAnimateMode(val: PageAnimateMode) {
      //设置页面动画模式
      this.pageAnimateMode = val
    },
    setMusicMode(val: boolean) {
      //设置音乐播放模式
      this.musicMode = val
    },
    setMenuToRight(val: boolean) {
      //设置菜单是否在右边
      this.menuToRight = val
    },
    setIsCollapsed(val: boolean) {
      this.isCollapsed = val
    },
    setThemeColor(val: string): void {
      //设置主题色
      this.themeColor = val
      document.documentElement.style.setProperty("--themeColor", val)
      setStorage("themeColor", val)
    },
    setTheme(val: Theme): void {
      //设置主题
      this.theme = val
      bus.state.theme = val
      if (val == "light") {
        html.classList.remove("dark")
      } else {
        html.classList.remove("light")
      }
      html.classList.add(val)
      setStorage("theme", val)
    },
  },
})
