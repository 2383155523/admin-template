<template>
  <div class="index">
    <n-button @click="showModal = true"> 来吧 </n-button>
    <n-modal v-model:show="showModal">
      <div class="modal-content" v-drag="true">
        <header id="trigge">Move</header>
      </div>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { NButton, NModal } from 'naive-ui'
import { ref } from 'vue'
const showModal = ref<boolean>(false)
console.log('Page2加载。。。')
</script>

<style lang="scss" scoped>
.modal-content {
  width: 500px;
  height: 400px;
  background-color: var(--BlockBgColor);
  border-radius: 10px;
  padding: 20px;
  position: relative;
  // border: 1px solid;
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  header {
    background-color: red;
    width: 50px;
    height: 50px;
    @include center;
    font-size: 20px;
    color: #fff;
    // position: absolute;
    // top: 50%;
    // left: 50%;
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
  // @include center;
  position: relative;
}
</style>
