import { IHome, IBrowser, ITag } from "@icons/index"
import type { route } from "@type/route"

const Layout = () => import("@/layouts/index.vue")

//菜单路由
const menuRoutes: Array<route> = [
  {
    path: "/",
    component: Layout,
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
    component: Layout,
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
    component: Layout,
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
  {
    path: "/page3",
    fullPath: "/page3",
    component: Layout,
    icon: ITag,
    meta: {
      title: "page3",
    },
    children: [
      {
        path: "child1",
        fullPath: "/page3/child1",
        icon: ITag,
        meta: {
          title: "child1",
        },
        children: [
          {
            path: "child1_1",
            name: "child1_1",
            icon: IHome,
            fullPath: "/page3/child1_1",
            component: () => import("@pages/page3/index.vue"),
            meta: {
              title: "child1_1",
            },
          },
        ],
      },
    ],
  },
]

export default menuRoutes
