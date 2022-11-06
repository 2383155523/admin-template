import type { DirectiveBinding } from "vue"

/***
 * @Name v-drag
 *
 * @Author 微若蜉蝣
 *
 * @Use
 *
 * @template <div v-drag="true"> <button id="trigge">move</button> </div>
 *
 * @triggeId id为 trigge的DOM元素视为移动触发器
 *
 * @true 开启边界模式 Start OutOfBound Mode
 *
 * @false 关闭边界模式 Close OutOfBound Mode
 *
 * @default false
 *
 * @FAQ 出现的大部分问题都源自OffsetParent的错乱
 */

export default {
  created(el: HTMLElement, binding: DirectiveBinding) {
    if (typeof binding.value !== "boolean") {
      console.error(`v-drag value type must equal Boolean`)
      return
    }
    const enableLog = true // Log Mode 开启日志
    const isOutOfBound = binding.value === true //是否允许越界
    const trigge: HTMLDivElement = el.querySelector("#trigge")
    if (!trigge) {
      console.error(
        `v-drag Dom must has trigge element and element should has id the value is trigge`
      )
      return
    }

    trigge.style.cssText = `cursor: move;`

    trigge.addEventListener("mousedown", () => {
      const dragDomOffsetParent = el.offsetParent as HTMLElement
      document.onmousemove = function (e: MouseEvent) {
        let left = e.pageX
        let top = e.pageY

        if (isOutOfBound && dragDomOffsetParent) {
          if (
            left >=
            dragDomOffsetParent.clientWidth -
              (el.offsetWidth - trigge.offsetLeft - trigge.offsetWidth / 2)
          ) {
            //右边越界
            left = dragDomOffsetParent.clientWidth - el.offsetWidth
            enableLog && console.log("右边越界")
          } else if (
            left <=
            trigge.offsetWidth / 2 +
              parseFloat(window.getComputedStyle(el).paddingLeft) +
              trigge.offsetLeft
          ) {
            //左边越界
            left = 0
            enableLog && console.log("左边越界")
          } else {
            enableLog && console.log("left正常")
            left = left - trigge.offsetLeft - trigge.offsetWidth / 2
          }

          if (
            top >=
            dragDomOffsetParent.clientHeight -
              (el.offsetHeight - trigge.offsetTop - trigge.offsetHeight / 2)
          ) {
            //下面越界
            top = dragDomOffsetParent.clientHeight - el.offsetHeight
            enableLog && console.log("下面越界")
          } else if (top <= trigge.offsetTop + trigge.offsetHeight / 2) {
            //上面越界
            top = 0
            enableLog && console.log("上面越界")
          } else {
            enableLog && console.log("top正常")
            top = top - trigge.offsetTop - trigge.offsetHeight / 2
          }
        } else {
          left = left - trigge.offsetLeft - trigge.offsetWidth / 2
          top = top - trigge.offsetTop - trigge.offsetHeight / 2
        }
        el.style.cssText = `
        position:absolute;
        left:${left}px;
        top:${top}px;
        `
      }

      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    })
  },
}
