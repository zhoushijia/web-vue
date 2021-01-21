## 匿名插槽

```html
<div id="app">
    <alert-box>
        <!-- !#2 填坑 -->
        <p>有bug发生</p>
    </alert-box>
</div>
<template id="alert-box">
    <div>
        <!--!#1 挖坑-->
        <slot>默认内容</slot>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
    Vue.component('alert-box', {
        template: '#alert-box'
    });
    const vm = new Vue({
        el: '#app',
    });
</script>
```

## 具名插槽

```html
<div id="app">
    <base-layout>
        <!-- template 标签好处是不会渲染 -->
        <!-- <template slot='header'>
            <p>标题信息1</p>
        </template>
        <p>主要内容1</p>
        <template slot='footer'>
            <p>底部信息信息1</p>
        </template> -->
        <!-- v-slot:插槽的名字，只能作用于 template 标签 -->
        <!-- <template v-slot:header>
            <p>标题信息1111</p>
        </template>
        <p>主要内容1</p>
        <template v-slot:footer>
            <p>底部信息信息111</p>
        </template> -->
        <!-- v-slot: 等价于 # -->
        <!-- !#2 填坑，填到对应的坑名字里面 -->
        <template #header>
            <p>标题信息1111</p>
        </template>
        <p>主要内容1</p>
        <template #footer>
            <p>底部信息信息111</p>
        </template>
    </base-layout>
</div>
<template id="base-layout">
    <div>
        <header>
            <!-- !#1 挖坑，挖了一个带名字坑 -->
            <slot name='header'></slot>
        </header>
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name='footer'></slot>
        </footer>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 挖坑用的是 name，挖了一个带名字的坑
    // 填坑用的是 slot，slot 对应的值就是挖的坑的名字
    Vue.component('base-layout', {
        template: '#base-layout'
    });
    var vm = new Vue({
        el: '#app',
    });
</script>
```

## 作用域插槽

可以把数据暴露出去,让外部进行操作!或者说可以在组件外部对子组件的数据进行加工处理!

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<style type="text/css">
    .current {
        color: orange;
    }
</style>

<body>
    <div id="app">
        <fruit-list :list='list'>
            <!-- <template slot-scope='slotProps'>
                <strong v-if='slotProps.info.id==3' class="current">{{slotProps.info.name}}</strong>
                <span v-else>{{slotProps.info.name}}</span>
            </template> -->
            <!-- v-slot:插槽名字="自定义名字" -->
            <!-- <template v-slot:default='slotProps'>
                <strong v-if='slotProps.info.id==3' class="current">{{slotProps.info.name}}</strong>
                <span v-else>{{slotProps.info.name}}</span>
            </template> -->
            <!-- v-slot: 等价于 # -->
            <template #default='slotProps'>
                <strong v-if='slotProps.info.id==3' class="current">{{slotProps.info.name}}</strong>
                <span v-else>{{slotProps.info.name}}</span>
            </template>
        </fruit-list>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        /*
          作用域插槽
        */
        Vue.component('fruit-list', {
            props: ['list'],
            template: `
                <div>
                    <li :key='item.id' v-for='item in list'>
                        <slot :info='item'>{{item.name}}</slot>
                    </li>
                </div>
            `
        });
        const vm = new Vue({
            el: '#app',
            data: {
                list: [{
                    id: 1,
                    name: 'apple'
                }, {
                    id: 2,
                    name: 'orange'
                }, {
                    id: 3,
                    name: 'banana'
                }]
            }
        });
    </script>
</body>

</html>
```

举例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<style type="text/css">
    .current {
        color: orange;
    }
</style>

<body>
    <div id="app">
        <fruit-list :list="list">
            <!-- !#2 通过 slot-scope 接收数据 -->
            <!-- slot-scope 是固定的写法，对应的值可以任意写，例如 slotProps 是可以任意变化的 -->
            <!-- slotProps 是一个对象，里面包含的是所有传递过来数据 -->
            <!-- <template slot-scope="slotProps"> -->
            <!-- v-slot:插槽名字="任意起的名字，为了接收数据" -->
            <!-- <template v-slot:default="slotProps"> -->
            <template #default="slotProps">
                <!-- 为什么不支持？ -->
                <!-- 直接返回标签确实不支持 -->
                <!-- <span>{{slotProps.item === 'b' ? '<strong>b</strong>' : slotProps.item}}</span> -->
                <span v-html="slotProps.item === 'b' ? '<strong>b</strong>' : slotProps.item"></span>
                <!-- <span>{{slotProps.item}}</span> -->
                <span>{{slotProps.age}}</span>
            </template>
        </fruit-list>
    </div>
    <template id="fruit-list">
        <ul>
            <li v-for="item in list">
                <!--{{item}}-->
                <!-- !#1 通过属性传递数据 -->
                <slot :item="item" :age="18">{{item}}</slot>
            </li>    
        </ul>
    </template>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        /*
          需求：把 a、b、c 分别报到一个 li 里面，并且对里面的内容加工
        */
        Vue.component('fruit-list', {
            props: ['list'],
            template: '#fruit-list'
        });
        const vm = new Vue({
            el: '#app',
            data: {
                list: ['a', 'b', 'c']
            }
        });
    </script>
</body>

</html>
```

## RESTFul API

1\. 相同的请求地址，能根据请求方式的不同实现不同的效果

2\. 传参的形式不再通过 ? 号进行了，而是 '/users/888'，之前 'users?id=888'

## Promise

异步编程，如果需要依赖上一次的结果，需要回调函数，容易形成回调地狱，代码不容易维护！

Promise 本质上是一个对象，一般作为一个构造函数去使用，可以用来解决回调地狱的问题！

## Promise 最基本语法

```js
// Promise 一般作为一个构造函数去使用，意味着一般需要 new 一下
// Promise 接受一个函数
// 函数里面有两个参数，这两个参数又都是函数
// 第 1 个参数（resolve）代表成功之后需要调用的函数，第 2 个参数（reject）代表失败之后需要调用的函数
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > .5) {
            // 成功
            // 可以把成功返回的结果通过 resolve 的参数传递到外边
            resolve('成功');
        } else {
            reject('失败');
        }
    });
});

// 是 Promise 对象就有 then，then 里面有 2 个参数
// 第 1 个参数代表成功之后(resolve())会执行的函数，第 2 个参数代表失败之后(reject())会执行的函数
// 通过函数里面的参数可以分别拿到成功或失败的结果
p.then(data => {
    console.log(data);
}, err => {
    console.log(err);
});
```

## Promise 解决回调地狱

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        function queryData(url) {
            return new Promise(function (resolve, reject) {
                /* const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState != 4) return;
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // 处理正常的情况
                        resolve(xhr.responseText);
                    } else {
                        // 处理异常情况
                        reject('服务器错误');
                    }
                };
                xhr.open('get', url);
                xhr.send(null); */
                $.ajax({
                    url,
                    success(data) {
                        resolve(data);
                    },
                    error(err) {
                        reject(err);
                    }
                });
            });
        }
        // queryData() 调用的结果就是 Promise，是 Promise 就有 then
        /* queryData('http://localhost:3000/data').then(data => {
            console.log(data);
            queryData('http://localhost:3000/data1').then(data => {
                console.log(data);
                queryData('http://localhost:3000/data2').then(data => {
                    console.log(data);
                });
            });
        }); */
        queryData('http://localhost:3000/data').then(data => {
            console.log(data);
            // 这一步 return 的结果会当作外层 then 的返回值
            return queryData('http://localhost:3000/data1');
        }).then(data => {
            console.log(data);
            // 这一步 return 的结果会当作外层 then 的返回值
            return queryData('http://localhost:3000/data2');
        }).then(data => {
            console.log(data);
        });
    </script>
</body>

</html>
```

捕获错误

```js
queryData('http://localhost:3000/data').then(data => {
    console.log(data);
    // 这一步 return 的结果会当作外层 then 的返回值
    return queryData('http://localhost:3000/data1');
}).then(data => {
    console.log(data);
    // 这一步 return 的结果会当作外层 then 的返回值
    return queryData('http://localhost:3000/data2');
}).then(data => {
    console.log(data);
}).catch(err => {
    // 前面的任何错误都会直接跳到这里的 catch
    console.log(err, 233);
}).finally(() => {
    console.log('失败和成功都会走');
});
```

## 为什么 return 的不是 Promise 也能继续 then

```js
let p = new Promise((resolve, reject ) => {
    resolve('233');
});

p.then(data => {
    // 这一步 return 的结果会当作外层 then 的返回值
    return 'Hello World';
    // 上面 return 一个普通字符串,实际上来说,内部会通过下面的方式包装成一个 Promise 对象
    // return Promise.resolve('Hello World');
}).then(data => {
    console.log(data);
});

/* new Promise((resolve, reject ) => {
    resolve('233');
}).then(r => console.log(r));

// 下面写法和上面是等价的
// Promise.resolve('233') 返回的是一个成功的 Promise 对象
Promise.resolve('233').then(r => console.log(r)); */
```

## 静态方法

Promise.all

Promise.race

```js
/* Promise.all([queryData('http://localhost:3000/data'), queryData('http://localhost:3000/data1')]).then( ([r1, r2]) => {
    console.log(r1, r2)
}); */
Promise.race([queryData('http://localhost:3000/data'), queryData('http://localhost:3000/data1')]).then( (r) => {
    console.log(r)
});
```

## Promise 确实可以解决回调地狱,但是并不能简化代码

```js
/* const sum = (num1, num2) => {
    // #1
    setTimeout(() => {
        return num1 + num2;
    });
    // #2
};

console.log(sum(1, 3)); */


/* const sum = (num1, num2, callback) => {
    // #1
    setTimeout(() => {
        let n = num1 + num2;
        callback(n);
    }, 1000);
    // #2
};

sum(1, 3, function(r) {
    console.log(r);
}); */

const sum = (num1, num2) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let n = num1 + num2;
            resolve(n);
        }, 1000);
    })
};

sum(1, 3).then(r => {
    console.log(r);
});

// Async/Await
```