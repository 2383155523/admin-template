<template>
  <div class="index">Page22</div>
</template>

<script setup lang="ts">
console.log("Page2加载。。。")
</script>

<style lang="scss" scoped>
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
