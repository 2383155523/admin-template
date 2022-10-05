import login from "@/layouts/login.vue"
import layout from "@/layouts/index.vue"
import type { route } from "@type/route"

function useConstantRoutes() {
  console.log("layout=", layout)
  //常量路由
  const constantRoutes: Array<route> = [
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
      path: "/test2",
      component: layout,
      meta: {
        title: "测试2",
      },
      children: [
        {
          path: "index",
          name: "test2-index",
          fullPath: "/test2/index",
          component: () => import("@pages/test2/index.vue"),
          meta: {
            title: "测试2",
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/dashboard",
    },
  ]
  return constantRoutes
}

export default useConstantRoutes
