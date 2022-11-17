<template>
  <transition name="fade">
    <div
      class="loading"
      :class="{
        [`${AdminSettingStore.theme}-loading`]: true,
        'loading-auto': auto,
      }"
      v-if="isShow"
    >
      <div class="loading-box">
        <svg
          class="loading-icon"
          :class="AdminSettingStore.theme + '-loading-icon'"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 100;270 100 100"
              begin="0s"
              dur="1.6s"
              fill="freeze"
              repeatCount="indefinite"
            ></animateTransform>
            <circle
              fill="none"
              stroke="currentColor"
              stroke-width="16"
              stroke-linecap="round"
              cx="100"
              cy="100"
              r="92"
              stroke-dasharray="567"
              stroke-dashoffset="1848"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 100 100;135 100 100;450 100 100"
                begin="0s"
                dur="1.6s"
                fill="freeze"
                repeatCount="indefinite"
              ></animateTransform>
              <animate
                attributeName="stroke-dashoffset"
                values="567;142;567"
                begin="0s"
                dur="1.6s"
                fill="freeze"
                repeatCount="indefinite"
              ></animate>
            </circle>
          </g>
        </svg>
        <p class="loading-text" :class="AdminSettingStore.theme + '-loading-text'">
          {{ text }}
        </p>
      </div>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { defineProps, toRefs, withDefaults } from "vue"
import { useAdminSettingStore } from "@/stores/admin/setting"
const AdminSettingStore = useAdminSettingStore()
const props = withDefaults(
  defineProps<{
    isShow: boolean
    text?: string
    auto?: boolean
  }>(),
  {
    isShow: false,
    text: "快马加鞭中...",
    auto: false,
  }
)
const { isShow, text, auto } = toRefs(props)
</script>
<style lang="scss" scoped>
@import url("./theme/dark.scss");
@import url("./theme/light.scss");
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 98;
  border-radius: var(--radius);
  transition: all 0.3s var(--n-bezier);
  .loading-box {
    width: 100%;
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .loading-icon {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .loading-text {
      font-size: 14px;
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin-top: 45px;
      letter-spacing: 3px;
    }
  }
}
.loading-auto {
  position: absolute;
  top: 0;
  left: 0;
}

.fade-enter-active {
  -webkit-animation: fadeIn 0.5s linear;
  animation: fadeIn 0.5s linear;
}
.fade-leave-active {
  -webkit-animation: fadeOut 0.5s linear;
  animation: fadeOut 0.5s linear;
}
</style>
