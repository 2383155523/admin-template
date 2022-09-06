import type { adminInfo_type } from "@/types/var"

//虚拟管理员信息
export const adminInfo: adminInfo_type = {
  id: 1,
  name: "微若蜉蝣",
  avatar_url: "https://q2.qlogo.cn/headimg_dl?spec=100&dst_uin=2383155523",
  tag: "博主",
  blog_url: "https://fuyouplus.cn",
  qq: "2383155523",
  email: "2383155523@qq.com",
  password: "",
}

//项目本地储存名称前缀
export const projectStoragePrefix = "adminTemplate_"

//默认主题色
//设置前请前往 Storage 清除缓存才能能生效
export const defaultThemeColor = "#6739b6"

//默认主题
export type Theme = "light" | "dark"
export const defaultTheme: Theme = "light"

//网易云歌单ID
export const WangYiYunMusicListId = "6753853945"

//侧边菜单是否默认居右
export const menuDefaultIsToRight = false

//音乐组件默认是否展示
export const musicDefaulMode = false

//页面默认动画模式
export type PageAnimateMode = "zoom-fade" | "top-fade"
export const defaultPageAnimateMode: PageAnimateMode = "zoom-fade"

//浅色主题自动开启时间
export const lightThemeSetupTime = (hours: number) => hours < 18 || hours > 4

//深色主题自动开始时间
export const darkThemeSetupTime = (hours: number) => hours >= 18 || hours <= 4

//开发环境Api地址
export const devApiBaseUrl = "/Api/"

//生产环境Api地址
export const proApiBaseUrl = "https://fuyouplus.cn/Api/"

//Http Time Out
export const httpTimeOut = 5000

//token前缀
export const tokenPrefix = "Bearer "
