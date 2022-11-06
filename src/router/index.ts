import constantRoutes from "./constant"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import { store } from "@/store"
import { getStorage } from "../util/cache"
import { createRouter, createWebHashHistory } from "vue-router"
import { useVueRouterConfig } from "./utils"
import "./utils"
import type { App } from "vue"

//nprogress 配置
nprogress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false,
})

//如有其他路由文件 可由此导入解构合并
//if has other route file you can import merge here.
const routes = [...constantRoutes, ...useVueRouterConfig()]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

//本地缓存路由栈黑名单 "redirect"
const routerStackBlackList: Array<string> = ["404"]

//路由前置守卫
router.beforeEach((to, from, next) => {
  const loginState = getStorage("isLogin") == "true" //获取本地缓存的登录状态
  document.title = to.meta.title
  nprogress.start()
  if (loginState) {
    if (to.name == "login" || to.name == "admin") {
      next("/dashboard")
      document.title = "主控台"
    } else {
      if (routerStackBlackList.every(name => to.name != name)) {
        //404不置入路由栈中 但放行进入404页面
        store.commit("admin/pushRouterStack", {
          canItBeClosed: true,
          title: to.meta.title,
          path: to.path,
        })
      }
      next()
    }
  } else {
    if (to.name == "login") {
      next()
    } else {
      next({ name: "login" })
      document.title = "登录"
    }
  }
})
//路由后置守卫
router.afterEach(() => {
  nprogress.done()
})

export default function setupRouter(app: App) {
  app.use(router)
}
