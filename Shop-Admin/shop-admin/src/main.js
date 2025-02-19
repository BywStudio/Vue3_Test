import { createApp } from 'vue'
import App from './App.vue'

// 导入pinia、路由
import { createPinia } from 'pinia'
import router from './router/index'

// 导入 element-plus、引入 css 样式、引入图标
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 遍历 ElementPlusIconsVe 中的所有组件，并进行注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
app.use(createPinia())
app.use(router)
app.mount('#app')