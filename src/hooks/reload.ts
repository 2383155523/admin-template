import { ref, nextTick } from 'vue'

export const routeIsAlive = ref<boolean>(true)

export const reload = loadingBar => {
  loadingBar.start()
  routeIsAlive.value = false
  nextTick(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      loadingBar.finish()
      routeIsAlive.value = true
    }, 2000)
  })
}
