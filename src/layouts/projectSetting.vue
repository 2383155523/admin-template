<script lang="ts" setup>
import color from '@/config/color'
import themeSwitch from './themeSwitch.vue'
import { ref, watch, defineExpose } from 'vue'
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
} from 'naive-ui'
import { useAdminSettingStore } from '@/stores/admin/setting'
import { useAdminStore } from '@/stores/admin/index'
import { useRouter } from 'vue-router'

const AdminSettingStore = useAdminSettingStore()
const AdminStore = useAdminStore()
const router = useRouter()
const message = useMessage()
const dialog = useDialog()
const settingIsShow = ref<boolean>(false)
const grayMode = ref<boolean>(AdminSettingStore.grayMode)
const pageAnimateModeOptions = ref<Array<{ label: string; value: string }>>([
  {
    label: 'zoom-fade',
    value: 'zoom-fade',
  },
  {
    label: 'top-fade',
    value: 'top-fade',
  },
  {
    label: 'fade-transform',
    value: 'fade-transform',
  },
])

const changeThemeColor = (value: string) => {
  AdminSettingStore.setThemeColor(value)
}

const logout = () => {
  //退出登录
  dialog.warning({
    title: '退出登录',
    content: '确定退出登录吗?',
    positiveText: '确定',
    negativeText: '不确定',
    onPositiveClick: () => {
      message.success('已注销')
      AdminStore.setToken('')
      router.push('/login')
    },
  })
}

watch(grayMode, (v: boolean) => {
  const html: HTMLHtmlElement = document.querySelector('html')
  if (v) {
    html.classList.add('grayDay')
  } else {
    html.classList.remove('grayDay')
  }
  AdminSettingStore.setGrayMode(v)
})

defineExpose<{
  openSetting: () => void
}>({
  openSetting: () => {
    settingIsShow.value = true
  },
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
          <themeSwitch />
        </div>
        <n-divider title-placement="center">主题色</n-divider>
        <n-color-picker
          :show-preview="true"
          placement="bottom"
          :swatches="color"
          :default-value="AdminSettingStore.themeColor"
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
          <n-switch v-model:value="AdminSettingStore.menuToRight">
            <template #checked>开启</template>
            <template #unchecked>关闭</template>
          </n-switch>
        </div>
        <n-divider title-placement="center">音乐模式</n-divider>
        <div class="content">
          <n-switch v-model:value="AdminSettingStore.musicMode">
            <template #checked>开启</template>
            <template #unchecked>关闭</template>
          </n-switch>
        </div>
        <n-divider title-placement="center">页面切换动画设置</n-divider>
        <div class="content">
          <div class="select">
            <n-select
              v-model:value="AdminSettingStore.pageAnimateMode"
              :options="pageAnimateModeOptions"
            />
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
