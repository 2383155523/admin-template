import { createStore as createBaseStore } from "vuex"
import type { ModuleTree } from "vuex"
import type { AdminModuleType } from "./modules/admin"
import type { App } from "vue"

interface Modules {
  admin?: AdminModuleType
}

const createStore = () => {
  const modules = mergeModules()
  return createBaseStore({
    modules,
  })
}
const mergeModules = () => {
  const modules: ModuleTree<Modules> = {}
  const pages = import.meta.globEager("./modules/*.ts")

  Object.entries(pages).map(async ([fileName, context]) => {
    modules[fileName.replace(/(modules|\/|\.|ts)/g, "")] = {
      ...context.default,
      namespaced: true,
    }
  })

  return modules
}

export const store = createStore()

export default function setupStore(app: App) {
  app.use(store)
}
