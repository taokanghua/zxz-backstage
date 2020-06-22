import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect:'login'
    },
    {
        path:'/login',
        name:'login',
        component:() => import('@/views/Login.vue')
    },
    {
    path: '/index',
    name: 'index',
    component: () =>import ('@/views/Index'),
    children:[
        {
            path:'/index',
            redirect:'welcome'
        },
        {
            path:'welcome',
            name:'welcome',
            component:() => import('@/views/Welcome.vue')
        },
        {
            path:'MemOrder',
            name:'MemOrder',
            component:() => import('@/views/member/MemOrder.vue')
        },
        {
            path:'order',
            name:'order',
            component:() => import('@/views/order/order.vue')
        },
        {
            path:'rechargeChart',
            name:'rechargeChart',
            component:() => import('@/views/order/rechargeChart.vue')
        },
        { // 测试路由 无用
            path:'test',
            name:'test',
            component: () => import('@/views/test.vue')
        }
    ]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router