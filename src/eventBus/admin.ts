import { createEventBus } from "xiao-you-bus"
import { defaultTheme } from "@/config/var"
import type { Theme } from "@/config/var"
interface State {
  theme: Theme
}

const admin_bus = createEventBus<State>({
  theme: defaultTheme,
})
export default admin_bus
