<script lang="ts" setup>
import { onUnmounted, onActivated, onBeforeMount, onBeforeUnmount, onMounted } from "vue"

console.log("setup")

onBeforeMount(() => {
  console.log("beforeMount")
})
onMounted(() => {
  console.log("mounted")
})
onActivated(() => {
  console.log("activated")
})
onBeforeUnmount(() => {
  console.log("beforeUnmount")
})
onUnmounted(() => {
  console.log("unmounted")
})
</script>

<template>
  <div class="a">Empty</div>
</template>

<style lang="scss" scoped>
.a {
}
</style>
