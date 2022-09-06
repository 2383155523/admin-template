<script lang="ts" setup>
import { ref, watch, defineExpose } from "vue"
import { ISun, IMoon } from "@icons/index"
import {
  NDrawer,
  NDrawerContent,
  NDivider,
  NColorPicker,
  NSwitch,
  NSelect,
  NButton,
  useMessage,
  useDialog,
} from "naive-ui"
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { menuDefaultIsToRight, musicDefaulMode } from "@/config/var"
import color from "@/config/color"
import bus from "@/eventBus/admin"
import type { CSSProperties } from "vue"

const store = useStore()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()
const theme = ref<string>("")
const settingIsShow = ref<boolean>(false)
const grayMode = ref<boolean>(false)
const menuToRight = ref<boolean>(menuDefaultIsToRight)
const musicMode = ref<boolean>(musicDefaulMode)
const pageAnimateMode = ref<string>(store.state.admin.pageAnimateMode)
const pageAnimateModeOptions = ref<Array<{ label: string; value: string }>>([
  {
    label: "zoom-fade",
    value: "zoom-fade",
  },
  {
    label: "top-fade",
    value: "top-fade",
  },
])
const html: HTMLHtmlElement = document.querySelector("html")

const changeTheme = (val: string) => {
  store.commit("admin/setTheme", val)
}
const railStyle = ({ checked }: { focused: boolean; checked: boolean }) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = "#fff"
  } else {
    style.background = "#000e1c"
  }
  return style
}
const changeThemeColor = (value: string) => {
  store.commit("admin/setThemeColor", value)
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
      store.commit("admin/setIsLogin", false)
      router.push("/login")
    },
  })
}

watch(grayMode, (v: boolean) => {
  if (v) {
    html.classList.add("grayDay")
  } else {
    html.classList.remove("grayDay")
  }
})

watch(
  pageAnimateMode,
  (v: string) => {
    store.commit("admin/setPageAnimateMode", v)
  },
  { immediate: true }
)
watch(
  menuToRight,
  (v: boolean) => {
    store.commit("admin/setMenuToRight", v)
  },
  { immediate: true }
)
watch(
  musicMode,
  (v: boolean) => {
    store.commit("admin/setMusicMode", v)
  },
  { immediate: true }
)

watch(theme, (v: string) => {
  changeTheme(v)
})

defineExpose<{
  openSetting: () => void
}>({
  openSetting: () => {
    settingIsShow.value = true
  },
})

bus.on("theme", (v: string) => {
  theme.value = v
})
</script>

<template>
  <n-drawer v-model:show="settingIsShow" :width="300">
    <n-drawer-content closable>
      <template #header>
        <div class="settingHeader">项目设置</div>
      </template>
      <template #default>
        <n-divider title-placement="center">主题</n-divider>
        <div class="content">
          <n-switch
            v-model:value="theme"
            :rail-style="railStyle"
            checked-value="dark"
            unchecked-value="light"
          >
            <template #checked>
              <ISun size="20" color="var(--themeColor)" />
            </template>
            <template #unchecked>
              <IMoon size="20" color="var(--themeColor)" />
            </template>
          </n-switch>
        </div>
        <n-divider title-placement="center">主题色</n-divider>
        <n-color-picker
          :show-preview="true"
          placement="bottom"
          :swatches="color"
          :default-value="store.state.admin.themeColor"
          @update:value="changeThemeColor"
        />
        <!-- 更多设置 此处填入 -->
        <n-divider title-placement="center">灰度模式</n-divider>
        <div class="content">
          <n-switch v-model:value="grayMode">
            <template #checked>开启</template>
            <template #unchecked>关闭</template>
          </n-switch>
        </div>
        <n-divider title-placement="center">菜单居右</n-divider>
        <div class="content">
          <n-switch v-model:value="menuToRight">
            <template #checked>开启</template>
            <template #unchecked>关闭</template>
          </n-switch>
        </div>
        <n-divider title-placement="center">音乐模式</n-divider>
        <div class="content">
          <n-switch v-model:value="musicMode">
            <template #checked>开启</template>
            <template #unchecked>关闭</template>
          </n-switch>
        </div>
        <n-divider title-placement="center">页面切换动画设置</n-divider>
        <div class="content">
          <div class="select">
            <n-select v-model:value="pageAnimateMode" :options="pageAnimateModeOptions" />
          </div>
        </div>
        <n-divider title-placement="center">退出登录</n-divider>
        <div class="content">
          <div class="button">
            <n-button strong secondary type="error" block @click="logout">登出</n-button>
          </div>
        </div>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<style lang="scss" scoped>
.select {
  width: 50%;
}
.button {
  width: 75%;
}
.content {
  @include center;
}
.settingHeader {
  font-size: 16px;
}
</style>
