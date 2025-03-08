import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/main.less'
// element-plus
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
