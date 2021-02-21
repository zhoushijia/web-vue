## 登录流程

1\. 收集数据

2\. 数据校验

3\. 点击登录按钮，数据预校验

4\. 调用登录接口

5\. 存储 TOKEN

6\. 跳转后台首页

## 晚上作业

动态生成 Home.vue 组件中的 iconsObj 对象

## 如何对点击状态进行持久化

1\. 给每一个左侧菜单绑定点击事件，点击的时候做了 2 件事情

2\. 把当前 path 保存到本地、把当前 path 保存到组件的 data（activePath） 中

3\. 在 created 里面重新获取本地保存的 path 并重新赋值给 activePath

4\. 对应关系

```js
<el-menu :default-active="activePath"/>
```