import { createApp } from "vue"
import root from "./App.vue"
import { createPinia } from "pinia"
import setupRouter from "./router"
import setupDirectives from "./directive"
import setupAdminLog from "@/config/log"
import type { App } from "vue"

function setupApp() {
  const app: App = createApp(root)

  app.use(createPinia())

  setupRouter(app)

  setupDirectives(app)

  setupAdminLog()

  app.mount("#app")
}

setupApp()
