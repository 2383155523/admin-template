<template>
  <div class="index">
    <n-button @click="showModal = true"> 来吧 </n-button>
    <n-modal v-model:show="showModal">
      <div class="modal-content" v-drag="true">
        <header id="trigge">Move</header>
      </div>
      <!-- <n-card
        style="width: 600px"
        title="模态框"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
        v-drag
      >
        <template #header-extra>
          <div id="trigge">Move</div>
        </template>
        内容
        <template #footer> 尾部 </template>
      </n-card> -->
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { NButton, NModal, NCard } from "naive-ui"
import { ref } from "vue"
const showModal = ref<boolean>(false)
console.log("Page2加载。。。")
</script>

<style lang="scss" scoped>
.modal-content {
  width: 500px;
  height: 400px;
  background-color: var(--BlockBgColor);
  border-radius: 10px;
  padding: 20px;
  position: relative;
  header {
    background-color: red;
    width: 50px;
    height: 50px;
    @include center;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
  }
}

.index {
  border-radius: var(--radius);
  background: var(--BlockBgColor);
  box-sizing: border-box;
  padding-top: 10px;
  transition: background 0.3s var(--n-bezier);
  font-size: 50px;
  color: var(--TextColor);
  @include center;
}
</style>
