export const getRandom = (start: number, end: number): number => {
  //获得指定区间的随机数
  return Math.floor(start + (end - start) * Math.random())
}
interface Element {
  requestFullscreen?: any
  mozRequestFullScreen?: any
  webkitRequestFullscreen?: any
  msRequestFullscreen?: any
}

export const fullScreenIn = (el: Element = document.body) => {
  //将传入元素全屏显示 默认全屏body
  if (el.requestFullscreen) {
    el.requestFullscreen() //通用浏览器下
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen() //火狐下
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen() //谷歌下
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen() //safari下
  }
}

interface doc extends Document {
  exitFullScreen?: any
  mozCancelFullScreen?: any
  webkitExitFullscreen?: any
  msExitFullscreen?: any
  fullscreenElement: any
  mozFullScreenElement?: any
  msFullScreenElement?: any
  webkitFullscreenElement?: any
  mozFullScreen?: any
  webkitIsFullScreen?: any
  webkitFullScreen?: any
  msFullScreen?: any
}
export const fullScreenOut = () => {
  //退出全屏
  const doc: doc = document
  if (doc.exitFullScreen) {
    doc.exitFullScreen()
  } else if (doc.mozCancelFullScreen) {
    doc.mozCancelFullScreen()
  } else if (doc.webkitExitFullscreen) {
    doc.webkitExitFullscreen()
  } else if (doc.msExitFullscreen) {
    doc.msExitFullscreen()
  }
}

export const getFullscreenEl = () => {
  //获取当前全屏的元素节点
  const doc: doc = document
  return (
    doc.fullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullScreenElement ||
    doc.webkitFullscreenElement ||
    null
  )
}

export const isFullScreen = () => {
  //判断当前是否是全屏
  const doc: doc = document
  if (doc.fullscreen != null) {
    return doc.fullscreen
  } else if (doc.mozFullScreen != null) {
    return doc.mozFullScreen
  } else if (doc.webkitIsFullScreen != null) {
    return doc.webkitIsFullScreen
  } else if (doc.webkitFullScreen != null) {
    return doc.webkitFullScreen
  } else if (doc.msFullScreen != null) {
    return doc.msFullScreen
  }
}

export const toStr = (data: any): string => {
  return Object.prototype.toString.call(data).slice(8, -1)
}

export const throttle = (fn: (...arg) => void, timeOut: number): ((...arg) => void) => {
  let flag = true
  return (...arg: Array<unknown>) => {
    if (!flag) return
    fn(...arg)
    flag = false
    const timer = setTimeout(() => {
      flag = true
      clearTimeout(timer)
    }, timeOut)
  }
}

export const debounce = (fn: (...arg) => void, timeOut: number): ((...arg) => void) => {
  let timer: any
  return (...arg: Array<unknown>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...arg)
    }, timeOut)
  }
}

//test
export function sum(a: number, b: number): number {
  return a + b
}
