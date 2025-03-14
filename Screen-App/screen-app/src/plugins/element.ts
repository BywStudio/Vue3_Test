import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/src/common/var.scss'

export default function loadComponent (app: any): void {
  app.use(ElementPlus, {
    size: 'small',
    zIndex: 3000
  })
}
