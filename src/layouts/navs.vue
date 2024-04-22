<template>
  <div class="routeContainer">
    <div
      class="routeNav"
      :style="{
        'max-width': AdminSettingStore.isCollapsed ? '92vw' : '85vw',
      }"
    >
      <draggable
        tag="transition-group"
        v-model="routeStack"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="path"
      >
        <template #item="{ element, index }">
          <span
            class="routerItem fade-in-left"
            :key="element.path"
            @click="link(element.path)"
            @dblclick="reloadCurrent(element.path)"
            @mousedown="mouseDownHandle($event, index)"
            :class="{
              currentRouterItem: route.path == element.path,
              'fade-out-right': currentCloseRouteIndexs.includes(index),
            }"
          >
            {{ element.title }}
            <i-close
              color="var(--iconColor)"
              v-if="element.canItBeClosed"
              @click.stop="closeRouter(index)"
              :class="{
                currentRouterItem: route.path == element.path,
              }"
              class="icon"
            />
          </span>
        </template>
      </draggable>
    </div>
    <div class="routerSetting">
      <n-dropdown :options="settingOptions" :show-arrow="true">
        <div class="dropdown-box">
          <i-dropdown color="var(--iconColor)" />
        </div>
      </n-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router"
import { useAdminSettingStore } from "@/stores/admin/setting"
import { useRouteStackStore } from "@/stores/admin/routeStack"
import { h, ref, computed } from "vue"
import { IClose, IDropdown, IReload, ICloseAll } from "@icons/index"
import { NDropdown, useMessage, useLoadingBar } from "naive-ui"
import { reload } from "@/hooks/reload"
import draggable from "vuedraggable"
const router = useRouter()
const route = useRoute()
const AdminSettingStore = useAdminSettingStore()
const RouteStackStore = useRouteStackStore()
const message = useMessage()
const loadingBar = useLoadingBar()
const drag = ref(false)

const routeStack = computed({
  get: () => {
    return RouteStackStore.routeStack
  },
  set: val => {
    RouteStackStore.setRouterStack(val)
  },
})
const dragOptions = computed(() => {
  return {
    animation: 300,
    group: "description",
    disabled: false,
    ghostClass: "ghost",
  }
})

interface routerItem {
  canItBeClosed: boolean
  path: string
  title: string
}

const settingOptions = [
  {
    label: () => h("div", { onClick: refreshCurrent }, "刷新当前"),
    key: "刷新当前",
    icon: () => h(IReload),
  },
  {
    label: () => h("div", { onClick: closeCurrent }, "关闭当前"),
    key: "关闭当前",
    icon: () => h(IClose),
  },
  {
    label: () => h("div", { onClick: closeOther }, "关闭其他"),
    key: "关闭其他",
    icon: () => h(IClose),
  },
  {
    label: () => h("div", { onClick: closeAll }, "关闭全部"),
    key: "关闭全部",
    icon: () => h(ICloseAll),
  },
]
const mouseDownHandle = (e: MouseEvent, index: number) => {
  if (e.button == 1) {
    closeRouter(index)
  }
}
const currentCloseRouteIndexs = ref<Array<number>>([])

const closeRouter = (index: number) => {
  if (routeStack.value[index].title == "主控台") {
    message.warning("主控台无法关闭")
    return
  }
  const originRouterPath: string = RouteStackStore.routeStack[index].path
  currentCloseRouteIndexs.value = [index]
  const timer = setTimeout(() => {
    RouteStackStore.filterRouterStack(index)
    currentCloseRouteIndexs.value = []
    if (route.path == originRouterPath) {
      //只有当前路由相同时才做判断跳转
      if (index == RouteStackStore.routeStack.length) {
        //最后一个路由
        router.push({
          path: RouteStackStore.routeStack[index - 1].path,
        })
      } else {
        //不是最后一个路由
        router.push({
          path: RouteStackStore.routeStack[index].path,
        })
      }
    }
    clearTimeout(timer)
  }, 400)
}

const link = (url: string) => {
  if (route.path != url) {
    router.push({ path: url })
  }
}

const reloadCurrent = (url: string) => {
  if (route.path == url) {
    refreshCurrent()
  }
}

const refreshCurrent = () => {
  //刷新当前页面
  // router.push({
  //   name: "reload",
  //   params: { originUrl: unref(route).fullPath },
  // });
  reload(loadingBar)
}

const closeCurrent = () => {
  //关闭当前
  const index = RouteStackStore.routeStack.findIndex((item: routerItem) => item.path == route.path)
  closeRouter(index)
}

const closeOther = () => {
  //关闭其他
  const currentCloseRouteIndexsTmp = []
  const index = RouteStackStore.routeStack.findIndex((item: routerItem) => item.path == route.path)
  const filterResult = RouteStackStore.routeStack.filter((item: routerItem, i: number) => {
    if (index == i || item.title == "主控台") {
      return true
    } else {
      currentCloseRouteIndexsTmp.push(i)
      return false
    }
  })
  currentCloseRouteIndexs.value = currentCloseRouteIndexsTmp
  const timer = setTimeout(() => {
    RouteStackStore.setRouterStack(filterResult)
    currentCloseRouteIndexs.value = []
    clearTimeout(timer)
  }, 400)
}

const closeAll = () => {
  //关闭所有
  const currentCloseRouteIndexsTmp = []
  const filterResult = RouteStackStore.routeStack.filter((item: routerItem, index) => {
    if (item.title == "主控台") {
      return true
    } else {
      currentCloseRouteIndexsTmp.push(index)
      return false
    }
  })
  currentCloseRouteIndexs.value = currentCloseRouteIndexsTmp
  const timer = setTimeout(() => {
    RouteStackStore.setRouterStack(filterResult)
    currentCloseRouteIndexs.value = []
    router.push({ path: "/" })
    clearTimeout(timer)
  }, 400)
}
</script>

<style lang="scss" scoped>
.ghost {
  opacity: 0.5;
  background: var(--themeColor);
}
.currentRouterItem {
  color: var(--themeColor) !important;
}
.dark-el-dropdown-item,
.light-el-dropdown-item {
  cursor: var(--cursor-B);
}
.routeContainer {
  height: 100%;
  width: 100%;
  max-width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  .routeNav {
    flex: 1;
    height: 100%;
    line-height: 5vh;
    max-height: 5vh;
    border-radius: var(--radius);
    box-sizing: border-box;
    position: relative;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    margin-right: 20px;
    transition: all 0.3s var(--n-bezier);
    .routerItem {
      display: inline-block;
      height: 16px;
      line-height: 16px;
      padding: 6px 16px;
      text-align: center;
      font-size: 12.5px;
      border-radius: 3px;
      margin-right: 15px;
      transition: background 0.3s var(--n-bezier), color 0.3s var(--n-bezier);
      user-select: none;
      background: var(--navsItemBg);
      color: var(--navsColor);

      .icon {
        transform: translate(7px, 2px);
        transition: color 0.3s var(--n-bezier);
      }
    }
  }
  .routerSetting {
    cursor: var(--cursor-B);
    border-radius: 2px;
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s var(--n-bezier);
    background: var(--BlockBgColor);
    .dropdown-box {
      width: 100%;
      height: 100%;
      line-height: 32px;
      text-align: center;
    }
    i {
      transform: translateY(3px);
    }
  }
}
</style>
