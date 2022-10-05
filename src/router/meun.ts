import layout from "@/layouts/index.vue"
import { IHome, IBrowser, ITag } from "@icons/index"
import type { route } from "@type/route"

//菜单路由
function useMenuRoutes() {
  console.log("layout=", layout)
  const menuRoutes: Array<route> = [
    {
      path: "/",
      component: layout,
      icon: IHome,
      meta: {
        title: "主控台",
      },
      onlyOne: true,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          fullPath: "/dashboard",
          component: () => import("@pages/index/index.vue"),
          meta: {
            title: "主控台",
          },
        },
      ],
    },
    {
      path: "/page2",
      icon: IBrowser,
      component: layout,
      fullPath: "page2",
      meta: {
        title: "page2",
      },
      children: [
        {
          path: "index",
          name: "index",
          fullPath: "/page2/index",
          icon: IHome,
          component: () => import("@pages/page2/index.vue"),
          meta: {
            title: "index",
          },
        },
        {
          path: "child",
          name: "child",
          icon: IBrowser,
          fullPath: "/page2/child",
          component: () => import("@pages/page2/components/child.vue"),
          meta: {
            title: "child",
          },
        },
      ],
    },
    {
      path: "/test",
      component: layout,
      icon: ITag,
      meta: {
        title: "测试",
      },
      onlyOne: true,
      children: [
        {
          path: "index",
          name: "test-index",
          fullPath: "/test/index",
          component: () => import("@pages/test/index.vue"),
          meta: {
            title: "测试",
          },
        },
      ],
    },
  ]

  return menuRoutes
}

export default useMenuRoutes
