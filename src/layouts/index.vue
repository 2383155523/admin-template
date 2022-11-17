<template>
  <div class="admin">
    <div class="header"><v-header /></div>
    <div
      class="center"
      :style="{
        'flex-direction': AdminSettingStore.menuToRight ? 'row-reverse' : 'row',
      }"
    >
      <sideMenu />
      <div class="rightContainer">
        <div class="routerNav" v-if="isPC"><route-nav /></div>
        <div class="routerContent">
          <routerContent />
          <partLoading :isShow="!routeIsAlive" auto text="Loading" />
        </div>
      </div>
    </div>
    <!-- isPC && -->
    <aplayer v-if="AdminSettingStore.musicMode" />
  </div>
</template>
<script lang="ts" setup>
import VHeader from "@/layouts/vHeader.vue"
import RouteNav from "@/layouts/navs.vue"
import sideMenu from "@/layouts/sideMenu.vue"
import routerContent from "@/layouts/content.vue"
import partLoading from "@utilCop/loading/partLoading/index.vue"
import aplayer from "@/utilComponents/aplayer/index.vue"
import { onMounted, h } from "vue"
import { useAdminStore } from "@/stores/admin/index"
import { useRouteStackStore } from "@/stores/admin/routeStack"
import { useAdminSettingStore } from "@/stores/admin/setting"
import { getStorage } from "@/util/cache"
import { isPC } from "@/hooks/resize"
import { routeIsAlive } from "@/hooks/reload"
import { useNotification, NAvatar, NButton, useMessage } from "naive-ui"
import { lightThemeSetupTime, darkThemeSetupTime, adminInfo, isShowTimeTip } from "@/config/var"

const notification = useNotification()
const message = useMessage()
window.$msg = message

const AdminStore = useAdminStore()
const RouteStackStore = useRouteStackStore()
const AdminSettingStore = useAdminSettingStore()

const initAdminInfo = () => {
  //初始化Token
  AdminStore.token = getStorage("token")
  //初始化管理员信息
  AdminStore.setAdminInfo(adminInfo)
}
const initRouteStack = () => {
  const RouteStacks = JSON.parse(getStorage("routeStack"))
  RouteStackStore.setRouterStack(
    RouteStacks
      ? RouteStacks
      : [
          {
            canItBeClosed: false,
            title: "主控台",
            path: "/dashboard",
          },
        ]
  )
}
const initTheme = () => {
  const hours = new Date().getHours()
  if (darkThemeSetupTime(hours)) {
    AdminSettingStore.setTheme("dark")
  } else if (lightThemeSetupTime(hours)) {
    AdminSettingStore.setTheme("light")
  }
}

const TimeTip = () => {
  let markAsRead = false
  const hours = new Date().getHours()
  let content = null
  if (hours >= 1 && hours <= 4) {
    //凌晨
    content = "已经凌晨了,再忙也要注意休息啊！"
  } else if (hours >= 5 && hours <= 10) {
    //早上
    content = "一日之计在于晨，新的一天开始了！"
  } else if (hours >= 11 && hours <= 12) {
    //中午
    content = "肚子饿了吧,该去干饭了，然后午休一下吧！"
  } else if (hours >= 13 && hours <= 18) {
    //下午
    content = "悠闲的下午时光开始了，给自己点杯下午茶吧！"
  } else if (hours >= 19 || hours == 0) {
    //晚上
    content = "晚餐过后，更适合出门散步吹吹凉风呢！"
  }
  const n = notification.create({
    title: "小蝣温馨提示:",
    content,
    meta: new Date().toLocaleString(),
    avatar: () =>
      h(NAvatar, {
        size: "small",
        round: false,
        src: AdminStore.adminInfo.avatar_url,
      }),
    action: () =>
      h(
        NButton,
        {
          text: true,
          type: "primary",
          onClick: () => {
            markAsRead = true
            n.destroy()
          },
        },
        {
          default: () => "已读",
        }
      ),
    onClose: () => {
      if (!markAsRead) {
        message.warning("请设为已读")
        return false
      }
    },
  })
}

onMounted(() => {
  initRouteStack()
  initAdminInfo()
  initTheme()
  isShowTimeTip && TimeTip()
})
</script>
<style lang="scss" scoped>
.admin {
  width: 100vw;
  height: 100vh;
  transition: background-color 0.3s var(--n-bezier);
  overflow: hidden;
  background: var(--BodyColor);
}
.header {
  width: 100vw;
  height: 8vh;
}
.center {
  width: 100vw;
  height: 92vh;
  display: flex;

  .slideMenu {
    width: 10vw;
    height: 92vh;
    transition: width 0.3s ease-in-out;
  }
  .rightContainer {
    flex: 1;
    height: 92vh;
    width: 0;
    .routerNav {
      max-width: 98%;
      width: 98%;
      height: 5vh;
      margin: 0 auto;
      margin-top: 1vh;
      margin-bottom: 1vh;
    }
    .routerContent {
      width: 98%;
      height: 85vh;
      margin: 0 auto;
      position: relative;
    }
  }
}
@media (max-width: 1240px) {
  .routerContent {
    height: 92vh !important;
  }
}
</style>
