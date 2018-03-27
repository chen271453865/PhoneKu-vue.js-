import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import stroe_data from '../js/storeData';//引入某个store对象

export default new vuex.Store({
    modules: {
        stroe_data: stroe_data
    }
})