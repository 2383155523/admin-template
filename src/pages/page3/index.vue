<template>
  <div class="index">page3-child1_1</div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.index {
  width: 100%;
  height: 100%;
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
