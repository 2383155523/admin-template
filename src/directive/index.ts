import { App } from "vue"
import drag from "./drag"

export default function setupDirectives(app: App) {
  app.directive("drag", drag)
}
