## 几个概念了解一下

1\. 渐进式

可以局部的使用某一小块功能，追求最小化

2\. 声明式

声明式：我要什么，你来给我去做

命令式：我要第一步干嘛，第二步干嘛...最后达到怎样的结果

3\. 虚拟 DOM

用 JS 对象模拟真实的 DOM 结构


## 挂载元素的两种写法

```js
// new 构造函数得到的结果，咱们称为实例对象，这个 vm 就是实例对象
// data 里面放的所有数据都可以通过差值表达式可以直接用起来，例如 {{msg}}
const vm = new Vue({
    el: '#app',
    data: {
        msg: 'Hello Vue'
    }
});
```

```js
const vm = new Vue({
    data: {
        msg: 'Hello Vue'
    }
});
// 通过 Vue 实例的 $mount 方法去挂载
vm.$mount('#app');
```

## 解决闪烁

v-cloak: 是内部 Vue 所支持的指令，刚开始需要通过 CSS 属性选择器手动隐藏，当内容渲染完毕，Vue 会自动显示内容（会自动去掉 v-cloak 指令）

v-text 也可以解决闪烁

## v-html

v-html 使用的时候要保证数据安全性，否则可能导致 XSS 攻击，下面是一个简单的举例

```html
<div id="app">
    <div v-html='msg'></div>
</div>
<script src="js/vue.js"></script>
<script>
    // 由于 v-html 会解析标签，碰到 img 的 src 引入的资源不存在，会触发自身的 onerror 事件，攻击者就可以在事件处理程序里面做一些事件，例如获取你网站的信息发到自己服务器上面
    const vm = new Vue({
        el: '#app',
        data: {
            msg: `<img src="xxx" onerror="alert('什么破网站')"/>`
        }
    });
</script>
```

## 双向数据绑定的原理

Object.defineProperty

```html
<input type="text">
<p></p>
<script>
// 需求：模拟双向数据绑定
const data = {
    // 下划线开头的属性，一般约定表示私有的，不期望外部访问的
    _msg: ''
};

// 也可以往对象上面添加属性
// 往 data 对象上面添加了一个属性叫 msg，当访问这个属性的时候，会自动触发内部的 get 方法，get 方法的返回值就是这个属性对应的值
Object.defineProperty(data, 'msg', {
    get() {
        // 这个 this 就是 data
        return this._msg
    },
    // 当对 msg 属性进行赋值的时候，会自动的触发 set 方法，set 里面的第一个参数就是等号右边的值
    set(newValue) {
        this._msg = newValue;

        oP.innerHTML = this._msg;
        oInput.value = this._msg;
    }
});

// #1 这里的赋值会触发 set 方法，所以 data 中 _msg 变成了 'hello world'
// data.msg = 'hello world';
// #2 这里的取值会触发 get 方法，get 方法的返回值就是 data._msg
// console.log(data.msg);

const oP = document.querySelector('p');
const oInput = document.querySelector('input');

oInput.oninput = function(e) {
    // 这一步的操作会反复触发 set 函数
    data.msg = e.target.value;
};
</script>
```


## MVVM 思想

在 Vue 当中的体现

```html
<!-- V => View -->
<div id="app">
    <div v-cloak>{{msg}}</div>
</div>
<script>
    // vm => View Model
    const vm = new Vue({
        // M => model
        data: {
            msg: '<h1>xxx</h1>',
        }
    });
    vm.$mount('#app');
</script>
```

源码当中的提现

```js
const data = {
    _msg: ''
};

Object.defineProperty(data, 'msg', {
    get() {
        return this._msg
    },
    set(newValue) {
        this._msg = newValue;
        // #2 数据影响视图 => M 到 V 的变化，Data Bindings
        oP.innerHTML = this._msg;
        oInput.value = this._msg;
    }
});

const oP = document.querySelector('p');
const oInput = document.querySelector('input');

// #1 视图影响数据 => v 到 M 的变化，DOM Listeners
oInput.oninput = function (e) {
    data.msg = e.target.value;
};
```

## 事件绑定

**1.** 绑定单个事件

```html
<div id="app">
    <div>{{num}}</div>
    <div>
        <button @click='handle'>点击2</button>
    </div>
</div>
<script type="text/javascript" src="js/vue.js"></script>
<script type="text/javascript">
    const vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {
            handle: function () {
                // thjs 就是 Vue 的实例对象 vm
                console.log(this === vm)
                this.num++;
            }
        }
    });
</script>
```

**2.** 绑定多个事件，执行不同的事件处理程序（方法）

```html
<div id="app">
    <div>{{num}}</div>
    <div>
        <button v-on="{ click: handleClick, mouseover: handleMouseover }">按钮</button>
    </div>
</div>
<script src="js/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {
            handleClick() {
                this.num++;
            },
            handleMouseover() {
                this.num++;
            }
        }
    });
</script>
```

**3.** 给同一元素绑定一个事件，执行不同的事件处理程序（方法）

```html
<div id="app">
    <div>{{num}}</div>
    <div>
        <!-- 注意括号不能省略 -->
        <button v-on:click="handleClick1(), handleClick2()">按钮</button>
    </div>
</div>
<script src="js/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            num: 0
        },
        methods: {
            handleClick1() {
                this.num++;
            },
            handleClick2() {
                this.num++;
            }
        }
    });
</script>
```

**4.** 关于传参

```html
<div id="app">
    <!-- 不加括号，定义函数的第一个参数就是事件对象 -->
    <button v-on:click="handleClick1">按钮</button>
    <!-- 加括号，需要通过 $event 来充当事件对象 -->
    <button v-on:click="handleClick2(3, $event, 8)">按钮</button>
</div>
<script src="js/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        methods: {
            handleClick1(e) {
                console.log(e);
            },
            handleClick2(num1, e, num2) {
                console.log(e, num1 + num2);
            },
        }
    });
</script>
```

**5.** 事件修饰符注意点

@click.self.prevent，默认行为可以被儿子触发

@click.prevent.self，默认行为将不会被触发（无论是点击自己还是点击儿子）

**6.** 自定义按键修饰符注意点

```html
<div id="app">
    <!-- 65 不直观 -->
    <!-- <input type="text" v-on:keyup.65='handle' v-model='info'> -->
    <!-- 也可以直接写个 a -->
    <!-- <input type="text" v-on:keyup.a='handle' v-model='info'> -->
    <input type="text" v-on:keyup.keyupa='handle' v-model='info'>
</div>
<script src="js/vue.js"></script>
<script>
    // 1. 规则：自定义按键修饰符名字是自定义的，但是对应的值必须是按键对应 event.keyCode 值
    // 2. 不支持驼峰的写法，例如 keyupA
    Vue.config.keyCodes.keyupa = 65;
    const vm = new Vue({
        el: '#app',
        data: {
            info: ''
        },
        methods: {
            handle: function (event) {
                console.log(event.keyCode)
            }
        }
    });
</script>
```

## class 使用

1\. 最普通使用

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            background-color: red;
        }
    </style>

<body>
    <div id="app">
        <p class="active">hello world</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
        });
    </script>
</body>

</html>
```

2\. 动态绑定

```html
<div id="app">
    <!-- 加了冒号属于动态绑定，会去 data 里面找 active 属性对应的值 -->
    <p :class="active">hello world</p>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            active: 'active'
        }
    });
</script>
```

3\. 第一种写法，支持表达式，表达式返回的结果是字符串（类名）

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            background-color: red;
        }
    </style>

<body>
    <div id="app">
        <p :class="bBar ? 'active' : ''">hello world</p>
        <button @click="handleChange">change</button>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 需求：点击按钮，切换背景颜色
        const vm = new Vue({
            el: '#app',
            data: {
                bBar: true
            },
            methods: {
                handleChange() {
                    this.bBar = !this.bBar;
                }
            },
        });
    </script>
</body>

</html>
```

4\. 支持数组，数组里面可以写字符串，可以写表达式，可以写对象，也可以直接写 data 里面的数据（key）

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            background-color: red;
        }
    </style>

<body>
    <div id="app">
        <p :class="[bBar ? 'active' : '']">hello world</p>
        <button @click="handleChange">change</button>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 需求：点击按钮，切换背景颜色
        const vm = new Vue({
            el: '#app',
            data: {
                bBar: true
            },
            methods: {
                handleChange() {
                    this.bBar = !this.bBar;
                }
            },
        });
    </script>
</body>

</html>
```

5\. 支持对象的写法

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            background-color: red;
        }
    </style>

<body>
    <div id="app">
        <!-- 对象的 key 就代表类名，只有值为 true 的时候才生效 -->
        <p :class="{
            active: bBar
        }">hello world</p>
        <button @click="handleChange">change</button>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 需求：点击按钮，切换背景颜色
        const vm = new Vue({
            el: '#app',
            data: {
                bBar: true
            },
            methods: {
                handleChange() {
                    this.bBar = !this.bBar;
                }
            },
        });
    </script>
</body>

</html>
```

6\. 数组里面也可以套对象

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .active {
            background-color: red;
        }
    </style>

<body>
    <div id="app">
        <!-- 对象的 key 就代表类名，只有值为 true 的时候才生效 -->
        <p :class="[{
            active: bBar
        }]">hello world</p>
        <button @click="handleChange">change</button>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        // 需求：点击按钮，切换背景颜色
        const vm = new Vue({
            el: '#app',
            data: {
                bBar: true
            },
            methods: {
                handleChange() {
                    this.bBar = !this.bBar;
                }
            },
        });
    </script>
</body>

</html>
```

## style 动态绑定

一种是直接是一个对象，一种是数组里面包对象

