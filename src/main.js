// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// mint UI
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

// vuex
import store from '../src/assets/js/store';



// 调用接口
import {post,fetch,patch,put} from './assets/js/base.js'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;

import jquery from 'jquery'


import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>',
  methods:{
    moreChart() {
        var options = this.getMoreOptions(this.type);
 
        if (this.chart) {
            this.chart.destroy();
        };
    // 初始化 Highcharts 图表
    this.chart = new Highcharts.Chart('highcharts-more', options);
    }
  }
})
// main.js
// router.beforeEach((to, from, next) => {
//   console.log((to, from, next)  );
//   // return false;
//   if (to.path === '/' && localStorage.getItem('tooken') && from.path !== '/login'){
//     localStorage.removeItem('tooken')
//     next()
//   }
//   else if (to.meta.requiresAuth && !localStorage.getItem('tooken')){
//     next(
//       {
//         path: '/',
//         query: {redirect: to.fullPath}
//       }
//     )
//   }
//   else if (from.path === '/Login' && to.path === '/index/Hall'){
//     next({
//       path: '/index/Hall'
//     })
//   }
//   else{
//     next()
//   }
// })
