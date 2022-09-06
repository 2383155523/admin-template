<script lang="ts" setup>
import { onBeforeMount, unref } from "vue"
import { useRoute, useRouter } from "vue-router"
const route = useRoute()
const router = useRouter()
onBeforeMount(() => {
  const { params } = route
  const { originUrl } = unref(params)
  router.replace(originUrl)
})
</script>
