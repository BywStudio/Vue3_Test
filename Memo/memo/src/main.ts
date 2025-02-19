// ElementPlus -------------------------------
// 导入 elment-plus 包
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入 element-plus 的 less 包
import './style/main.less'



import { createApp } from 'vue'
// 导入 pinia 状态管理工具
import { createPinia } from 'pinia'

import App from './App.vue'
// 导入路由对象
import router from './router'

const app = createApp(App)

// 在 app 实例上注册使用
app.use(createPinia())
// 在 app 实例上注册使用
app.use(router)
// ElementPlus在 app 的实例上使用
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
