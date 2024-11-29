<script lang="ts" setup>
import { useNaiveMenuOptions } from '@/router/utils'
import { NSpace, NLayout, NLayoutSider, NMenu } from 'naive-ui'
import { useAdminSettingStore } from '@/stores/admin/setting'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import { ref } from 'vue'
import { IMenuFold, IMenuUnFold } from '@icons/index'
import { isPC } from '@/hooks/resize'

const route = useRoute()
const AdminSettingStore = useAdminSettingStore()
const menuOptions = useNaiveMenuOptions()

const collapsed = ref<boolean>(!isPC.value)
watch(isPC, newVal => {
  collapsed.value = !newVal
})
watch(collapsed, newVal => {
  AdminSettingStore.setIsCollapsed(newVal)
})
</script>

<template>
  <n-space vertical class="sideMenu">
    <!-- :class="collapsed ? 'icon-collapsed' : 'icon'"  -->
    <div class="collapsed-btn">
      <i-menu-un-fold
        size="22"
        color="var(--iconColor)"
        v-if="collapsed"
        @click="collapsed = !collapsed"
      />
      <i-menu-fold size="22" color="var(--iconColor)" v-else @click="collapsed = !collapsed" />
    </div>

    <n-layout has-sider>
      <n-layout-sider
        collapse-mode="width"
        :collapsed-width="70"
        :width="200"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        trigger-style="right:5px;"
        style="background: var(--BlockBgColor)"
      >
        <n-menu
          :value="route.path"
          :collapsed="collapsed"
          :collapsed-width="70"
          :collapsed-icon-size="22"
          :options="menuOptions"
          :accordion="true"
        />
      </n-layout-sider>
    </n-layout>
  </n-space>
</template>
<style lang="scss" scoped>
.sideMenu {
  height: 92vh;
  box-shadow: rgb(0 0 0 / 30%) 0px 19px 38px, rgb(0 0 0 / 22%) 0px 15px 12px;
  transition: background-color 0.3s var(--n-bezier);
  position: relative;
  background: var(--BlockBgColor);
  overflow-y: scroll;
}

.collapsed-btn {
  transition: all 0.3s var(--n-bezier);
}

.icon {
  text-align: right;
  box-sizing: border-box;
  padding-right: 10px;
  padding-top: 10px;
}

.icon-collapsed {
  text-align: center;
  padding-right: 0;
  padding-top: 10px;
}
</style>
