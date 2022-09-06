import menuRoutes from "@/router/meun"
import { RouterLink } from "vue-router"
import { h } from "vue"
import type { route } from "@type/route"
import type { MenuOption } from "naive-ui"

// 根据菜单路由递归创建菜单选项
function createMenuOptions(menuRoutes: Array<route>): Array<MenuOption> {
  const MenuOptions: Array<MenuOption> = []
  function createChildren(route: route): MenuOption {
    function createMenuItem(route: route): MenuOption {
      let menuItem: MenuOption = {}
      if (route.meta.onlyOne) {
        const child = route.children[0]
        menuItem = {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: child.name,
                },
              },
              {
                default: () => child.meta.title,
              }
            ),
          key: child.fullPath,
        }
        if (child.icon || route.icon) {
          menuItem.icon = () => h(child.icon ? child.icon : route.icon)
        }
      } else {
        menuItem = {
          label: route.children
            ? route.meta.title
            : () =>
                h(
                  RouterLink,
                  {
                    to: {
                      name: route.name,
                    },
                  },
                  {
                    default: () => route.meta.title,
                  }
                ),
          key: route.fullPath,
        }
        if (route.icon) {
          menuItem.icon = () => h(route.icon)
        }
      }
      return menuItem
    }
    const menuItem: MenuOption = createMenuItem(route)

    if (route.children && route.children.length && !route.meta.onlyOne) {
      menuItem.children = []
      route.children.forEach((route: route) => {
        menuItem.children.push(createChildren(route))
      })
    }

    return menuItem
  }
  menuRoutes.forEach((route: route) => {
    MenuOptions.push(createChildren(route))
  })
  return MenuOptions
}

export default function useMenuOptions(): Array<MenuOption> {
  return createMenuOptions(menuRoutes)
}
