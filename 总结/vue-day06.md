## SPA

单页应用

## 前端路由

页面地址的变化和对应组件之间的关系，其中有一种方式是基于 Hash 的路由

localhost:3000/#news     =>    新闻组件

localhost:3000/#sport    =>   体育组件


```html
<div id="app">
    <a href="#zhuye">主页</a>
    <a href="#keji">科技</a>
    <a href="#caijing">财经</a>
    <a href="#yule">娱乐</a>
    <component :is="comName"></component>
</div>

<script>
    const zhuye = {
        template: '<h1>主页信息</h1>'
    }
    const keji = {
        template: '<h1>科技信息</h1>'
    }
    const caijing = {
        template: '<h1>财经信息</h1>'
    }
    const yule = {
        template: '<h1>娱乐信息</h1>'
    }
    const vm = new Vue({
        el: '#app',
        data: {
            comName: 'zhuye'
        },
        components: {
            zhuye,
            keji,
            caijing,
            yule
        }
    })
    window.onhashchange = function () {
        vm.comName = location.hash.slice(1);
    };
</script>
```

## Vue Router 的使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="./lib/vue_2.5.22.js"></script>
    <!-- #0 导入路由库，注意放到 Vue 的后面 -->
    <script src="./lib/vue-router_3.0.2.js"></script>
</head>

<body>
    <div id="app">
        <!-- #1 指定路由地址 -->
        <router-link to="/user">User</router-link>
        <router-link to="/register">Register</router-link>
        <!-- #2 指定路由占位符，当路由匹配时，显示组件的地方 -->
        <router-view></router-view>
    </div>

    <script>
        const User = {
            template: '<h1>User 组件</h1>'
        };
        const Register = {
            template: '<h1>Register 组件</h1>'
        };
        // #3 配置路由规则
        const router = new VueRouter({
            routes: [
                // 当 router-link 中的 to 属性值和 path 匹配的时候，会展示对应的 component 到 #2 处
                { path: '/user', component: User },
                { path: '/register', component: Register }
            ]
        });
        const vm = new Vue({
            el: '#app',
            // #4 挂载路由实例
            router
        });
    </script>
</body>

</html>
```

## 嵌套路由

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script src="./lib/vue_2.5.22.js"></script>
    <!-- #0 引入路由文件 -->
    <script src="./lib/vue-router_3.0.2.js"></script>
</head>

<body>
    <div id="app">
        <!-- #1 指定跳转路由地址 -->
        <router-link to="/user">User</router-link>
        <router-link to="/register">Register</router-link>

        <!-- #2 指定路由占位符 -->
        <router-view></router-view>
    </div>

    <script>
        const User = {
            template: '<h1>User 组件</h1>'
        }

        const Register = {
            template: `<div>
                <h1>Register 组件</h1>
                <hr/>
                <!-- 子路由链接 -->
                <router-link to="/register/tab1">tab1</router-link>
                <router-link to="/register/tab2">tab2</router-link>

                <!-- 子路由的占位符 -->
                <router-view></router-view>
            </div>`
        };

        const Tab1 = {
            template: '<h3>tab1 子组件</h3>'
        };

        const Tab2 = {
            template: '<h3>tab2 子组件</h3>'
        };

        // #3 创建路由实例并配置规则
        const router = new VueRouter({
            routes: [
                { path: '/', redirect: '/user' },
                { path: '/user', component: User },
                {
                    path: '/register',
                    component: Register,
                    // 路由重定向
                    redirect: '/register/tab1',
                    children: [
                        // { path: '/register/tab1', component: Tab1 },
                        // { path: '/register/tab2', component: Tab2 }
                        // 这样写和上面等价，注意不要以 / 开头了
                        { path: 'tab1', component: Tab1 },
                        { path: 'tab2', component: Tab2 }
                    ]
                }
            ]
        });

        // #4 挂载路由
        const vm = new Vue({
            el: '#app',
            data: {},
            router
        });
    </script>
</body>

</html>
```

## 动态路由匹配以及传参

## 命名路由的跳转及传参

```html
<router-link :to="{ name: 'user', params: {id: 4} }">User3</router-link>
```

```js
const router = new VueRouter({
    routes: [
        {
            name: 'user',
            path: '/user/:id',
            component: User,
            props: route => ({ uname: 'zs', age: 20, id: route.params.id })
        },
    ]
})
```

## 编程式导航以及传参

```js
methods: {
    goRegister() {
        // 这种方式传参，通过 $route.query.name 接收
        // this.$router.push('/register?name=ifer');

        // 下面写法和上面功能一样
        // this.$router.push({
        //     path: '/register',
        //     query: {
        //         name: 'ifer'
        //     }
        // });

        // name 配合 query 也可以做跳转并传参，通过 $route.query.name 接收
        // this.$router.push({
        //     name: 'register',
        //     query: {
        //         name: 'ifer'
        //     }
        // });
        
        // name 跳转配合 params 传参，通过 $route.params.name 接收
        // this.$router.push({
        //     name: 'register',
        //     params: {
        //         name: 'ifer'
        //     }
        // });
    }
}
```

## 获取路由信息的坑

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <!-- 入口 -->
        <router-link to="/user/ifer">ifer</router-link>
        <router-link to="/user/elser">elser</router-link>

        <!-- 出口 -->
        <router-view></router-view>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue-router@3.4.3/dist/vue-router.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js"></script>
    <script>
        const router = new VueRouter({
            routes: [
                {
                    path: '/user/:username',
                    component: {
                        template: '<div>{{$route.params.username}}</div>',
                        created() {
                            // 如果上面模板种的数据有变化，是会重新编译的
                            // 这个组件只会创建一次，即便路由当中的参数变化了，这里也不能实时获取到最新的
                            console.log(this.$route.params.username);
                        },
                        watch: {
                            $route(to, from) {
                                // to   => 到哪里去的路由对象
                                // from => 从哪里过来的路由对象
                                console.log(to.params.username);
                            }
                        }
                    }
                }
            ]
        })
        const vm = new Vue({
            el: '#app',
            name: 'App',
            router
        });
    </script>
</body>

</html>
```