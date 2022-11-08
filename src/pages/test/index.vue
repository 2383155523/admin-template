<template>
  <div class="index">
    <div class="header">test</div>
    <div class="content">
      <input type="text" v-model="content" />
      <button @click="goRedirect">点我</button>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

defineOptions({
  name: "test",
})

const content = ref<string>("")
const router = useRouter()
function goRedirect() {
  router.push("/test2/index")
}
onMounted(() => {
  console.log("testMounted")
})
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
