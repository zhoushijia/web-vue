import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    // 操作数据state
    getList(state, payload) {
      state.list = payload
    }
  },
  actions: {
    // #1 发请求获取数据
    async getListAsync({ commit }) {
      // http://localhost:8080/ 就是 public 文件夹对应路径
      const { data } = await axios.get('/list.json')
      // mutation 操作数据
      commit('getList', data)
    }
  },
  modules: {}
})
