import { createApp } from 'vue'
import root from '@/App.vue'
import { setupStore } from '@/stores'
import router, { setupRouter } from '@/router'
import setupDirectives from '@/directive'
import setupAdminLog from '@/config/log'
import type { App } from 'vue'

async function setupApp() {
  const app: App = createApp(root)

  // 挂载状态管理
  setupStore(app)

  setupDirectives(app)

  setupAdminLog()

  setupRouter(app)

  await router.isReady()

  app.mount('#app')
}

setupApp()
