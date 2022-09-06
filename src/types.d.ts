interface $msg {
  success: (v) => void
  warning: (v) => void
  error: (v) => void
}

declare interface Window {
  $loading: (closeTiming?: number) => void
  $closeLoading: () => void
  $nprogress: object
  $msg: $msg
}
