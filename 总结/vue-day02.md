## v-if 和 v-show

v-show: 适用于频繁切换的情况，效率相对 v-if 较高

v-if: 使用切换频率不高的情况，但是它可以配合 v-else 去使用，v-show 不方便做到


## 前端生成唯一 key

循环列表的时候都要加上 key，作用是在 DOM Diff 的时候快速要到要更新的那个元素，提高查找的性能

```html
<div id="app">
    <div>水果列表</div>
    <ul>
        <!-- <li v-for='item in fruits' :data-key="k()">{{item}}</li> -->
        <li v-for='item in fruits' :key="k()+''">{{item}}</li>
    </ul>
</div>
<script src="js/vue.js"></script>
<script>
    const k = () => {
        let i = 0;
        return () => {
            return i++;
        };
    };
    const generatorK = k();
    const vm = new Vue({
        el: '#app',
        data: {
            fruits: ['apple', 'orange', 'banana'],
            k: generatorK
        }
    });
</script>
```

## 选项卡案例

```html
<div id="app">
    <div class="tab">
        <ul>
            <!-- <li :class="currentIndex === index ? 'active' : ''" :key='item.id' v-for='(item,index) in list'>{{item.title}}</li> -->
            <!-- <li :class="currentIndex === index && 'active'" :key='item.id' v-for='(item,index) in list'>{{item.title}}</li> -->
            <li :class="{
                [xxx]: currentIndex === index
            }" :key='item.id' v-for='(item,index) in list' @click="handleClick(index)">{{item.title}}</li>
            <!-- <li :class="[currentIndex === index ? 'active' : '']" :key='item.id' v-for='(item,index) in list' @click="handleClick(index)">
                {{item.title}}</li> -->
        </ul>
        <div :class="[currentIndex === index ? 'current' : '']" :key='item.id' v-for='(item, index) in list'>
            <img :src="item.path">
        </div>
    </div>
</div>
<script src="js/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            currentIndex: 0, // 选项卡当前的索引
            list: [{
                id: 1,
                title: 'apple',
                path: 'img/apple.png'
            }, {
                id: 2,
                title: 'orange',
                path: 'img/orange.png'
            }, {
                id: 3,
                title: 'lemon',
                path: 'img/lemon.png'
            }],
            xxx: 'active'
        },
        methods: {
            handleClick(index) {
                this.currentIndex = index;
            }
        },
    });
    /* let active = 'name';
    const obj = {
        [active]: 'xxx'
    };
    console.log(obj); */
</script>
```

## 收集表单数据

1\. form => jQuery 时代可以监听 form 的 submit 事件，用 $(this).serialize() 收集数据

2\. form => 给 form 指定 action 属性可以提交数据

3\. Vue 当中收集表单数据，v-model 配合默认 value

## 自定义指令

一般情况下，和样式相关的，可以使用 bind 或 inserted，和行为相关的，使用 inserted

```js
Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});
```

```js
Vue.directive('color', {
    bind: function (el, binding) {
        el.style.backgroundColor = binding.value.color;
    }
});
```

## 全局和局部指令

```js
// #1 全局指令，任意使用
Vue.directive('color2', {
    inserted: function (el) {
        el.style.backgroundColor = 'pink';
    }
});
const vm = new Vue({
    el: '#app1',
    // #2 局部指令，当前组件使用
    directives: {
        color: {
            bind: function (el) {
                el.style.backgroundColor = 'green';
            }
        }
    }
});

new Vue({
    el: '#app2'
});
```

## 计算属性和方法

1\. 计算属性写在 computed 里面，方法写在 methods 里面

2\. 计算属性基于依赖（data 中的数据）进行缓存，只有数据发生变化的情况下，才会重新执行计算方法

3\. 方法不存在缓存，每调用一次，就会执行一次

4\. 开销比较大的操作建议使用计算属性，性能高！

## 侦听器

如果说需要根据数据的变化执行一些异步操作（例如发送请求）需要用到侦听器

```js
const vm = new Vue({
    el: '#app',
    data: {
        firstName: 'Jim',
        lastName: 'Green',
        fullName: ''
    },
    watch: {
        firstName: {
            handler: function (val, oldVal) {
                console.log(1);
                this.fullName = val + ' ' + this.lastName;
            },
            immediate: true // 立即执行
        },
        lastName: function (val) {
            this.fullName = this.firstName + ' ' + val;
        }
    }
});
```

深度侦听变化（了解）

```html
<div id="app">
    <div>{{obj.info.age}}</div>
    <input type="text" v-model="obj.info.age">
</div>
<script src="js/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            obj: {
                info: {
                    age: 18
                }
            },
        },
        watch: {
            /* obj: {
                handler: function () {
                    console.log(1);
                },
                deep: true
            }, */
            'obj.info.age': {
                handler: function () {
                    console.log(1);
                },
            },
        }
    });
</script>
```

## 生命周期

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <div>{{msg}}</div>
        <button @click='update'>更新</button>
        <button @click='destroy'>销毁</button>
    </div>
    <script type="text/javascript" src="js/vue.js"></script>
    <script type="text/javascript">
        /*
          Vue 实例的生命周期：在某个阶段会触发的函数
        */
        const vm = new Vue({
            el: '#app',
            data: {
                msg: '生命周期'
            },
            methods: {
                update: function () {
                    this.msg = 'hello';
                },
                destroy: function () {
                    this.$destroy();
                }
            },
            beforeCreate: function () {
                // 实例创建前，this 确实有，但是获取不到 data 中的数据
                console.log('beforeCreate');
            },
            created: function () {
                // 这里可以尽可能早的拿到 data 中的数据
                // 例如想根据数据尽可能早的发送请求，就可以这个钩子里面做
                console.log('created');
            },
            beforeMount: function () {
                // 渲染前
                // this.$el 代表根元素
                // 这一步获取不到界面中的数据
                // console.log(this.$el.innerHTML);
                console.log('beforeMount');
            },
            mounted: function () {
                // 如果说需要尽可能早的获取渲染后的数据
                // 可以任意的操作 DOM 或者渲染后的数据，也可以在此钩子里面发送请求
                console.log(this.$el.innerHTML);
                console.log('mounted');
            },
            beforeUpdate: function () {
                // 更新数据前
                console.log('beforeUpdate');
            },
            updated: function () {
                // 更新数据后
                console.log('updated');
            },
            beforeDestroy: function () {
                // 组件销毁前
                console.log('beforeDestroy');
            },
            destroyed: function () {
                // 组件销毁后
                console.log('destroyed');
            }
        });
    </script>
</body>

</html>
```

## 下面 2 种情况操作的数据不是响应式的

响应式：数据的改变会影响视图

1\. 直接通过下标修改数组的内容

2\. 后续直接给对象添加的属性（data 中初始并没有这个属性）


```html
<div id="app">
    <ul>
        <li v-for='item in list'>{{item}}</li>
    </ul>
    <div>
        <div>{{info.name}}</div>
        <div>{{info.age}}</div>
        <div>{{info.gender}}</div>
    </div>
</div>
<script src="js/vue.js"></script>
<script>
    /*
        动态处理响应式数据
        
    */
    const vm = new Vue({
        el: '#app',
        data: {
            list: ['apple', 'orange', 'banana'],
            info: {
                name: 'lisi',
                age: 12
            }
        },
        created() {
            this.$set(this.list, 2, 'lemon');
        },
    });
    // vm.list[1] = 'lemon';
    // 要修改的数组，索引，要修改为的数据
    // Vue.set(vm.list, 2, 'lemon');
    // vm.$set(vm.list, 2, 'lemon');

    // vm.info.gender = 'male';
    Vue.set(vm.info, 'gender', 'female');
    // vm.$set(vm.info, 'gender', 'female');
</script>
```