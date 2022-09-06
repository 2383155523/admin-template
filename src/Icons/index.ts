import { defineAsyncComponent } from "vue"
// ------------------------------------ Admin Icons-----------------------------------
//不要删除这里的 这是本项目默认依赖的图标
export const IBrowser = defineAsyncComponent(() => import("./admin/browser.vue"))
export const ICloseAll = defineAsyncComponent(() => import("./admin/closeAll.vue"))
export const IReload = defineAsyncComponent(() => import("./admin/reload.vue"))
export const IDropdown = defineAsyncComponent(() => import("./admin/dropdown.vue"))
export const IClose = defineAsyncComponent(() => import("./admin/close.vue"))
export const ISun = defineAsyncComponent(() => import("./admin/sun.vue"))
export const IMoon = defineAsyncComponent(() => import("./admin/moon.vue"))
export const ILock = defineAsyncComponent(() => import("./admin/lock.vue"))
export const IFullscreenIn = defineAsyncComponent(() => import("./admin/fullscreenIn.vue"))
export const IFullscreenOut = defineAsyncComponent(() => import("./admin/fullscreenOut.vue"))
export const ISetting = defineAsyncComponent(() => import("./admin/setting.vue"))
export const IHome = defineAsyncComponent(() => import("./admin/home.vue"))
export const IMenuFold = defineAsyncComponent(() => import("./admin/menuFold.vue"))
export const IMenuUnFold = defineAsyncComponent(() => import("./admin/menuUnFold.vue"))
export const ITag = defineAsyncComponent(() => import("./admin/tag.vue"))
export const ILogout = defineAsyncComponent(() => import("./admin/logout.vue"))

// ------------------------------------ Your Icons-----------------------------------
//书写引入你的图标吧
