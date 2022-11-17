import { defineStore } from "pinia"
import { adminInfo, tokenPrefix } from "@/config/var"
import { setStorage, removeStorage } from "@/util/cache"
import type { Admin_Info } from "@/config/var"

interface State {
  adminInfo: Admin_Info
  token: string
}

export const useAdminStore = defineStore("Admin", {
  state: (): State => ({
    adminInfo,
    token: "",
  }),
  actions: {
    setAdminInfo(val: Admin_Info): void {
      //设置管理员信息
      this.adminInfo = val
    },
    setToken(val: string): void {
      //设置Token
      this.token = val
      if (val) {
        setStorage("token", tokenPrefix + val)
      } else {
        removeStorage("token")
      }
    },
  },
})
