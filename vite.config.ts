import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vite"
import DefineOptions from "unplugin-vue-define-options/vite"
import { resolve } from "path"

export default defineConfig({
  base: "/admin-template/", //production Mode
  // base: "/", //development Mode
  define: {
    _VUE_OPTIONS_API_: JSON.stringify(false),
  },
  build: {
    cssCodeSplit: false,
    chunkSizeWarningLimit: 1024,
    //开启代码分割
    // rollupOptions: {
    //   output: {
    //     manualChunks(id) {
    //       if (id.includes("node_modules")) {
    //         return id
    //           .toString()
    //           .split("node_modules/")[1]
    //           .split("/")[0]
    //           .toString()
    //       }
    //     },
    //   },
    // },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有包含短横线的标签作为自定义元素处理
          // isCustomElement: tag => tag.includes("my-"),
        },
      },
    }),
    DefineOptions(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.module.scss";`, //全局混入scss
      },
    },
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    alias: [
      //配置路径别名
      { find: "@", replacement: resolve(__dirname, "src") },
      { find: "@type", replacement: resolve(__dirname, "src/types") },
      { find: "@cop", replacement: resolve(__dirname, "src/components") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@icons", replacement: resolve(__dirname, "src/Icons") },
      { find: "@utilCop", replacement: resolve(__dirname, "src/utilComponents") },
      { find: "@api", replacement: resolve(__dirname, "src/api") },
      { find: "@mock", replacement: resolve(__dirname, "src/mock") },
    ],
  },
})
