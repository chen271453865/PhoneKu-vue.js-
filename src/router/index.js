import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Hall from '@/components/index/Hall'
import Swipe from '@/components/index/Swipe'
import Hot from '@/components/index/Hot'
import Detail from '@/components/index/Detail'
import Buy from '@/components/index/Buy'
import Sell from '@/components/index/Sell'
import HighchartsComponent  from '@/components/index/HighchartsComponent'
import Message  from '@/components/index/Message' 
import Footers from '@/components/public/Footers'
import Top from '@/components/public/Top'

// 交易市场
import TradingMarket  from '@/components/tradingMarket/tradingMarket'
// 资产
import Assets  from '@/components/Assets/Assets'
// 个人中心
import My  from '@/components/my/My'


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
        path: '/index/Buy',
        name:'Buy',
        component: Buy
    },
    {
        path: '/index/Sell',
        name:'Sell',
        component: Sell
    },
    {
        path: '/index/HighchartsComponent',
        name:'HighchartsComponent',
        component: HighchartsComponent
    },
    {
        path: '/index/Message',
        name:'Message',
        component: Message
    },
    {
        path: '/public',
        name: 'Top',
        component: Top
    },
    {
        // 交易市场
        path: '/tradingMarket/TradingMarket',
        name:'TradingMarket',
        component: TradingMarket
    },
    {
        // 资产
        path: '/assets/Assets',
        name:'Assets',
        component: Assets
    },
    {
        // 我的
        // path: '../my/my',
        // name:'My',
        // component: My
        path: '/my/My',
        name:'My',
        component: My
    },
    {
        path: '/public',
        name: 'Footers',
        component: Footers
    },
  ]
})
