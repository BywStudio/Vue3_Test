// 导入 vue-router
import { createRouter, createWebHashHistory } from "vue-router"

// 导入路由组件
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'

// 导入 store/storage.js 中的 store 状态数据
import store from '../store/storage.js'


// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { 
      path: '/login', 
      component: Login, 
      name: 'login'
    },
    {
      path: '/home',
      component: Home,
      name: 'home',
      children: [
        // 订单管理子路由
        { 
          path: '/:pathMatch(.*)*',  // 0是普通订单
          component: () => import('../components/order/Order.vue'),
          name: "Order"
        },
        // 商品管理子路由
        { 
          path: 'goods/:type',  // 0是普通商品, 1是秒杀商品
          component: () => import('../components/goods/Goods.vue'),
          name: "Goods"
        },
        // 添加商品子路由
        { 
          path: 'addgoods/:type', 
          component: () => import('../components/goods/AddGoods.vue'),
          name: "AddGoods"
        },
        // 商品分类子路由
        {
          path:'category',
          component: () => import('../components/goods/GoodsCategory.vue'),
          name:"GoodsCategory"
        },
        // 店长列表子路由
        {
          path:'ownerlist',
          component: () => import('../components/manager/ManagerList.vue'),
          name:'ManagerList'
        },
        // 店长申请列表子路由
        {
            path:'ownerreq',
            component: () => import('../components/manager/ManagerReqList.vue'),
            name:'ManagerReqList'
        
        },
        // 店长订单子路由
        {
            path:'ownerorder',
            component: () => import('../components/manager/ManagerOrder.vue'),
            name:'ManagerOrder'
        },
        // 财务明细子路由
        {
            path:'tradeinfo',
            component: () => import('../components/financial/TradeInfo.vue'),
            name:'TradeInfo'
        },
        // 财务对账订单
        {
            path:'tradelist',
            component: () => import('../components/financial/TradeList.vue'),
            name:'TradeList'
        },
        // 基础设置、数据统计子路由
        {
            path:'data',
            component: () => import('../components/financial/DataCom.vue'),
            name:'DataCom'
        }
      ],
      // 每次登录都重定向到 /home/order/0 这个页面
      redirect: '/home/order/0'
    }
  ]
})

// 路由前置守卫，当未登录时，非登录页面的其他页面都不允许跳转
router.beforeEach((from) => {
  // 不能和导入进来的 store 的名字一样
 const Store = store()
 let isLogin = Store.isLogin
 // 如果账户名不为0，并且是从 login 路由地址过来的，那么就认为是已经登录
 // 否则都认为是未登录状态，强制跳转到名为 login 的路由地址
 if(isLogin || from.name == 'login'){
   return true
 } else {
   return { name: 'login'}
 }
})

export default router