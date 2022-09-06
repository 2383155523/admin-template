<script lang="ts" setup>
import {
  NConfigProvider,
  darkTheme,
  lightTheme,
  NMessageProvider,
  NNotificationProvider,
  NDialogProvider,
  NLoadingBarProvider,
  zhCN,
  dateZhCN,
} from "naive-ui"
import { onMounted } from "vue"
import fullScreenLoading from "@utilCop/loading/fullScreenLoading/index.vue"
import { useStore } from "vuex"
import { getStorage } from "@/util/cache"
const store = useStore()

const initThemeColor = () => {
  const themeColor =
    getStorage("themeColor") == null ? store.state.admin.themeColor : getStorage("themeColor")

  store.commit("admin/setThemeColor", themeColor)
}
onMounted(() => {
  initThemeColor()
})
</script>

<template>
  <n-config-provider
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="store.state.admin.theme == 'light' ? lightTheme : darkTheme"
    :theme-overrides="{
      common: {
        primaryColor: store.state.admin.themeColor,
        primaryColorHover: store.state.admin.themeColor,
        primaryColorPressed: store.state.admin.themeColor,
        primaryColorSuppl: store.state.admin.themeColor,
      },
      Scrollbar: {
        color: `var(--themeColor)`,
        colorHover: 'var(--themeColor)',
      },
    }"
  >
    <n-notification-provider>
      <n-dialog-provider>
        <n-loading-bar-provider>
          <n-message-provider>
            <router-view></router-view>
            <fullScreenLoading />
          </n-message-provider>
        </n-loading-bar-provider>
      </n-dialog-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style lang="scss">
@import url("@/styles/reset.scss");
#nprogress .bar {
  background: var(--themeColor) !important; //自定义颜色
}
</style>
