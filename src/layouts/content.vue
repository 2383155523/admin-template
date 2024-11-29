<template>
  <router-view #default="{ Component }" v-if="routeIsAlive">
    <transition
      :name="AdminSettingStore.pageAnimateMode"
      :mode="AdminSettingStore.pageAnimateMode == 'zoom-fade' ? 'default' : 'out-in'"
    >
      <keep-alive>
        <component :is="Component" :key="Route.fullPath" class="route-container" />
      </keep-alive>
    </transition>
  </router-view>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useAdminSettingStore } from '@/stores/admin/setting'
import { routeIsAlive } from '@/hooks/reload'
const Route = useRoute()
const AdminSettingStore = useAdminSettingStore()
</script>

<style lang="scss" scoped>
.route-container {
  width: 100% !important;
  height: 100% !important;
  border-radius: var(--radius);
  background: var(--BlockBgColor);
  color: var(--TextColor);
  box-sizing: border-box;
  padding: 10px;
  transition: all 0.3s var(--n-bezier);
}

/* fade-transform */

.fade-transform-leave-active {
  animation: fadeTransformOut 0.4s ease-in-out;
}

.fade-transform-enter-active {
  animation: fadeTransformIn 0.4s ease-in-out;
}

@keyframes fadeTransformIn {
  0% {
    opacity: 0;
    transform: translateX(-20px);
  }

  100% {
    opacity: 1;
  }
}
@keyframes fadeTransformOut {
  0% {
    opacity: 1;
  }
  0% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
    transform: translateX(20px);
  }
}

//top-fade
.top-fade-leave-active {
  animation: fadeTopOut 0.8s ease-in-out;
}
.top-fade-enter-active {
  animation: fadeTopIn 0.3s ease-in-out;
}

@keyframes fadeTopIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
  }
}
@keyframes fadeTopOut {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
    transform: translateY(20px);
  }

  100% {
    opacity: 0;
  }
}

//zoom-fade

.zoom-fade-enter-active {
  animation: fadeZoomIn 1.4s;
}
.zoom-fade-leave-active {
  animation: fadeZoomOut 0.6s ease-in-out;
}

@keyframes fadeZoomIn {
  0% {
    opacity: 0;
    transform: scale(0.01, 0.01);
  }
  50% {
    transform: scale(1);
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeZoomOut {
  0% {
    opacity: 1;
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    opacity: 0;
  }
}
</style>
