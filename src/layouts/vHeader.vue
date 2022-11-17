<script lang="ts" setup>
import { ref, shallowRef } from "vue"
import { useAdminSettingStore } from "@/stores/admin/setting"
import { useAdminStore } from "@/stores/admin/index"
import { fullScreenIn, fullScreenOut } from "@/util/util"
import { NTooltip, useMessage, useDialog } from "naive-ui"
import { ISun, IMoon, IFullscreenIn, IFullscreenOut, ISetting, ILogout } from "@icons/index"
import { useRouter } from "vue-router"
import { isPC } from "@/hooks/resize"
import projectSetting from "./projectSetting.vue"
import type { Theme } from "@/config/var"

const AdminSettingStore = useAdminSettingStore()
const AdminStore = useAdminStore()
const router = useRouter()
const isFullScreenIn = ref<boolean>(false)
const setting = shallowRef()
const message = useMessage()
const dialog = useDialog()

const openSetting = () => {
  setting.value.openSetting()
}

const logout = () => {
  //退出登录
  dialog.warning({
    title: "退出登录",
    content: "确定退出登录吗?",
    positiveText: "确定",
    negativeText: "不确定",
    onPositiveClick: () => {
      message.success("已注销")
      AdminStore.setToken("")
      router.push("/login")
    },
  })
}

const fullScreen = () => {
  //全屏
  if (isFullScreenIn.value) {
    fullScreenOut()
  } else {
    fullScreenIn()
  }
  isFullScreenIn.value = !isFullScreenIn.value
}

const changeTheme = (val: Theme) => {
  AdminSettingStore.setTheme(val)
}
</script>
<template>
  <div class="header">
    <div class="title">
      <span class="title-text">{{ AdminStore.adminInfo.name }}</span>
    </div>
    <div class="logo">
      <a :href="AdminStore.adminInfo.blog_url" target="_blank"
        ><img :src="AdminStore.adminInfo.avatar_url" alt=""
      /></a>
    </div>
    <div class="util">
      <n-tooltip trigger="hover" v-if="isPC">
        <template #trigger>
          <i-logout
            size="22"
            :color="AdminSettingStore.theme == 'light' ? '#333' : '#fff'"
            @click.stop="logout"
          />
        </template>
        退出登录
      </n-tooltip>
      <n-tooltip trigger="hover">
        <template #trigger>
          <i-setting
            size="22"
            :color="AdminSettingStore.theme == 'light' ? '#333' : '#fff'"
            @click.stop="openSetting"
          />
        </template>
        系统配置
      </n-tooltip>
      <n-tooltip trigger="hover" v-if="isPC">
        <template #trigger>
          <i-fullscreen-in
            size="22"
            :color="AdminSettingStore.theme == 'light' ? '#333' : '#fff'"
            v-if="!isFullScreenIn"
            @click.stop="fullScreen"
          />
          <i-fullscreen-out
            size="22"
            :color="AdminSettingStore.theme == 'light' ? '#333' : '#fff'"
            v-else
            @click.stop="fullScreen"
          />
        </template>

        {{ isFullScreenIn ? "退出全屏" : "进入全屏" }}
      </n-tooltip>
      <n-tooltip trigger="hover" v-if="isPC">
        <template #trigger>
          <i-moon
            size="22"
            @click.stop="changeTheme('dark')"
            v-if="AdminSettingStore.theme == 'light'"
            :color="AdminSettingStore.theme == 'light' ? '#333' : '#fff'"
          />
          <i-sun
            :color="AdminSettingStore.theme == 'light' ? '#333' : '#fff'"
            size="22"
            @click.stop="changeTheme('light')"
            v-else
          />
        </template>
        {{ AdminSettingStore.theme == "light" ? "深色模式" : "浅色模式" }}
      </n-tooltip>
    </div>
  </div>
  <!-- 项目设置 -->
  <projectSetting ref="setting" />
</template>
<style lang="scss" scoped>
.header {
  width: 100vw;
  height: 8vh;
  line-height: 8vh;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  display: flex;
  position: relative;
  z-index: 2;
  transition: background-color 0.3s var(--n-bezier);
  background: var(--BlockBgColor);
  .logo {
    position: relative;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      width: 60px;
      height: 60px;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: var(--radius);
      cursor: var(--cursor-B);
      box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 5px 0px 10px;
    }
  }
  .title {
    flex: 1;
    .title-text {
      margin-left: 40px;
      color: var(--themeColor);
      letter-spacing: 2px;
      font-size: 25px;
      font-weight: bold;
    }
  }
  .util {
    flex: 1;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    i {
      margin-right: 30px;
    }
  }
}

@media (max-width: 768px) {
  .title {
    display: none;
  }
  .logo {
    justify-content: start !important;
    margin-left: 10px;
  }
  a {
    width: 50px !important;
    height: 50px !important;
  }
  img {
    width: 50px !important;
    height: 50px !important;
  }
}
</style>
