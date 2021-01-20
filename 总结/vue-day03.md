## 一个注意点

```js
const obj = {
    name: 'ifer'
};
let arr = [];

arr.push(obj);

// 这里的 obj 是和上面同一个 obj，会影响添加之后的 obj 中的数据的
obj.name = 'elser';

console.log(arr);
```

```js
const arr = ['a', 'b', 'c'];

// 返回的是 true 的时候，会把 item 添加到数组中，返回的是 false 的是，不会添加元素到数组中
// const newArr = arr.filter(item => item === 'b');
const newArr = arr.filter(item => {
    /* if(item === 'b') {
        return true;
    } */
    return item === 'b';
});

console.log(newArr);


// 当返回的结果是 true 会终止循环
let r = arr.some(item => item === 'b')
```

## 组件化

分而治之，方便维护和复用！

1\. 除了根组件，其他组件指定数据的时候，必须是一个函数，函数的返回值才是真正的数据，这样操作的目的是为了保证每一个组件的数据是独立的，不会相互影响

2\. 在 HTML 文件当中使用的时候，不建议使用单闭合标签，例如 `<button-counter/>`

3\. 必须只有一个根节点

4\. 驼峰的形式定义，使用的时候需要使用短横线

```html
<div id="app">
    <!-- #2 -->
    <!-- https://cn.vuejs.org/v2/style-guide/#%E8%87%AA%E9%97%AD%E5%90%88%E7%BB%84%E4%BB%B6%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90 -->
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>
</div>
<template id="mod1">
    <!-- #3 -->
    <div>
        <button @click="handle">点击了{{count}}次</button>
        <button @click="handle">点击了{{count}}次</button>
    </div>
</template>
<script src="js/vue.js"></script>
<script>
    // 组件名字、配置信息
    Vue.component('button-counter', {
        // #1
        data: function () {
            return {
                count: 0
            }
        },
        // template: '<button @click="handle">点击了{{count}}次</button>',
        template: '#mod1',
        methods: {
            handle: function () {
                this.count += 2;
            }
        }
    })
    const vm = new Vue({
        el: '#app',
    });
</script>
```

## 可以给组件起名字

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <button-counter></button-counter>
    </div>
    <template id="mod1">
        <div>
            <button @click="handle">点击了{{count}}次</button>
        </div>
    </template>
    <script src="js/vue.js"></script>
    <script>
        const ButtonCount = {
            // 可以给组件起名字，方便调试
            name: 'ButCom',
            data: function () {
                return {
                    count: 0
                }
            },
            template: '#mod1',
            methods: {
                handle: function () {
                    this.count += 2;
                }
            }
        };
        const vm = new Vue({
            name: 'App',
            el: '#app',
            components: {
                'button-counter': ButtonCount,
            }
        });
    </script>
</body>

</html>
```

## 组件通信

### 父传子

components 定义的时候用驼峰（短横线），使用的时候用短横线

props 传值注意点：传递的时候用短横线，接收的时候用驼峰

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <p>{{name}}</p>
        <hello-world title="尼古拉斯" :full-name="name" firstName="elser"></hello-world>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 定义组件的时候使用驼峰，使用的时候使用短横线
        // Vue.component('HelloWorld', {

        // 1. 使用的时候通过属性传递值
        // 2. 定义的时候通过 props 接收值

        // 3. 在普通的 HTML 里面，传值时候如果使用的是短横线，接收的时候要使用驼峰
        // 4. 在普通的 HTML 里面，传值时候（不区分大小写）如果使用的是驼峰，接收的时候要全小写

        // 5. 在模板里面，传值的时候区分大小写，如果说使用的是驼峰，那么接收的时候还是要使用驼峰
        Vue.component('hello-world', {
            props: ['title', 'fullName', 'firstname'],
            data() {
                return {
                    msg: 'hello world'
                }
            },
            template: `<div>{{msg}} -----{{title}}------{{fullName}}---------{{firstname}}---------<test testName="测试名字" aa-bb="aabb"></test></div>`
        });


        Vue.component('test', {
            props: ['testName', 'aaBb'],
            template: `<span>{{testName}}-----{{aaBb}}</span>`
        });
        
        const vm = new Vue({
            el: '#app',
            name: 'App',
            data: {
                name: 'ifer'
            }
        });
    </script>
</body>

</html>
```

## Props 传值的其他写法

```html
<div id="app">
    <hello-world></hello-world>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.component('hello-world', {
        // props: ['title'],
        props: {
            // 对象的 key 就代表要接收的值，接收 title 属性，要求是一个 String 类型的
            // title: String
            // title: [String, Number]
            title: {
                // type: [String, Number], // 通过 type 指定要接收的类型
                // required: true, // 要求必传
                // default: 100
                // 对象或数组默认值必须从一个函数返回
                default: () => [1, 2]
            }
        },
        template: `<div>{{title}}</div>`
    });
    const vm = new Vue({
        el: '#app',
        name: 'App',
    });
</script>
```

## No-props

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <hello-world title="尼古拉斯" name="ifer"></hello-world>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 如果说传递过来的属性没有 props 接收，会作用域组件模板的根节点

        Vue.component('hello-world', {
            inheritAttrs: false, // 禁用 props 继承，如果说传递过来的属性没有被 props 接收，又不想作用于根节点，可以通过设置 false 达到这一目的
            // props: ['title'],
            // v-bind="$attrs"，把所有的 no-props 属性作用于 span 上面
            // template: `<div><span v-bind="$attrs">{{title}}</span></div>`
            template: `<div><span v-bind:title="$attrs.title">{{title}}</span></div>`
        });
        const vm = new Vue({
            el: '#app',
            name: 'App',
        });
    </script>
</body>

</html>
```

具体的应用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <hello-world title="尼古拉斯" style="color: red; font-size: 50px;"></hello-world>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.component('hello-world', {
            props: ['title'],
            template: `<div>{{title}}</div>`
        });
        const vm = new Vue({
            el: '#app',
            name: 'App',
        });
    </script>
</body>

</html>
```

## 单向数据流

如果是简单数据类型，儿子绝对不能修改

如果是复杂数据类型，地址不能修改，里面的内容可以修改，但是建议还是通知父亲修改

## 子修改父亲的数据

儿子【定义】的模板里面通过 $emit 触发自定义事件，儿子组件【使用】的地方通过 @ 符号定义事件并指定对应的方法，在此方面里面修改父亲自己的数据

```js
// 子
Vue.component('menu-item', {
    props: ['parr'],
    template: `
        <button @click='$emit("enlarge-text")'>扩大父组件中字体大小</button>
    `
});
```

```html
<!-- 父 -->
<div :style='{fontSize: fontSize + "px"}'>{{pmsg}}</div>
<menu-item @enlarge-text='handle'></menu-item>
<script>
const vm = new Vue({
    el: '#app',
    data: {
        fontSize: 10
    },
    methods: {
        handle: function () {
            // 扩大字体大小
            this.fontSize += 5;
        },
    }
});
</script>
```

## 子向父传参

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <div :style='{fontSize: fontSize + "px"}'>{{pmsg}}</div>
        <!-- 1. 这里的 $event 代表 $emit 的第二个参数 -->
        <menu-item :parr='parr' @enlarge-text='handle($event)'></menu-item>
    </div>
    <script type="text/javascript" src="js/vue.js"></script>
    <script type="text/javascript">
        Vue.component('menu-item', {
            props: ['parr'],
            // 如果在事件触发的地方写 $event 就代表事件对象
            template: `
                <div>
                    <ul>
                        <li :key='index' v-for='(item,index) in parr'>{{item}}</li>
                    </ul>
                    <button @click='$emit("enlarge-text", {
                        num: 5,
                        e: $event
                    })'>扩大父组件中字体大小5</button>
                    <button @click='$emit("enlarge-text", {
                        num: 10,
                        e: $event
                    })'>扩大父组件中字体大小10</button>
                </div>
            `
        });
        var vm = new Vue({
            el: '#app',
            data: {
                pmsg: '父组件中内容',
                parr: ['apple', 'orange', 'banana'],
                fontSize: 10
            },
            methods: {
                handle: function (val) {
                    // 我就是想在这里拿到事件对象，改怎么办
                    this.fontSize += val.num;
                    console.log(val.e.target.innerHTML);
                }
            }
        });
    </script>
</body>

</html>
```

如果说父亲加括号了，\$event 就代表 \$emit 的第二个参数，后续第三个、第四个通通拿不到了...

如果说父亲没有加括号了，那就是一一对应的

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <div :style='{fontSize: fontSize + "px"}'>{{pmsg}}</div>
        <!-- 1. 这里的 $event 代表 $emit 的第二个参数 -->
        <menu-item :parr='parr' @enlarge-text='handle'></menu-item>
    </div>
    <script type="text/javascript" src="js/vue.js"></script>
    <script type="text/javascript">
        Vue.component('menu-item', {
            props: ['parr'],
            // 如果在事件触发的地方写 $event 就代表事件对象
            template: `
                <div>
                    <ul>
                        <li :key='index' v-for='(item,index) in parr'>{{item}}</li>
                    </ul>
                    <button @click='$emit("enlarge-text", 5, $event, 9)'>扩大父组件中字体大小5</button>
                    <button @click='$emit("enlarge-text", 10, $event, 8)'>扩大父组件中字体大小10</button>
                </div>
            `
        });
        var vm = new Vue({
            el: '#app',
            data: {
                pmsg: '父组件中内容',
                parr: ['apple', 'orange', 'banana'],
                fontSize: 10
            },
            methods: {
                handle: function (num, e, num2) {
                    // 我就是想在这里拿到事件对象，改怎么办
                    this.fontSize += num;

                    console.log(num+num2);
                }
            }
        });
    </script>
</body>

</html>
```

## 兄弟组件的通信

```js
// Step1 创建 Vue 实例，充当事件中心去使用
const hub = new Vue();

// #Ste2 A 组件，通过 hub.$emit 去触发事件并传值
hub.$emit('jerry-event', 2, 4);

mounted: function () {
    // Step3: B 组件，通过hub.$on 去监听事件，并接收值
    hub.$on('jerry-event', (val, val2) => {
        console.log(val2); // 4
        this.num += val;
    });
}
```

## 状态提升

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <a-com :num="num"></a-com>
        <b-com @change-a="changeA"></b-com>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 状态提升
        // 需要把操作的数据提升到公共的父亲里面
        // 一个组件通过 $emit 触发自定义事件，自定义事件的回调函数里面修改公共的父亲的数据
        // 父亲的数据变了，使用父亲数据的另一个组件自然就变了
        Vue.component('a-com', {
            props: ['num'],
            template: '<div>{{num}}</div>'
        });
        Vue.component('b-com', {
            template: `<div>
                <button @click="$emit('change-a', 2)">改变A组件的数据</button>    
            </div>`
        });
        const vm = new Vue({
            el: '#app',
            data: {
                num: 1
            },
            methods: {
                changeA(num) {
                    this.num += num;
                }
            },
        });
    </script>
</body>

</html>
```