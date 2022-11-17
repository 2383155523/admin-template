import { defineStore } from "pinia"
import { setStorage } from "@/util/cache"

export interface routerItem {
  canItBeClosed: boolean
  path: string
  title: string
}
interface State {
  routeStack: Array<routerItem>
}

export const useRouteStackStore = defineStore("RouteStack", {
  state: (): State => ({ routeStack: [] }),
  actions: {
    setRouterStack(val: Array<routerItem>): void {
      //直接设置routeStack
      this.routeStack = val
      setStorage("routeStack", JSON.stringify(this.routeStack))
    },
    pushRouterStack(val: routerItem): void {
      //置入routeItem
      const isRepet = this.routeStack.some(item => item.title == val.title) //为真 就表示重复了,反之
      if (!isRepet) {
        this.routeStack.push(val)
        setStorage("routeStack", JSON.stringify(this.routeStack))
      }
    },
    filterRouterStack(index: number): void {
      //筛选置入routeStack
      this.routeStack = this.routeStack.filter((item, i) => i != index)
      setStorage("routeStack", JSON.stringify(this.routeStack))
    },
  },
})
