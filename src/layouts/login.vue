<template>
  <div class="container-login">
    <div class="title">后台管理系统</div>
    <div class="form">
      <div class="input">
        <div class="input-title">Login</div>
        <div class="userName">
          <input
            type="text"
            autocomplete="off"
            class="userName-input"
            v-model="userName"
            @focus="userNameFocus"
            @blur="userNameBlur"
            ref="userNameEl"
          />
          <div
            class="placeholder"
            :class="userNameIsFocus ? 'inputFocus' : 'inputBulr'"
            ref="userNamePlaceholderEl"
          >
            userName
          </div>
        </div>
        <div class="passWord">
          <input
            type="password"
            autocomplete="off"
            class="passWord-input"
            v-model="passWord"
            @focus="passWordFocus"
            @blur="passWordBlur"
            ref="passWordEl"
            @keyup.enter="submit"
          />
          <div
            ref="passWordPlaceholderEl"
            class="placeholder"
            :class="passWordIsFocus ? 'inputFocus' : 'inputBulr'"
          >
            passWord
          </div>
        </div>
      </div>
      <div class="submit">
        <div class="button" @click="submit">登录</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, h } from "vue"
import { useRouter } from "vue-router"
import { useNotification, NAvatar, NButton, useMessage } from "naive-ui"
import { adminInfo } from "@/config/var"
import { useAdminStore } from "@/stores/admin/index"

const message = useMessage()
const notification = useNotification()
const AdminStore = useAdminStore()
const router = useRouter()
const userNameIsFocus = ref<boolean>(false)
const passWordIsFocus = ref<boolean>(false)
const userName = ref<string>("") //用户名
const passWord = ref<string>("") //密码
const userNameEl = ref<any>(null)
const userNamePlaceholderEl = ref<any>(null)
const passWordEl = ref<any>(null)
const passWordPlaceholderEl = ref<any>(null)

const getAdminInfo = async () => {
  if (true) {
    //登录成功
    passWord.value = ""
    userName.value = ""
    AdminStore.setToken("123456iamtoken") //登录成功设置token
    const data = adminInfo
    AdminStore.setAdminInfo(data) //全局缓存管理员信息
    const timer1: any = setTimeout(() => {
      message.success("登录成功,正在跳转至首页......")
      window.$closeLoading() //关闭Loading动画
      router.push({ path: "/" })
      let markAsRead = false
      const n = notification.create({
        title: "欢迎首次进入",
        content: `尊敬的超级管理员:${data.name},小蝣对您的首次到来表示热烈欢迎！`,
        meta: new Date().toLocaleString(),
        avatar: () =>
          h(NAvatar, {
            size: "small",
            round: false,
            src: data.avatar_url,
          }),
        action: () =>
          h(
            NButton,
            {
              text: true,
              type: "primary",
              onClick: () => {
                markAsRead = true
                n.destroy()
              },
            },
            {
              default: () => "已读",
            }
          ),
        onClose: () => {
          if (!markAsRead) {
            message.warning("请设为已读")
            return false
          }
        },
      })
      clearTimeout(timer1)
    }, 2000)
  } else {
    //登录失败
    // passWord.value = ""
    // userName.value = ""
    // setTimeout(() => {
    //   message.error("登录失败,账号或密码错误")
    //   window.$closeLoading()
    // }, 2000)
  }
}

const submit = async () => {
  //提交登录
  if (!formVerify()) {
    message.warning("请填写账号和密码")
    return
  }
  window.$loading() //Loading动画开始加载
  //登录接口逻辑
  // const res = await login({
  //   userName: userName.value,
  //   passWord: passWord.value,
  // })
  // console.log(res)

  getAdminInfo()
}
const formVerify = () => {
  //表单验证
  if (userName.value.trim() == "") {
    userNameEl.value.style.borderColor = "#F44336"
    userNamePlaceholderEl.value.classList.add("animate__shakeX")
  } else {
    userNameEl.value.style.borderColor = "#fff"
  }
  if (passWord.value.trim() == "") {
    passWordEl.value.style.borderColor = "#F44336"
    passWordPlaceholderEl.value.classList.add("animate__shakeX")
  } else {
    passWordEl.value.style.borderColor = "#fff"
  }
  setTimeout(() => {
    userNamePlaceholderEl.value.classList.remove("animate__shakeX")
    passWordPlaceholderEl.value.classList.remove("animate__shakeX")
  }, 1000)
  return userName.value.trim() != "" && passWord.value.trim() != ""
}

const userNameBlur = () => {
  //失去焦点
  if (userName.value.trim() == "") {
    userNameIsFocus.value = false
  } else {
    userNameEl.value.style.borderColor = "#fff"
  }
}
const userNameFocus = () => {
  //聚焦
  userNameIsFocus.value = true
  if (passWord.value.trim() == "") {
    passWordIsFocus.value = false
  }
}
const passWordBlur = () => {
  //失去焦点
  if (passWord.value.trim() == "") {
    passWordIsFocus.value = false
  } else {
    passWordEl.value.style.borderColor = "#fff"
  }
}
const passWordFocus = () => {
  //聚焦
  passWordIsFocus.value = true
  if (userName.value.trim() == "") {
    userNameIsFocus.value = false
  }
}
</script>

<style scoped lang="scss">
$border-radius: 6px;
.animate__shakeX {
  animation: shakeX 1s;
  color: #f44336 !important;
}
@mixin center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@mixin removeInputDefaultStyle {
  background: none;
  border: none;
  outline: none;
}

@mixin newInputStyle {
  width: 85%;
  color: #fff;
  font-size: 18px;
  box-sizing: border-box;
  padding: 5px;
  border-bottom: 2px solid #fff;
  transition: all 0.3s;
}
.placeholder {
  position: absolute;
  top: -7px;
  left: 5px;
  font-size: 18px;
  // color: #97f6c2;
  // color: var(--themeColor);
  color: #333;
  opacity: 0.7;
  font-weight: bold;
  transition: all 0.3s;
}
.inputFocus {
  font-size: 14px;
  top: -25px;
}
.inputBulr {
  font-size: 18px;
  top: -7px;
}
.container-login {
  width: 100vw;
  height: 100vh;
  // background-image: linear-gradient(135deg, #81fbb8 10%, #28c76f 100%);
  background: url("https://fuyouplus.oss-cn-beijing.aliyuncs.com/image/lightBg.jpg") no-repeat;
  background-size: cover;
  position: relative;
  .title {
    font-size: 35px;
    color: #fff;
    letter-spacing: 8px;
    text-align: center;
    transform: translateY(30px);
  }
  @media (max-width: 768px) {
    .form {
      width: 100% !important;
    }
  }
  .form {
    width: 750px;
    height: 330px;
    display: flex;
    // background-image: linear-gradient(135deg, #28c76f 10%, #81fbb8 100%);
    background: rgba(255, 255, 255, 0.2);
    // -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(2px);
    @include center;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
    border-radius: $border-radius;
    .input {
      flex: 1;
      height: 100%;
      // background-image: linear-gradient(135deg, #28c76f 10%, #81fbb8 100%);
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
      position: relative;
      .input-title {
        font-size: 20px;
        color: #fff;
        // color: #333;
        // border-bottom: 2px solid #97f6c2;
        border-bottom: 2px solid var(--themeColor);
        width: 65px;
        text-align: center;
        margin-top: 50px;
        margin-left: 60px;
      }
      .userName {
        margin-top: 50px;
        margin-left: 60px;
        position: relative;
        .userName-input {
          @include removeInputDefaultStyle;
          @include newInputStyle;
        }
      }
      .passWord {
        margin-top: 60px;
        margin-left: 60px;
        position: relative;
        .passWord-input {
          @include removeInputDefaultStyle;
          @include newInputStyle;
        }
      }
    }
    .submit {
      width: 200px;
      height: 100%;
      // background: #28c76f;
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
      // border-left: 2px solid #eee;
      position: relative;
      .button {
        @include center;
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        font-size: 14px;
        color: #fff;
        // border: 1px solid #81fbb8;
        // var(--themeColor)
        border: 2px solid #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
