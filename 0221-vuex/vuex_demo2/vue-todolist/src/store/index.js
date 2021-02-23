import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: [],
    inputVal: '',
    nextId: 5
  },
  mutations: {
    // 操作数据state
    getList(state, payload) {
      state.list = payload
    },
    // #2 input 框数据变更
    setInputVal(state, val) {
      state.inputVal = val
    },
    // #3 添加数据
    addItem(state) {
      const obj = {
        id: state.nextId++,
        info: state.inputVal.trim(),
        done: false
      }
      state.list.push(obj)
      state.inputVal = ''
    },
    // #4 删除数据
    removeItem(state, id) {
      state.list = state.list.filter(item => item.id !== id)
    },
    // #5 修改状态
    statusChange(state, payload) {
      const i = state.list.findIndex(item => item.id === payload.id)
      if (i !== -1) state.list[i].done = payload.status
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
