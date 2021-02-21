import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // vuex 自身的 state 作为参数传递
    add(state) {
      // 执行 +1 操作
      state.count++
    },
    addN(state, payload) {
      state.count = state.count + payload
    },
    sub(state) {
      state.count--
    },
    subN(state, payload) {
      state.count -= payload
    }
  },
  actions: {
    // 执行异步操作
    addNAsync({ commit }, payload) {
      // 通过mutation改变state中数据
      setTimeout(() => {
        commit('addN', payload)
      }, 1000)
    },
    subAsync({ commit }) {
      // 通过mutation改变state中数据
      setTimeout(() => {
        commit('sub')
      }, 1000)
    },
    subNAsync({ commit }, payload) {
      // 通过mutation改变state中数据
      setTimeout(() => {
        commit('subN', payload)
      }, 1000)
    }
  },
  getters: {
    countChange(state) {
      return state.count > 8 ? '大于8' : '不大于8'
    }
  },
  modules: {}
})
