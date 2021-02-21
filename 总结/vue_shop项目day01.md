## vue-cli-plugin-element

装这个插件的目的，是为了自动帮我们配置按需导入的功能！

装完这个插件，会自动配置 `.babel.config.js`

```js
module.exports = {
    "presets": [
        "@vue/cli-plugin-babel/preset"
        ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ]
    ]
}
```

## 能不能通过手动的方式，按需导入呢

看官网[快速上手](https://element.eleme.cn/#/zh-CN/component/quickstart)

## 配置后台环境

1\. 安装 MySQL 软件

导入并执行 mydb.sql 这个文件

2\. 运行后端代码（把接口跑起来，为了给前端使用）

```bash
npm i # 安装所有依赖包
```

修改链接数据库的用户名和密码

```bash
node app # 启动后端项目
```

3\. 在浏览器输入下面地址测试

```bash
http://127.0.0.1:8888/api/private/v1/

# 自己没有弄好，下午可以先用我的
http://192.168.88.122:8888/api/private/v1/
```

4\. 管理进程

```bash
npm i pm2 -g # 全局安装 pm2

pm2 start app.js

pm2 list # 查看被管理的进程

pm2 stop 进程名字/进程ID # 关闭进程
```

## 登录组件准备

1\. 创建登录组件 `components/Login.vue`

2\. 引入组件，并配置路由规则，`router/index.js`

3\. 指定路由出口，`App.vue`

## 使用 Form 组件

三大组件

- el-form

- el-form-item

- el-input

三大属性

- ref（el-form 组件），获取组件实例或 DOM 对象

- model（el-form 组件），双向数据绑定，收集数据

- rules（el-form 组件），用来校验表单数据的

## 使用我的代码的注意点

禁用 ESLint（语法校验）在根目录新建 `vue.config.js`

```js
module.exports = {
    lintOnSave: false
};
```

## 完成几件事情

1\. 把后端接口打通

在浏览器地址栏输入 `http://127.0.0.1:8888/api/private/v1/` 能出来下面效果

```json
{
    "data": null,
    "meta": {
        "msg": "无效token",
        "status": 400
    }
}
```

2\. 消化课堂知识，保证和我同步

3\. 预习，尤其是样式，后续不会课上多强调！