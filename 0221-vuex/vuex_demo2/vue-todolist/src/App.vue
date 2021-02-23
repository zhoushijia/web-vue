<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputVal"
      @change="handler"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <!-- #1 -->
    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <!-- TODO: 这里的 e => { cbStatusChange(e, item.id) } 是为了拿到事件对象; e 是形参 而cbStatusChange(e, item.id)中的e是实参 -->
        <a-checkbox
          :checked="item.done"
          @change="
            e => {
              cbStatusChange(e, item.id)
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- #6 未完成的任务个数 -->
        <span>{{ unDoneLength }}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <!-- #7 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['setInputVal']),
    // #2 收集数据
    handler(e) {
      // this.$store.commit('setInputVal', e.target.value)
      // 或者
      this.setInputVal(e.target.value)
    },
    // #3 添加数据
    addItem() {
      if (this.inputVal.trim().length <= 0) {
        this.$message.warning('请输入数据')
        return
      }
      this.$store.commit('addItem')
    },
    // #4 删除数据
    removeItemById(id) {
      this.$store.commit('removeItem', id)
    },
    // #5 修改状态
    cbStatusChange(e, id) {
      const payload = {
        id,
        status: e.target.checked
      }
      this.$store.commit('statusChange', payload)
    },
    // #7 清除已完成
    clean() {
      this.$store.commit('cleanDone')
    }
  },
  computed: {
    ...mapState(['list', 'inputVal']),
    ...mapGetters(['unDoneLength'])
  },
  created() {
    // 触发 vuex 发请求 获取后端数据
    this.$store.dispatch('getListAsync')
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
