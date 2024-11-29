import MenuRoutes from './meun'
import { RouterLink } from 'vue-router'
import { h } from 'vue'

import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import type { route } from '@type/route'
import type { MenuOption } from 'naive-ui'

function formatRouteConfigToVueRouterConfig(): Array<RouteRecordRaw> {
  const VueRouterConfig: Array<RouteRecordRaw> = []
  //   深度遍历
  function dfs(Route: route): RouteRecordRaw {
    const routeItem: RouteRecordRaw | null = {
      path: Route.path,
      component: Route.component,
      meta: Route.meta as RouteMeta,
    }
    if (Route.name) {
      routeItem.name = Route.name
    }
    if (Route.children?.length) {
      routeItem.children = []
    }

    if (Route.children?.length) {
      for (let i = 0; i < Route.children.length; i++) {
        const item: route = Route.children[i]
        if (item.component) {
          routeItem.children.push(dfs(item))
        } else {
          routeItem.children.push(...dfs(item).children)
        }
      }
    }

    return routeItem as RouteRecordRaw
  }

  for (let i = 0; i < MenuRoutes.length; i++) {
    const routeItem = MenuRoutes[i]
    const ResultRoute: RouteRecordRaw | null = routeItem.children?.length ? dfs(routeItem) : null
    ResultRoute && VueRouterConfig.push(ResultRoute)
  }

  return VueRouterConfig
}

function formatRouteConfigToNaiveMenuOptions(): Array<MenuOption> {
  const MenuOptions: Array<MenuOption> = []
  function createChildren(route: route): MenuOption {
    function createMenuItem(route: route): MenuOption {
      let menuItem: MenuOption = {}
      if (route.onlyOne) {
        const child = route.children[0]
        menuItem = {
          disabled: child.disabled,
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
          disabled: route.disabled,
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

    if (route.children && route.children.length && !route.onlyOne) {
      menuItem.children = []
      route.children.forEach((route: route) => {
        menuItem.children.push(createChildren(route))
      })
    }

    return menuItem
  }
  MenuRoutes.forEach((route: route) => {
    !route.isNoMenuRoute && MenuOptions.push(createChildren(route))
  })
  return MenuOptions
}

export const useNaiveMenuOptions = () => formatRouteConfigToNaiveMenuOptions()
export const useVueRouterConfig = () => formatRouteConfigToVueRouterConfig()
