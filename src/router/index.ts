import constantRoutes from "./constant"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import { useRouteStackStore } from "@/stores/admin/routeStack"
import { getStorage } from "../util/cache"
import { createRouter, createWebHashHistory, type Router } from "vue-router"
import { useVueRouterConfig } from "./utils"
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

const createRouterGuards = (router: Router) => {
  //本地缓存路由栈黑名单
  const routerStackBlackList: Array<string> = ["404"]

  //路由前置守卫
  router.beforeEach((to, from, next) => {
    const token = getStorage("token") //获取本地缓存的Token
    document.title = to.meta.title
    nprogress.start()
    if (token) {
      if (to.name == "login" || to.name == "admin") {
        next("/dashboard")
        document.title = "主控台"
      } else {
        if (routerStackBlackList.every(name => to.name != name)) {
          //将不在本地缓存路由栈黑名单中的路由存入
          const RouteStackStore = useRouteStackStore()
          const routeItem = {
            canItBeClosed: true,
            title: to.meta.title,
            path: to.path,
            isFirst: true,
          }
          RouteStackStore.pushRouterStack(routeItem)
          const timer = setTimeout(() => {
            routeItem.isFirst = false
            clearTimeout(timer)
          }, 400)
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
}

export function setupRouter(app: App) {
  app.use(router)
  createRouterGuards(router)
}

export default router
