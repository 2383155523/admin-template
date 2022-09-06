import login from "@/layouts/login.vue"
import type { RouteRecordRaw } from "vue-router"
//常量路由
const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/dashboard",
  },
  {
    path: "/login",
    name: "login",
    component: login,
    meta: {
      title: "登录",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/dashboard",
  },
]

export default constantRoutes
