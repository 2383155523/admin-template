import { defineAsyncComponent } from "vue"

import browser from "./admin/browser.vue"
import closeAll from "./admin/closeAll.vue"
import reload from "./admin/reload.vue"
import dropdown from "./admin/dropdown.vue"
import close from "./admin/close.vue"
import sun from "./admin/sun.vue"
import moon from "./admin/moon.vue"
import lock from "./admin/lock.vue"
import fullscreenIn from "./admin/fullscreenIn.vue"
import fullscreenOut from "./admin/fullscreenOut.vue"
import setting from "./admin/setting.vue"
import home from "./admin/home.vue"
import menuFold from "./admin/menuFold.vue"
import menuUnFold from "./admin/menuUnFold.vue"
import tag from "./admin/tag.vue"
import logout from "./admin/logout.vue"

// ------------------------------------ Admin Icons-----------------------------------
//不要删除这里的 这是本项目默认依赖的图标
//按需加载，会对首次进入系统的体验有些影响，但会对系统的首次加载速度有提升
// export const IBrowser = defineAsyncComponent(() => import("./admin/browser.vue"))
// export const ICloseAll = defineAsyncComponent(() => import("./admin/closeAll.vue"))
// export const IReload = defineAsyncComponent(() => import("./admin/reload.vue"))
// export const IDropdown = defineAsyncComponent(() => import("./admin/dropdown.vue"))
// export const IClose = defineAsyncComponent(() => import("./admin/close.vue"))
// export const ISun = defineAsyncComponent(() => import("./admin/sun.vue"))
// export const IMoon = defineAsyncComponent(() => import("./admin/moon.vue"))
// export const ILock = defineAsyncComponent(() => import("./admin/lock.vue"))
// export const IFullscreenIn = defineAsyncComponent(() => import("./admin/fullscreenIn.vue"))
// export const IFullscreenOut = defineAsyncComponent(() => import("./admin/fullscreenOut.vue"))
// export const ISetting = defineAsyncComponent(() => import("./admin/setting.vue"))
// export const IHome = defineAsyncComponent(() => import("./admin/home.vue"))
// export const IMenuFold = defineAsyncComponent(() => import("./admin/menuFold.vue"))
// export const IMenuUnFold = defineAsyncComponent(() => import("./admin/menuUnFold.vue"))
// export const ITag = defineAsyncComponent(() => import("./admin/tag.vue"))
// export const ILogout = defineAsyncComponent(() => import("./admin/logout.vue"))

//全量加载 会对首次进入系统的速度有些影响，但会对系统的首次进入体验增强
export const IBrowser = browser
export const ICloseAll = closeAll
export const IReload = reload
export const IDropdown = dropdown
export const IClose = close
export const ISun = sun
export const IMoon = moon
export const ILock = lock
export const IFullscreenIn = fullscreenIn
export const IFullscreenOut = fullscreenOut
export const ISetting = setting
export const IHome = home
export const IMenuFold = menuFold
export const IMenuUnFold = menuUnFold
export const ITag = tag
export const ILogout = logout
// ------------------------------------ Your Icons-----------------------------------
//书写引入你的图标吧
