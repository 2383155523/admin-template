<template>
  <transition name="fade">
    <div
      v-show="isShow"
      class="loadingBox"
      :style="{
        background: store.state.admin.theme == 'light' ? 'var(--themeColor)' : '#333',
      }"
    >
      <svg
        class="loading"
        version="1.1"
        id="L1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enable-background="new 0 0 100 100"
        xml:space="preserve"
      >
        <circle
          fill="none"
          :stroke="store.state.admin.theme == 'light' ? '#fff' : 'var(--themeColor)'"
          stroke-width="6"
          stroke-miterlimit="15"
          stroke-dasharray="14.2472,14.2472"
          cx="50"
          cy="50"
          r="47"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="5s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
        <circle
          fill="none"
          :stroke="store.state.admin.theme == 'light' ? '#fff' : 'var(--themeColor)'"
          stroke-width="1"
          stroke-miterlimit="10"
          stroke-dasharray="10,10"
          cx="50"
          cy="50"
          r="39"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="5s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>

        <g :fill="store.state.admin.theme == 'light' ? '#fff' : 'var(--themeColor)'">
          <rect x="30" y="35" width="5" height="30">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.1"
            ></animateTransform>
          </rect>
          <rect x="40" y="35" width="5" height="30">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.2"
            ></animateTransform>
          </rect>
          <rect x="50" y="35" width="5" height="30">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.3"
            ></animateTransform>
          </rect>
          <rect x="60" y="35" width="5" height="30">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.4"
            ></animateTransform>
          </rect>
          <rect x="70" y="35" width="5" height="30">
            <animateTransform
              attributeName="transform"
              dur="1s"
              type="translate"
              values="0 5 ; 0 -5; 0 5"
              repeatCount="indefinite"
              begin="0.5"
            ></animateTransform>
          </rect>
        </g>
      </svg>
    </div>
  </transition>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useStore } from "vuex"
const store = useStore()
const isShow = ref<boolean>(false)
const show = (closeTiming = 0) => {
  isShow.value = true
  if (closeTiming) {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      isShow.value = false
    }, closeTiming)
  }
}

const close = () => {
  isShow.value = false
}
onMounted(() => {
  window.$loading = show
  window.$closeLoading = close
})
</script>
<style lang="scss" scoped>
.loadingBox {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading {
  width: 100px;
  height: 100px;
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
