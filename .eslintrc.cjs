/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  rules: {
    //配置 prettier 规则
    "prettier/prettier": ["error", { semi: false, printWidth: 100, arrowParens: "avoid" }], //不要使用分号
    "vue/multi-word-component-names": 0,
    "@typescript-eslint/no-explicit-any": ["off"],
    "no-empty": ["warn", { allowEmptyCatch: false }],
  },
  ignorePatterns: ["**/dist/**", "**/node_modules/**"],
}
