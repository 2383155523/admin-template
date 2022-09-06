import { createEventBus } from "xiao-you-bus"

interface State {
  theme: string
}

const admin_bus = createEventBus<State>({
  theme: "",
})
export default admin_bus
