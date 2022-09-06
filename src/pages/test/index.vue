<template>
  <div class="index">
    <n-button @click="showModal = true"> 来吧 </n-button>
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="模态框"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        v-drag
      >
        <template #header-extra> 噢！ </template>
        内容
        <template #footer> 尾部 </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { NButton, NModal, NCard } from "naive-ui"
const showModal = ref(false)
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background: var(--BlockBgColor);
  box-sizing: border-box;
  padding-top: 10px;
  transition: background 0.3s var(--n-bezier);
  font-size: 50px;
  color: var(--TextColor);
  @include center;
}
</style>
