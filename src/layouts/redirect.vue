<!-- <script lang="ts" setup>
import { onBeforeMount, unref } from "vue"
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()
onBeforeMount(() => {
  const { params } = route
  const { originUrl } = unref(params)
  router.replace(originUrl)
})
</script> -->

<script lang="ts" setup>
import { unref } from "vue"
import { useRouter } from "vue-router"

const { currentRoute, replace } = useRouter()
const { params, query } = unref(currentRoute)
const { path } = params
console.log("currentRoute=", currentRoute)
const _path = Array.isArray(path) ? path.join("/") : path
console.log("_path=", _path)

replace({
  path: "/" + _path,
  query,
})
</script>

<template>
  <div>redirect</div>
</template>
