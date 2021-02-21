import Vue from 'vue'
import App from './App.vue'
// #1
import Antd from 'ant-design-vue'
// #2
import 'ant-design-vue/dist/antd.css'
// ! 必须引入 store 不然没法使用 vuex
import store from './store/index'

Vue.config.productionTip = false

// #3
Vue.use(Antd)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
