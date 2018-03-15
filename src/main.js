// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// mint UI
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);


// 调用接口
import {post,fetch,patch,put} from './assets/js/base.js'
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
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
