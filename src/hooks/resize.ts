import { ref } from "vue"

export const width = ref<number>(window.innerWidth)
export const height = ref<number>(window.innerHeight)
export const isPC = ref<boolean>(window.innerWidth > 1240)

window.addEventListener("resize", () => {
  isPC.value = window.innerWidth > 1240
  width.value = window.innerWidth
  height.value = window.innerHeight
})
