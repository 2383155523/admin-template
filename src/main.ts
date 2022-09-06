import { createApp } from "vue"
import root from "./App.vue"
import setupStore from "./store"
import setupRouter from "./router"
import setupDirectives from "./directive"
import setupAdminLog from "@/config/log"
import type { App } from "vue"

function setupApp() {
  const app: App = createApp(root)

  setupStore(app)

  setupRouter(app)

  setupDirectives(app)

  setupAdminLog()

  app.mount("#app")
}

setupApp()
