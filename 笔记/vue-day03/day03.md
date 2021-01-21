## day03

### 组件

- 组件 (Component) 是 Vue.js 最强大的功能之一

- 组件可以扩展 HTML 元素，封装可重用的代码

### 组件注册

#### 全局注册

- Vue.component('组件名称', { })，第 1 个参数是标签名称，第 2 个参数是一个选项对象

- **全局组件**注册后，任何**vue实例**都可以用

#### 组件基础用

```html
<div id="app">
    <!-- 2、组件使用组件名称是以 HTML 标签的形式使用 -->
    <my-component></my-component>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 1、my-component 就是组件中自定义的标签名
    Vue.component('my-component', {
        template: '<div>hello world</div>'
    });
    const vm = new Vue({
        el: '#app',
    });
</script>
```

#### 组件注意事项

- 组件参数的 data 值必须是函数同时这个函数要求返回一个对象

- 组件模板必须是单个根元素

- 组件模板的内容可以是模板字符串

```html
<div id="app">
    <!-- 
        4、组件可以重复使用多次，因为 data 中返回的是一个新对象所以每个组件中的数据是私有的
    -->
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>
    <!-- 8、必须使用短横线的方式使用组件 -->
    <hello-world></hello-world>
</div>
<template id="test">
    <div>
        <button @click="handle">点击了{{count}}次</button>
        <button>测试123</button>
        <hello-world></hello-world>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 5、如果使用驼峰式命名组件，那么在使用组件的时候，只能在字符串模板中用驼峰的方式使用组件，
    // 7、但是在普通的标签模板中，必须使用短横线的方式使用组件
    Vue.component('HelloWorld', {
        data: function () {
            return {
                msg: 'HelloWorld'
            }
        },
        template: '<div>{{msg}}</div>'
    });
    Vue.component('button-counter', {
        // 1、组件参数的 data 值必须是函数，同时这个函数要求返回一个对象  
        data: function () {
            return {
                count: 0
            }
        },
        // 2、组件模板必须是单个根元素
        // 3、组件模板的内容可以是模板字符串  
        // 6、在字符串模板中可以使用驼峰的方式使用组件	
        /* template: `
            <div>
                <button @click="handle">点击了{{count}}次</button>
                <button>测试123</button>
                <HelloWorld></HelloWorld>
            </div>
        `, */
        template: '#test',
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

#### 局部注册

- 只能在当前注册它的 vue 实例中使用

```html
<div id="app">
    <my-component></my-component>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 定义组件的模板
    var Child = {
        template: '<div>A custom component!</div>'
    }
    new Vue({
        el: '#app',
        // 局部注册组件  
        components: {
            // <my-component> 将在父模板可用定
            'my-component': Child
        }
    });
</script>
```

### Vue 调试工具

### Vue组件之间传值

#### 父组件向子组件传值

- 父组件发送的形式是以属性的形式绑定值到子组件身上

- 然后子组件用属性 props 接收

- 在 props 中使用驼峰形式，模板中需要使用短横线的形式使用，字符串形式的模板中没有这个限制

```html
<div id="app">
    <div>{{pmsg}}</div>
    <!-- 1、menu-item 在 APP 中嵌套着 -->
    <!-- 给子组件传入一个静态的值 -->
    <menu-item title='来自父组件的值'></menu-item>
    <!-- 2、传递动态数据，传的值可以是数字、对象、数组等等 -->
    <menu-item :title='ptitle' content='hello'></menu-item>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.component('menu-item', {
        // 3、子组件用属性 props 接收父组件传递过来的数据  
        props: ['title', 'content'],
        data: function () {
            return {
                msg: '子组件本身的数据'
            }
        },
        template: `<div>{{msg + "~~~" + title + "~~~" + content}}</div>`
    });
    var vm = new Vue({
        el: '#app',
        data: {
            pmsg: '父组件中内容',
            ptitle: '动态绑定属性'
        }
    });
</script>
```

#### 子组件向父组件传值

- 子组件用 `$emit()` 触发事件

- `$emit()` 第一个参数为自定义的事件名称，第二个参数为需要传递的数据

- 父组件用 v-on 监听子组件的事件

```html
<div id="app">
    <div :style='{fontSize: fontSize + "px"}'>{{pmsg}}</div>
    <menu-item :parr='parr' @enlarge-text='handle'></menu-item>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.component('menu-item', {
        props: ['parr'],
        template: `
            <div>
                <ul>
                    <li :key='index' v-for='(item,index) in parr'>{{item}}</li>
                </ul>
                <p>1、子组件用 $emit() 触发事件</p>
                <p>第一个参数为 自定义的事件名称，第二个参数为需要传递的数据</p>
                <button @click='$emit("enlarge-text", 5, $event)'>扩大父组件中字体大小</button>
                <button @click='$emit("enlarge-text", 10, $event)'>扩大父组件中字体大小</button>
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
            handle: function (val, e) {
                console.log(e);
                this.fontSize += val;
            }
        }
    });
</script>
```

#### 兄弟之间的传递

- 兄弟之间传递数据需要借助于事件中心，通过事件中心传递数据

- 传递数据方，通过一个事件触发 hub.$emit(方法名，传递的数据)

- 接收数据方，通过 mounted(){} 钩子中  触发 hub.$on() 方法名

- 销毁事件 通过 hub.$off() 方法名销毁之后无法进行传递数据

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <div>父组件</div>
        <div>
            <button @click='handle'>销毁事件</button>
        </div>
        <test-tom></test-tom>
        <test-jerry></test-jerry>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 1、提供事件中心
        var hub = new Vue();

        Vue.component('test-tom', {
            data: function () {
                return {
                    num: 0
                }
            },
            template: `
                <div>
                    <div>TOM:{{num}}</div>
                    <div>
                        <button @click='handle'>点击</button>
                    </div>
                </div>
            `,
            methods: {
                handle: function () {
                    // 2.1、传递数据方，通过一个事件触发 hub.$emit(方法名，传递的数据)触发兄弟组件的事件
                    hub.$emit('jerry-event', 2);
                }
            },
            mounted: function () {
                // 3.2、接收数据方，通过 mounted(){} 钩子中触发 hub.$on
                hub.$on('tom-event', (val) => {
                    this.num += val;
                });
            }
        });
        Vue.component('test-jerry', {
            data: function () {
                return {
                    num: 0
                }
            },
            template: `
                <div>
                    <div>JERRY:{{num}}</div>
                    <div>
                        <button @click='handle'>点击</button>
                    </div>
                </div>
            `,
            methods: {
                handle: function () {
                    // 3.1、传递数据方，通过一个事件触发 hub.$emit(方法名，传递的数据)触发兄弟组件的事件
                    hub.$emit('tom-event', 1);
                }
            },
            mounted: function () {
                // 2.2、接收数据方，通过 mounted(){} 钩子中触发 hub.$on() 方法名
                hub.$on('jerry-event', (val) => {
                    this.num += val;
                });
            }
        });
        const vm = new Vue({
            el: '#app',
            methods: {
                handle: function () {
                    // 4、销毁事件通过 hub.$off() 方法名销毁之后无法进行传递数据  
                    hub.$off('tom-event');
                    hub.$off('jerry-event');
                }
            }
        });
    </script>
</body>

</html>
```

### 组件插槽

- 组件的最大特性就是复用性，而用好插槽能大大提高组件的可复用能力

#### 匿名插槽

“插槽就是挖坑、填坑的操作”

```html
<div id="app">
    <!-- 这里的所有组件标签中嵌套的内容会替换掉 slot，如果不传值则使用 slot 中的默认值  -->
    <alert-box>有bug发生</alert-box>
    <alert-box>有一个警告</alert-box>
    <alert-box></alert-box>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 组件插槽：父组件向子组件传递内容 */
    Vue.component('alert-box', {
        // 当组件渲染的时候，这个 <slot> 元素将会被替换为“组件标签中嵌套的内容”
        template: `
            <div>
                <strong>ERROR:</strong>
                <slot>默认内容</slot>
            </div>
        `
    });
    const vm = new Vue({
        el: '#app',
    });
</script>
```

#### 具名插槽

- 具有名字的插槽

- 使用 <slot> 中的 "name" 属性绑定元素

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <base-layout>
            <!-- 2、 通过 slot 属性来指定, 这个 slot 的值必须和下面 slot 组件的 name 值对应上，如果没有匹配到 则放到匿名的插槽中   -->
            <p slot='header'>标题信息</p>
            <p>主要内容1</p>
            <p>主要内容2</p>
            <p slot='footer'>底部信息信息</p>
        </base-layout>

        <base-layout>
            <!-- 注意点：template临时的包裹标签最终不会渲染到页面上     -->
            <!-- <template slot='header'> -->
            <template v-slot:header>
                <p>标题信息1</p>
                <p>标题信息2</p>
            </template>
            <p>主要内容1</p>
            <p>主要内容2</p>
            <template slot='footer'>
                <p>底部信息信息1</p>
                <p>底部信息信息2</p>
            </template>
        </base-layout>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 1、使用 <slot> 中的 "name" 属性绑定元素 指定当前插槽的名字
        Vue.component('base-layout', {
            template: `
                <div>
                    <header>
                        <slot name='header'></slot>
                    </header>
                    <main>
                        <slot></slot>
                    </main>
                    <footer>
                        <slot name='footer'></slot>
                    </footer>
                </div>
            `
        });
        const vm = new Vue({
            el: '#app',
        });
    </script>
</body>

</html>
```

#### 作用域插槽

- 父组件对子组件加工处理

- 既可以复用子组件的 slot，又可以使 slot 内容不一致

```html
<div id="app">
    <!-- 1、希望 li 的样式由外部使用组件的地方定义，因为可能有多种地方要使用该组件 -->
    <fruit-list :list='list'>
        <!-- 2、父组件中使用了 <template> 元素，而且包含 scope="slotProps", slotProps 在这里只是临时变量 --->
        <template slot-scope='slotProps'>
            <strong v-if='slotProps.info.id==3' class="current">{{slotProps.info.name}}</strong>
            <span v-else>{{slotProps.info.name}}</span>
        </template>
    </fruit-list>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.component('fruit-list', {
        props: ['list'],
        // 3、在子组件模板中，<slot> 元素上有一个类似 props 传递数据的过程，插槽可以提供一个默认内容，如果如果父组件没有为这个插槽提供了内容，会显示默认的内容
        template: `
            <ul>
                <li :key='item.id' v-for='item in list'>
                    <slot :info='item'>{{item.name}}</slot>
                </li>
            </ul>
        `
    });
    var vm = new Vue({
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
```

### 购物车案例

#### 1、实现组件化布局

- 把静态页面转换成组件化模式并渲染到页面上

````html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">

<body>
    <div id="app">
        <div class="container">
            <my-cart></my-cart>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 标题
        const CartTitle = {
            template: `
            <div class="title">我的商品</div>
            `
        };
        // 列表
        const CartList = {
            template: `
            <div>
                <div class="item">
                    <img src="img/a.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/b.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/c.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/d.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/e.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
            </div>
            `
        };
        // 总计
        const CartTotal = {
            template: `
            <div class="total">
                <span>总价：123</span>
                <button>结算</button>
            </div>
            `
        };
        // 外层组件
        Vue.component('my-cart', {
            template: `
            <div class="cart">
                <cart-title></cart-title>
                <cart-list></cart-list>
                <cart-total></cart-total>
            </div>
            `,
            components: {
                'cart-title': CartTitle,
                'cart-list': CartList,
                'cart-total': CartTotal
            }
        });
        const vm = new Vue({
            el: '#app',
            data: {

            },
            methods: {

            },
            computed: {

            },
            // 局部组件
            components: {

            }
        });
    </script>
</body>

</html>
````

#### 2、实现标题和结算功能组件

- 标题组件实现动态渲染

    - 从父组件把标题数据传递过来 即 父向子组件传值

    - 把传递过来的数据渲染到页面上  

- 结算功能组件

    - 从父组件把商品列表list 数据传递过来 即 父向子组件传值

    - 把传递过来的数据计算最终价格渲染到页面上

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">

<body>
    <div id="app">
        <div class="container">
            <my-cart></my-cart>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 标题
        const CartTitle = {
            props: ['uname'],
            template: `
                <div class="title">{{uname}}的商品</div>
            `
        };
        // 列表
        const CartList = {
            template: `
            <div>
                <div class="item">
                    <img src="img/a.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/b.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/c.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/d.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
                <div class="item">
                    <img src="img/e.jpg"/>
                    <div class="name"></div>
                    <div class="change">
                        <a href="">－</a>
                        <input type="text" class="num" />
                        <a href="">＋</a>
                    </div>
                    <div class="del">×</div>
                </div>
            </div>
            `
        };
        // 总计
        const CartTotal = {
            props: ['list'],
            template: `
            <div class="total">
                <span>总价：{{total}}</span>
                <button>结算</button>
            </div>
            `,
            computed: {
                total: function () {
                    let t = 0;
                    this.list.forEach(item => {
                        t += item.price * item.num;
                    });
                    return t;
                }
            },
        };
        // 外层组件
        Vue.component('my-cart', {
            template: `
                <div class="cart">
                    <cart-title :uname="uname"></cart-title>
                    <cart-list></cart-list>
                    <cart-total :list="list"></cart-total>
                </div>
            `,
            components: {
                'cart-title': CartTitle,
                'cart-list': CartList,
                'cart-total': CartTotal
            },
            data() {
                return {
                    uname: '张三',
                    list: [{
                        id: 1,
                        name: 'TCL彩电',
                        price: 1000,
                        num: 1,
                        img: 'img/a.jpg'
                    }, {
                        id: 2,
                        name: '机顶盒',
                        price: 1000,
                        num: 1,
                        img: 'img/b.jpg'
                    }, {
                        id: 3,
                        name: '海尔冰箱',
                        price: 1000,
                        num: 1,
                        img: 'img/c.jpg'
                    }, {
                        id: 4,
                        name: '小米手机',
                        price: 1000,
                        num: 1,
                        img: 'img/d.jpg'
                    }, {
                        id: 5,
                        name: 'PPTV电视',
                        price: 1000,
                        num: 2,
                        img: 'img/e.jpg'
                    }]
                };
            }
        });
        const vm = new Vue({
            el: '#app'
        });
    </script>
</body>

</html>
```

#### 3、实现列表组件删除功能

- 从父组件把商品列表 list 数据传递过来 即父向子组件传值，把传递过来的数据渲染到页面上    

```html
const CartList = {
    props: ['list'],
    template: `
    <div>
        <div class="item" v-for="item in list" :key="item.id">
            <img :src="item.img"/>
            <div class="name">{{item.name}}</div>
            <div class="change">
                <a href="">－</a>
                <input type="text" class="num" />
                <a href="">＋</a>
            </div>
            <div class="del">×</div>
        </div>
    </div>
    `
};
```

- 点击删除按钮的时候删除对应的数据，给按钮添加点击事件把需要删除的id传递过来  

```javascript
// 子组件中不推荐操作父组件的数据有可能多个子组件使用父组件的数据
methods: {
    del: function (id) {
        this.$emit('cart-del', id);
    }
},
```

```javascript
// 父组件删除对应的数据
methods: {
    delCart(id) {
        // 根据 id 找到索引
        let idx = this.list.findIndex(item => item.id == id);
        // 根据索引删除数组中的数据
        this.list.splice(idx, 1);
    }
}
```

#### 4、实现组件更新数据功能-上

- 将输入框中的默认数据动态渲染出来

- 输入框失去焦点的时候 更改商品的数量 

- 子组件中不推荐操作数据 把这些数据传递给父组件，通知让父组件处理这些数据

```javascript
methods: {
    changeNum: function (id, e) {
        this.$emit('change-num', {
            id,
            num: e.target.value
        });
    }
},
```

- 父组件中接收子组件传递过来的数据并处理 

```javascript
changeNum(data) {
    // 根据子组件传递过来的数据进行更新
    this.list.some(item => {
        if (item.id == data.id) {
            item.num = data.num;
            return true;
        }
    });
}
```

#### 5、实现组件更新数据功能-下

- 子组件通过一个标识符来标记对用的用户点击  + - 或者输入框输入的内容

- 父组件拿到标识符更新对应的组件

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="index.css">

<body>
    <div id="app">
        <div class="container">
            <my-cart></my-cart>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 标题
        const CartTitle = {
            props: ['uname'],
            template: `
                <div class="title">{{uname}}的商品</div>
            `
        };
        // 列表
        const CartList = {
            props: ['list'],
            template: `
            <div>
                <div class="item" v-for="item in list" :key="item.id">
                    <img :src="item.img"/>
                    <div class="name">{{item.name}}</div>
                    <div class="change">
                        <a href="" @click.prevent="sub(item.id)">－</a>
                        <input type="text" class="num" :value="item.num" @blur="changeNum(item.id, $event)" />
                        <a href="" @click.prevent="add(item.id)">＋</a>
                    </div>
                    <div class="del" @click="del(item.id)">×</div>
                </div>
            </div>
            `,
            methods: {
                del: function (id) {
                    this.$emit('cart-del', id);
                },
                changeNum: function (id, e) {
                    this.$emit('change-num', {
                        id,
                        num: e.target.value,
                        type: 'change'
                    });
                },
                sub: function (id) {
                    this.$emit('change-num', {
                        id,
                        type: 'sub'
                    });
                },
                add: function (id) {
                    this.$emit('change-num', {
                        id,
                        type: 'add'
                    });
                }
            },
        };
        // 总计
        const CartTotal = {
            props: ['list'],
            template: `
            <div class="total">
                <span>总价：{{total}}</span>
                <button>结算</button>
            </div>
            `,
            computed: {
                total: function () {
                    let t = 0;
                    this.list.forEach(item => {
                        t += item.price * item.num;
                    });
                    return t;
                }
            },
        };
        // 外层组件
        Vue.component('my-cart', {
            template: `
                <div class="cart">
                    <cart-title :uname="uname"></cart-title>
                    <cart-list :list="list" @cart-del="delCart" @change-num="changeNum"></cart-list>
                    <cart-total :list="list"></cart-total>
                </div>
            `,
            components: {
                'cart-title': CartTitle,
                'cart-list': CartList,
                'cart-total': CartTotal
            },
            data() {
                return {
                    uname: '张三',
                    list: [{
                        id: 1,
                        name: 'TCL彩电',
                        price: 1000,
                        num: 1,
                        img: 'img/a.jpg'
                    }, {
                        id: 2,
                        name: '机顶盒',
                        price: 1000,
                        num: 1,
                        img: 'img/b.jpg'
                    }, {
                        id: 3,
                        name: '海尔冰箱',
                        price: 1000,
                        num: 1,
                        img: 'img/c.jpg'
                    }, {
                        id: 4,
                        name: '小米手机',
                        price: 1000,
                        num: 1,
                        img: 'img/d.jpg'
                    }, {
                        id: 5,
                        name: 'PPTV电视',
                        price: 1000,
                        num: 2,
                        img: 'img/e.jpg'
                    }]
                };
            },
            methods: {
                delCart(id) {
                    // 根据 id 找到索引
                    let idx = this.list.findIndex(item => item.id == id);
                    // 根据索引删除数组中的数据
                    this.list.splice(idx, 1);
                },
                changeNum(data) {
                    // 根据子组件传递过来的数据进行更新
                    if (data.type === 'change') {
                        // 手动输入
                        this.list.some(item => {
                            if (item.id == data.id) {
                                item.num = data.num;
                                return true;
                            }
                        });
                    } else if (data.type === 'sub') {
                        // 减 1
                        this.list.some(item => {
                            if (item.id == data.id) {
                                item.num -= 1;
                                return true;
                            }
                        });
                    } else if (data.type === 'add') {
                        // 加 1
                        this.list.some(item => {
                            if (item.id == data.id) {
                                item.num += 1;
                                return true;
                            }
                        });
                    }
                }
            }
        });
        const vm = new Vue({
            el: '#app'
        });
    </script>
</body>

</html>
```

