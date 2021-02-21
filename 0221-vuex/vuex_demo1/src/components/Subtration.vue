<template>
  <div>
    <h3>减之后的数值:{{ count }}</h3>
    <h3>{{ countChange }}</h3>
    <button @click="sub">-1</button>
    <button @click="subN(2)">-n</button>
    <button @click="subAsync">-1 Async</button>
    <button @click="subNAsync(3)">-n Async</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['sub', 'subN']),
    ...mapActions(['subAsync', 'subNAsync'])
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['countChange'])
  }
}
</script>

<style></style>
