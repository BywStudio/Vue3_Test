module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },

  rules: {
    "no-console": process. env. NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process. env. NODE_ENV === "production" ? "warn" : "off",

    "prettier/prettier": "off",
    "vue/no-unused-components": "off",
    "@typescripteslint/explicitfunction-return-type": "off",
    "no-irregular-whitespace": "off", //禁止掉空格报错检查
    "@typescript-eslit/no-explicit-any":"off",
    "@typescript-eslint/no-empty-function":"off",
    "@typescript-eslint/no-inferrabl-types": "off", //关闭类型推断＇＠七ypescript-eslint/no-var-requires': "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescr ipt-eslint/ban-ts-comment": "off",
  },
  overrides: [
    {
      files: ['src/**/**/*.vue'],
      rules: {
        'vue/multi-word-component-names': 0
      }
    }
  ]
}
