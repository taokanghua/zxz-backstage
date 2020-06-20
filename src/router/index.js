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
            redirect:'MemOrder'
        },
        {
            path:'MemOrder',
            name:'MemOrder',
            component:() => import('@/views/index/MemOrder.vue')
        },
        {
            path:'order',
            name:'order',
            component:() => import('@/views/index/order.vue')
        },
        {
            path:'rechargeChart',
            name:'rechargeChart',
            component:() => import('@/views/index/rechargeChart.vue')
        },
    ]
}]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router