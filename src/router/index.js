import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Hall from '@/components/index/Hall'
import Swipe from '@/components/index/Swipe'
import Hot from '@/components/index/Hot'
import Detail from '@/components/index/Detail'
import HighchartsComponent  from '@/components/index/HighchartsComponent'
import Footers from '@/components/public/Footers'
import Top from '@/components/public/Top'


Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        component: Login
    },
    {
        path: '/Register',
        component: Register
    },
    {
        path: '/index/Hall',
        component: Hall
    },
    {
        path: '/Swipe',
        component: Swipe
    },
    {
        path: '/Hot',
        component: Hot
    },
    {
        path: '/index/Detail',
        name:'Detail',
        component: Detail
    },
    {
        path: '/index/HighchartsComponent',
        name:'HighchartsComponent',
        component: HighchartsComponent
    },
    {
        path: '/public',
        name: 'Footers',
        component: Footers
    },
    {
        path: '/public',
        name: 'Top',
        component: Top
    },
  ]
})
