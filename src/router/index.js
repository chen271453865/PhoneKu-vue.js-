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
import RealName  from '@/components/my/RealName'
import Recharge  from '@/components/my/Recharge'
import Withdrawals  from '@/components/my/Withdrawals'
import ChangeLoginPassword  from '@/components/my/ChangeLoginPassword'
import ChangeTransitionPassword  from '@/components/my/ChangeTransitionPassword'
import LoginOut  from '@/components/my/LoginOut'




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
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Hall,
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
        path: '/my/My',
        name:'My',
        component: My
    },
    {
        path: '/my/RealName',
        name:'RealName',
        component:RealName
    },
    {
        path: '/my/Recharge',
        name:'Recharge',
        component:Recharge
    },
    {
        path: '/my/Withdrawals',
        name:'Withdrawals',
        component:Withdrawals
    },
    {
        path: '/my/ChangeLoginPassword',
        name:'ChangeLoginPassword',
        component:ChangeLoginPassword
    },
    {
        path: '/my/ChangeTransitionPassword',
        name:'ChangeTransitionPassword',
        component:ChangeTransitionPassword
    },
    {
        path: '/my/LoginOut',
        name:'LoginOut',
        component:LoginOut
    },
    {
        path: '/public',
        name: 'Footers',
        component: Footers
    },
  ]
})