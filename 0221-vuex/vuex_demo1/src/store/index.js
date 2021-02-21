import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add() {
      // 执行 +1 操作
      this.state.count++
    }
  },
  actions: {},
  modules: {}
})
