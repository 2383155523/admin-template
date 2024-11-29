<template>
  <div class="index">
    <div class="header"></div>
    <div class="content">
      <input type="text" v-model="content" />
      <h1>test2</h1>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const content = ref<string>('')
</script>

<style lang="scss" scoped>
.index {
  .header {
    width: 100%;
    height: 10%;
    background: var(--BlockBgColor);
    transition: background 0.3s var(--n-bezier);
    border-radius: var(--radius);
    margin-bottom: 50px;
  }
  .content {
    width: 100%;
    height: 70%;
    background: var(--BlockBgColor);
    transition: background 0.3s var(--n-bezier);
    border-radius: var(--radius);
    margin-bottom: 50px;
  }
  .footer {
    width: 100%;
    height: 5%;
    background: var(--BlockBgColor);
    transition: background 0.3s var(--n-bezier);
    border-radius: var(--radius);
  }
}
</style>
