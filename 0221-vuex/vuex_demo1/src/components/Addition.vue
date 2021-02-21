<template>
  <div>
    <!-- template 中 this 可以省略 -->
    <!-- 获取vuex中store的state中数据 -->
    <!-- #1 -->
    <h3>加之后的数值:{{ $store.state.count }}</h3>
    <!-- #2 -->
    <!-- <h3>{{ count }}</h3> -->
    <!-- #3 -->
    <h3>{{ count88 }}</h3>
    <h3>{{ count8 }}</h3>
    <!-- #4 -->
    <h3>{{ countPlusLocal }}</h3>
    <h3>{{ $store.getters.countChange }}</h3>
    <button @click="addCount">+1</button>
    <button @click="addNCount">+n</button>
    <button @click="$store.dispatch('addNAsync', 2)">+n 异步</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
console.log(mapState(['count'])) // 结果是函数
export default {
  data() {
    return {
      localCount: 8
    }
  },
  // 传数组
  // computed: mapState(['count'])
  // 独立出来，computed中还可以新增计算属性
  /* computed: {
    ...mapState(['count'])
  } */
  computed: mapState({
    // 取别名
    count88: 'count',
    count8: state => state.count,
    // 函数处理
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocal(state) {
      return state.count + this.localCount
    }
  }),
  methods: {
    addCount() {
      // 通知 vuex 修改数据 参数传递
      this.$store.commit('add')
    },
    addNCount() {
      // 通知 vuex 修改数据 并 参数传递
      // #1
      this.$store.commit('addN', 10)
      // #2 对象传值
      // this.$store.commit('addN', { n: 10 })
      // #3 type对象形式传递
      /* this.$store.commit({
        type: 'addN',
        n: 10
      }) */
    }
  }
}
</script>

<style></style>
