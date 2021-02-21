import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入 js 包
// import ElementUI from 'element-ui'
// 引入 css 文件
// import 'element-ui/lib/theme-chalk/index.css'
// 挂载 ElementUI 到 Vue下
// Vue.use(ElementUI)

import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
