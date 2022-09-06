<template>
  <div class="index">Page2--->Child</div>
</template>

<script setup lang="ts">
console.log("Page2--->Child加载。。。")
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
