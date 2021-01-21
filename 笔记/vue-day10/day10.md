## 今日目标

1.完成商品分类

2.完成参数管理

## 1.商品分类

### A.新建分支 goods_cate

新建分支 goods_cate 并推送到码云
git checkout -b goods_cate
git push -u origin goods_cate

### B.创建子级路由

创建 categories 子级路由组件并设置路由规则

```js
import Cate from './components/goods/Cate.vue';

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/categories',
        component: Cate,
      },
    ],
  },
];
```

### C.添加组件基本布局

在 Cate.vue 组件中添加面包屑导航以及卡片视图中的添加分类按钮

```html
<template>
  <div>
    <h3>商品分类</h3>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 添加分类按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 分类表格  -->

      <!-- 分页 -->
    </el-card>
  </div>
</template>
```

### D.请求分类数据

请求分类数据并将数据保存在 data 中

```js
<script>
export default {
  data() {
    return {
      // 商品分类数据列表
      cateList: [],
      //查询分类数据的条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      //保存总数据条数
      total: 0
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      //获取商品分类数据
      const { data: res } = await this.$http.get('categories', {
        params: queryInfo
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表数据失败')
      }
      //将数据列表赋值给cateList
      this.cateList = res.data.result
      //保存总数据条数
      this.total = res.data.total
      //   console.log(res.data);
    }
  }
}
</script>
```

### E.使用插件展示数据

使用第三方插件 `vue-table-with-tree-grid` 展示分类数据

1).在 vue 控制台中点击依赖->安装依赖->运行依赖->输入 vue-table-with-tree-gird->点击安装

2).打开 main.js，导入

```js
import TreeTable from 'vue-table-with-tree-grid';
//全局注册组件
Vue.component('tree-table', TreeTable);
```

3).使用组件展示分类数据

```html
<!-- 分类表格
:data(设置数据源) :columns(设置表格中列配置信息) :selection-type(是否有复选框)
:expand-type(是否展开数据) show-index(是否设置索引列) index-text(设置索引列头)
border(是否添加纵向边框) :show-row-hover(是否鼠标悬停高亮) -->
<tree-table
  :data="cateList"
  :columns="columns"
  :selection-type="false"
  :expand-type="false"
  show-index
  index-text="#"
  border
  :show-row-hover="false"
>
</tree-table>

<script>
  data() {
    return {
      columns: [ {label:'分类名称',prop:'cat_name'} ]
    };
  }
</script>
```

### F.自定义数据列

使用 vue-table-with-tree-grid 定义模板列并添加自定义列

```js
// 为 table 指定列的定义
columns: [
  {
    label: '分类名称',
    prop: 'cat_name',
  },
  {
    label: '是否有效',
    // 将当前列定义为模板列
    type: 'template',
    // 当前列使用的模板名称
    template: 'isok',
  },
  {
    label: '排序',
    type: 'template',
    template: 'order',
  },
  {
    label: '操作',
    type: 'template',
    template: 'opt',
  },
];
```

```html
<!-- 表格区域 -->
<tree-table
  :data="catelist"
  :columns="columns"
  :selection-type="false"
  show-index
  index-text="#"
  border
  :show-row-hover="false"
>
  <!-- 是否有效 -->
  <template slot="isok" slot-scope="scope">
    <i
      class="el-icon-success"
      v-if="scope.row.cat_deleted === false"
      style="color: lightgreen;"
    ></i>
    <i class="el-icon-error" v-else style="color: red;"></i>
  </template>
  <!-- 排序 -->
  <template slot="order" slot-scope="scope">
    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
    <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1"
      >二级</el-tag
    >
    <el-tag type="warning" size="mini" v-else>三级</el-tag>
  </template>
  <!-- 操作 -->
  <template slot="opt">
    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
  </template>
</tree-table>
```

### G.完成分页功能

```html
<!-- 分页 -->
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="queryInfo.pagenum"
  :page-sizes="[3, 5, 10, 15]"
  :page-size="queryInfo.pagesize"
  layout="total, sizes, prev, pager, next, jumper"
  :total="total"
></el-pagination>

<script>
  methods: {
    // 监听 pagesize 变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听 pagenum 变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    }
  }
</script>
```

### H.完成添加分类

```html
<!-- 添加分类的对话框 -->
<el-dialog
  title="添加分类"
  :visible.sync="addCateDialogVisible"
  width="50%"
  @close="addCateDialogClosed"
>
  <!-- 添加分类表单 -->
  <el-form
    :model="addCateForm"
    :rules="addCateFormRules"
    ref="addCateFormRef"
    label-width="100px"
  >
    <el-form-item label="分类名称：" prop="cat_name">
      <el-input v-model="addCateForm.cat_name"></el-input>
    </el-form-item>
    <el-form-item label="父级分类：">
      <!-- options: 指定数据源 -->
      <!-- props: 用来指定配置对象 -->
      <!-- change-on-select: 允许选择一级分类 -->
      <el-cascader
        expand-trigger="hover"
        :options="parentCateList"
        :props="cascaderProps"
        v-model="selectedKeys"
        @change="parentCateChanged"
        clearable
        change-on-select
      ></el-cascader>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
  </span>
</el-dialog>
```

```js
methods: {
  // 获取商品分类数据
  async getCateList() {
    const { data: res } = await this.$http.get('categories', {
      params: this.queryInfo
    })
    if (res.meta.status !== 200) {
      return this.$message.error('获取商品分类失败')
    }
    // 把数据列表赋值给 catelist
    this.catelist = res.data.result
    // 为总数据条数赋值
    this.total = res.data.total
  },
  // 监听 pagesize 变化
  handleSizeChange(newSize) {
    this.queryInfo.pagesize = newSize
    this.getCateList()
  },
  // 监听 pagenum 变化
  handleCurrentChange(newPage) {
    this.queryInfo.pagenum = newPage
    this.getCateList()
  },
  showAddCateDialog() {
    // 获取父级分类的数据
    this.getParentCateList()
    this.addCateDialogVisible = true
  },
  // 获取父级分类的列表
  async getParentCateList() {
    const { data: res } = await this.$http.get('categories', {
      params: {
        type: 2 // 获取前两级的所有分类
      }
    })
    if (res.meta.status !== 200) {
      return this.$message.error('获取父级分类数据失败')
    }
    // 存一下
    this.parentCateList = res.data
  },
  // 选择项发生变化会触发的函数
  parentCateChanged() {
    // 如果 selectedKeys 数组的 length 大于 0，证明选中了父级分类
    if (this.selectedKeys.length > 0) {
      // 父级分类的 ID
      this.addCateForm.cat_pid = this.selectedKeys[
        this.selectedKeys.length - 1
      ]
      // 为当前分类的等级赋值
      this.addCateForm.cat_level = this.selectedKeys.length
    } else {
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    }
  },
  // 点击按钮添加新的分类
  addCate() {
    // console.log(this.addCateForm)
    this.$refs.addCateFormRef.validate(async valid => {
      if (!valid) return false
      const { data: res } = await this.$http.post(
        'categories',
        this.addCateForm
      )
      if (res.meta.status !== 201) {
        return this.$message.error('添加分类失败')
      }
      this.$message.success('添加分类成功')
      this.getCateList()
      this.addCateDialogVisible = false
    })
    // this.addCateDialogVisible = false
  },
  // 监听对话框的关闭事件，重置表单数据
  addCateDialogClosed() {
    this.$refs.addCateFormRef.resetFields()
    // 选择到的父分类 ID
    this.selectedKeys = []
    // 准备提交到后台的分类等级和分类 ID
    this.addCateForm.cat_level = 0
    this.addCateForm.cat_pid = 0
  }
}
```

### I.推送代码

制作完添加分类之后，将代码提交到仓库，推送到码云,将 goods_cate 分支合并到 master
git add .
git commit -m '完成商品分类'
git push
git checkout master
git merge goods_cate

## 2.参数管理

只允许给三级分类内容设置参数，参数分为动态参数和静态参数属性

### A.添加子级组件

添加 Params.vue 子组件，并在 router.js 中引入该组件并设置路由规则

```js
import Params from './components/goods/Params.vue';
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/Home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/params',
        component: Params,
      },
    ],
  },
];
```

### B.完成组件基本布局

完成 Params.vue 组件的基本布局，其中警告提示信息使用了 el-alert，在 element.js 引入该组件并注册

```html
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        :closable="false"
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
      ></el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="catelist"
            :props="cateProps"
            v-model="selectedCateKeys"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
```

### C.完成级联选择框

完成商品分类级联选择框

```js
<script>
export default {
  data() {
    return {
      catelist: [],
      // 级联选择框的配置对象
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 级联选择框双向绑定到的数组
      selectedCateKeys: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      // 获取商品分类成功
      this.catelist = res.data
    },
    // 级联选择框选中项变化会触发
    handleChange() {
      if (this.selectedCateKeys.length !== 3) {
        // 证明选中的不是 3 级分类
        this.selectedCateKeys = []
        return false
      }
      // 选中的是 3 级分类
      console.log(this.selectedCateKeys)
    }
  }
}
</script>
```

### D.展示参数

展示动态参数数据以及静态属性数据

```html
<!-- tab 标签 -->
<el-tabs v-model="activeName" @tab-click="handleTabClick">
  <!-- 添加动态参数面板 -->
  <el-tab-pane label="动态参数" name="many">
    <el-button type="primary" size="mini" :disabled="isBtnDisabled"
      >添加参数</el-button
    >
    <!-- 动态参数表格 -->
    <el-table :data="manyTableData" border stripe>
      <!-- 展开行的操作 -->
      <el-table-column type="expand"></el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="参数名称" prop="attr_name"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="primary" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
  <!-- 添加静态属性面板 -->
  <el-tab-pane label="静态属性" name="only">
    <el-button type="primary" size="mini" :disabled="isBtnDisabled"
      >添加属性</el-button
    >
    <!-- 静态属性表格 -->
    <el-table :data="onlyTableData" border stripe>
      <!-- 展开行的操作 -->
      <el-table-column type="expand"></el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index"></el-table-column>
      <el-table-column label="属性名称" prop="attr_name"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" type="primary" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-tab-pane>
</el-tabs>
<script>
  export default {
    data() {
      return {
        catelist: [],
        // 级联选择框的配置对象
        cateProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children',
        },
        // 级联选择框双向绑定到的数组
        selectedCateKeys: [],
        // 被激活的页签的名称
        activeName: 'many',
        // 动态参数的数据
        manyTableData: [],
        // 静态属性的数据
        onlyTableData: [],
      };
    },
    created() {
      this.getCateList();
    },
    methods: {
      async getCateList() {
        const { data: res } = await this.$http.get('categories');
        if (res.meta.status !== 200) {
          return this.$message.error('获取商品分类失败');
        }
        // 获取商品分类成功
        this.catelist = res.data;
      },
      // 级联选择框选中项变化会触发
      handleChange() {
        this.getParamsData();
      },
      // Tab 页签点击时触发
      handleTabClick() {
        this.getParamsData();
      },
      // 获取参数的列表数据
      async getParamsData() {
        if (this.selectedCateKeys.length !== 3) {
          // 证明选中的不是 3 级分类
          this.selectedCateKeys = [];
          return false;
        }
        // 确定了选中的是 3 级分类。根据所选分类的 ID，和当前所处的面板，获取对应的参数
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          {
            params: {
              sel: this.activeName,
            },
          }
        );
        if (res.meta.status !== 200) {
          return this.$message.error('获取参数列表失败');
        }
        if (this.activeName === 'many') {
          this.manyTableData = res.data;
        } else {
          this.onlyTableData = res.data;
        }
      },
    },
    computed: {
      // 如果按钮需要被禁用，则返回 true，否则返回 false
      isBtnDisabled() {
        if (this.selectedCateKeys.length !== 3) {
          return true;
        } else {
          return false;
        }
      },
      // 当前选中的 3 级分类的 ID
      cateId() {
        if (this.selectedCateKeys.length === 3) {
          return this.selectedCateKeys[2];
        }
        return null;
      },
    },
  };
</script>
```

### E.添加参数

完成添加参数或属性

```html
<!-- 添加动态参数/静态属性对话框 -->
<el-dialog
  :title="'添加' + titleText"
  :visible.sync="addDialogVisible"
  width="50%"
  @close="addDialogClosed"
>
  <!-- 添加参数的对话框 -->
  <el-form
    :model="addForm"
    :rules="addFormRules"
    ref="addFormRef"
    label-width="100px"
  >
    <el-form-item :label="titleText" prop="attr_name">
      <el-input v-model="addForm.attr_name"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addParams">确 定</el-button>
  </span>
</el-dialog>

<script>
  addParams() {
    this.$refs.addFormRef.validate(async valid => {
      if (!valid) return false
      const { data: res } = await this.$http.post(`categories/${this.cateId}/attributes`, {
        attr_name: this.addForm.attr_name,
        attr_sel: this.activeName
      })
      if (res.meta.status !== 201) {
        return this.$message.error('添加参数失败')
      }
      this.$message.success('添加参数成功')
      this.addDialogVisible = false
      this.getParamsData()
    })
  }
</script>
```

### F.编辑参数

完成编辑参数或属性

```html
<!-- 修改参数对话框 -->
<el-dialog
  :title="'修改' + titleText"
  :visible.sync="editDialogVisible"
  width="50%"
  @close="editDialogClosed"
>
  <el-form
    :model="editForm"
    :rules="editFormRules"
    ref="editFormRef"
    label-width="100px"
  >
    <el-form-item :label="titleText" prop="attr_name">
      <el-input v-model="editForm.attr_name"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editParams">确 定</el-button>
  </span>
</el-dialog>

<script>
  // 点击按钮，修改参数信息
  editParams() {
    this.$refs.editFormRef.validate(async valid => {
      if (!valid) return false
      const { data: res } = await this.$http.put(
        `categories/${this.cateId}/attributes/${this.editForm.attr_id}`,
        {
          attr_name: this.editForm.attr_name,
          attr_sel: this.activeName
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('修改参数失败')
      }
      this.$message.success('修改参数成功')
      this.getParamsData()
      this.editDialogVisible = false
    })
  }
</script>
```

### G.删除参数

删除参数或属性

```html
<el-button
  size="mini"
  type="danger"
  icon="el-icon-delete"
  @click="removeParams(scope.row.attr_id)"
  >删除</el-button
>
<el-button
  size="mini"
  type="danger"
  icon="el-icon-delete"
  @click="removeParams(scope.row.attr_id)"
  >删除</el-button
>

<script>
// 根据 ID 删除对应的参数项
async removeParams(attrId) {
  const confirmResult = await this.$confirm(
    '此操作将永久删除该参数, 是否继续?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).catch(err => err)
  if (confirmResult !== 'confirm') {
    return this.$message.info('已取消删除')
  }
  const { data: res } = await this.$http.delete(
    `categories/${this.cateId}/attributes/${attrId}`
  )
  if (res.meta.status !== 200) {
    return this.$message.error('删除参数失败')
  }
  this.$message.success('删除参数成功')
  this.getParamsData()
}
</script>
```
