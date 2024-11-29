<template>
  <div class="index">
    首页
    <div class="br">1</div>
  </div>
</template>

<script setup lang="ts">
console.log('首页加载。。。')
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
  // @include center;
  overflow-y: scroll; //竖向滚动
  overflow-x: scroll; //横向滚动
  // .br {
  //   width: 2000px;
  //   height: 2000px;
  //   background-color: goldenrod;
  // }
}
</style>
