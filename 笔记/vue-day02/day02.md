# day02

## 表单基本操作

- 通过 v-model，获取单选框中的值

```html
<div id="app">
    <!-- 
        1、两个单选框需要同时通过 v-model 双向绑定一个值 
        2、每一个单选框必须要有 value 属性，且 value 值不能一样 
        3、当某一个单选框选中的时候 v-model 会将当前的 value 值改变成 data 中的数据
        gender 的值就是选中的值，我们只需要实时监控他的值就可以了
    -->
    <input type="radio" name="sex" id="male" value="1" v-model='gender'>
    <label for="male">男</label>

    <input type="radio" name="sex" id="female" value="2" v-model='gender'>
    <label for="female">女</label>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 默认会让当前的 value 值为 2 的单选框选中
            gender: 2,
        }
    });
</script>
```

- 通过 v-model，获取复选框中的值

    - 和获取单选框中的值一样 

    - 复选框 `checkbox` 这种的组合时，data 中的 hobby 我们要定义成数组，否则无法实现多选

```html
<div id="app">
    <span>爱好：</span>
    <input name="hobbies" type="checkbox" id="ball" value="1" v-model='hobby'>
    <label for="ball">篮球</label>
    <input name="hobbies" type="checkbox" id="sing" value="2" v-model='hobby'>
    <label for="sing">唱歌</label>
    <input name="hobbies" type="checkbox" id="code" value="3" v-model='hobby'>
    <label for="code">写代码</label>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 默认会让当前的 value 值为 2 和 3 的复选框选中
            hobby: ['2', '3'],
        },
    });
</script>
```

- 通过 v-model，获取下拉框和文本框中的值

```html
<div id="app">
    <span>职业：</span>
    <!--
        1、需要给 select，通过 v-model 双向绑定一个值
        2、每一个 option，必须要有 value 属性且 value 值不能一样 
        3、当某一个 option 选中的时候 v-model会将当前的 value 值改变成 data 中的数据
            occupation 的值就是选中的值，我们只需要实时监控他的值就可以了
    -->
    <!-- multiple  多选 -->
    <select v-model='occupation' multiple>
        <option value="0">请选择职业...</option>
        <option value="1">教师</option>
        <option value="2">软件工程师</option>
        <option value="3">律师</option>
    </select>
    <!-- textarea 是 一个双标签   不需要绑定value 属性的  -->
    <textarea v-model='desc'></textarea>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            // 默认会让当前的 value 值为 2 和 3 的下拉框选中
            occupation: ['2', '3'],
            desc: 'nihao'
        },
    });
</script>
```

## 表单修饰符

- .number，转换为数值

    - 当开始输入非数字的字符串时，因为 Vue 无法将字符串转换成数值

    - 所以属性值将实时更新成相同的字符串。即使后面输入数字，也将被视作字符串

- .trim，自动过滤用户输入的首尾空白字符

    - 只能去掉首尾的，不能去除中间的空格

- .lazy，将 input 事件切换成 change 事件

```html
<div id="app">
    <!-- 自动将用户的输入值转为数值类型 -->
    <input v-model.number="age" type="number">

    <!--自动过滤用户输入的首尾空白字符   -->
    <input v-model.trim="msg">

    <!-- 在“change”时而非“input”时更新 -->
    <input v-model.lazy="msg">
</div>
```

## 自定义指令

当内置指令不能满足我们特殊的需求，Vue 允许我们自定义指令

### Vue.directive，注册全局指令

```html
<div id="app">
    <!-- 使用自定义的指令，只需在对应的元素中，加上 'v-' 的前缀形，成类似于内部指令'v-if'，'v-text'... -->
    <input type="text" v-focus>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 注意点： 
    // 1、在自定义指令中  如果以驼峰命名的方式定义 如  Vue.directive('focusA',function(){}) 
    // 2、在HTML中使用的时候 只能通过 v-focus-a 来使用 

    // 注册一个全局自定义指令 v-focus
    Vue.directive('focus', {
        // 当绑定元素插入到 DOM 中。 其中 el为 dom元素
        inserted: function (el) {
            // 聚焦元素
            el.focus();
        }
    });
    new Vue({
        el: '#app'
    });
</script>
```

### Vue.directive 注册带参数的全局指令

```html
<div id="app">
    <input type="text" v-color='msg'>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    Vue.directive('color', {
        // bind声明周期, 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
        // el 为当前自定义指令的 DOM 元素  
        // binding 为自定义的函数形参，通过自定义属性传递过来的值存在 binding.value 里面
        bind: function (el, binding) {
            // 根据指令的参数设置背景色
            el.style.backgroundColor = binding.value.color;
        }
    });
    const vm = new Vue({
        el: '#app',
        data: {
            msg: {
                color: 'blue'
            }
        }
    });
</script>
```

### 自定义指令局部指令

- 局部指令，需要定义在 directives 的选项，用法和全局用法一样 

- 局部指令只能在当前组件里面使用

- 当全局指令和局部指令同名时以局部指令为准

```html
<div id="app">
    <input type="text" v-color='msg'>
    <input type="text" v-focus>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 自定义指令-局部指令 */
    const vm = new Vue({
        el: '#app',
        data: {
            msg: {
                color: 'red'
            }
        },
        // 局部指令，需要定义在 directives 的选项
        directives: {
            color: {
                bind: function (el, binding) {
                    el.style.backgroundColor = binding.value.color;
                }
            },
            focus: {
                inserted: function (el) {
                    el.focus();
                }
            }
        }
    });
</script>
```

## 计算属性 computed

- 模板中放入太多的逻辑会让模板过重且难以维护，使用计算属性可以让模板更加的简洁

- **计算属性是基于它们的响应式依赖进行缓存的**

- computed 比较适合对多个变量或者对象进行处理后返回一个结果值，也就是当多个变量中的某一个值发生了变化则我们监控的这个值也就会发生变化

```html
<div id="app">
    <div>{{reverseString}}</div>
    <div>{{reverseString}}</div>
    <!-- 调用 methods 中的方法的时候  他每次会重新调用 -->
    <div>{{reverseMessage()}}</div>
    <div>{{reverseMessage()}}</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    /* 计算属性与方法的区别：计算属性是基于依赖进行缓存的，而方法不缓存 */
    const vm = new Vue({
        el: '#app',
        data: {
            msg: 'Nihao',
            num: 100
        },
        methods: {
            reverseMessage: function () {
                // 执行了 2 次
                console.log('methods')
                return this.msg.split('').reverse().join('');
            }
        },
        // computed 属性定义和  data 以及 methods 平级 
        computed: {
            reverseString: function () {
                // 执行了 1 次
                console.log('computed');
                return this.msg.split('').reverse().join('');
            }
        }
    });
</script>
```

## 侦听器 watch

- 使用 watch 来响应数据的变化，一般用于异步或者开销较大的操作

- watch 中的属性一定是 data 中已经存在的数据 

- **普通的 watch 方法无法监听到对象内部属性的改变，，此时就需要 deep 属性对对象进行深度监听**

```html
<div id="app">
    <div>
        <span>名：</span>
        <span>
            <input type="text" v-model='firstName'>
        </span>
    </div>
    <div>
        <span>姓：</span>
        <span>
            <input type="text" v-model='lastName'>
        </span>
    </div>
    <div>{{fullName}}</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            firstName: 'Jim',
            lastName: 'Green',
            fullName: 'Jim Green'
        },
        //watch 属性定义和 data 以及 methods 平级
        watch: {
            // 注意：这里 firstName 对应着 data 中的 firstName
            // 当 firstName 值改变的时候会自动触发 watch
            firstName: function (val) {
                this.fullName = val + ' ' + this.lastName;
            },
            //   注意：这里 lastName 对应着 data 中的 lastName 
            lastName: function (val) {
                this.fullName = this.firstName + ' ' + val;
            }
        }
    });
</script>
```

## 过滤器

- Vue.js 允许自定义过滤器，可被用于一些常见的文本格式化

- 过滤器可以用在两个地方：双花括号插值和 v-bind 表达式

- 过滤器应该被添加在 JS 表达式的尾部，由“管道”符号指示

- 支持级联操作

- 过滤器不改变真正的 `data`，而只是改变渲染的结果，并返回过滤后的版本

- 全局注册时是 filter，没有 s 的，而局部过滤器是 filters，是有 s 的

```html
<div id="app">
    <input type="text" v-model='msg'>
    <!-- upper 被定义为接收单个参数的过滤器函数，表达式 msg 的值将作为参数传入到函数中 -->
    <div>{{msg | upper}}</div>
    <!-- 支持级联操作
        upper 被定义为接收单个参数的过滤器函数，表达式 msg 的值将作为参数传入到函数中
        然后继续调用同样被定义为接收单个参数的过滤器 lower，将 upper 的结果传递到 lower 中
    -->
    <div>{{msg | upper | lower}}</div>
    <!-- 也可用于属性绑定 -->
    <div :abc='msg | upper'>测试数据</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    //  lower 为全局过滤器     
    Vue.filter('lower', function (val) {
        return val.charAt(0).toLowerCase() + val.slice(1);
    });
    var vm = new Vue({
        el: '#app',
        data: {
            msg: ''
        },
        // filters 属性定义和 data 以及 methods 平级 
        filters: {
            // upper 自定义的过滤器名字 
            // upper 被定义为接收单个参数的过滤器函数，表达式 msg 的值将作为参数传入到函数中
            upper: function (val) {
                //  过滤器中一定要有返回值 这样外界使用过滤器的时候才能拿到结果
                return val.charAt(0).toUpperCase() + val.slice(1);
            }
        }
    });
</script>
```

### 过滤器中传递参数

```html
<div id="app">
    <!--
        filterA 被定义为接收三个参数的过滤器函数
        其中 message 的值作为第一个参数，
        普通字符串 'arg1' 作为第二个参数，表达式 arg2 的值作为第三个参数
    -->
    {{ message | filterA('arg1', 'arg2') }}
</div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    // 在过滤器中，第一个参数对应的是管道符前面的数据，例如 n 此时对应 message
    // 第 2 个参数 a 对应 实参 arg1 字符串
    // 第 3 个参数 b 对应 实参 arg2 字符串
    Vue.filter('filterA', function (n, a, b) {
        if (n < 10) {
            return n + a;
        } else {
            return n + b;
        }
    });

    new Vue({
        el: "#app",
        data: {
            message: "哈哈哈"
        }
    })
</script>
```

## 生命周期

- 事物从出生到死亡的过程

- Vue 实例从创建到销毁的过程，这些过程中会伴随着一些函数的自调用。我们称这些函数为钩子函数

### 常用的钩子函数

| 钩子  | 含义 |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 在实例初始化之后，数据观测和事件配置之前被调用 此时data 和 methods 以及页面的DOM结构都没有初始化   什么都做不了 |
| created       | 在实例创建完成后被立即调用此时data 和 methods已经可以使用  但是页面还没有渲染出来 |
| beforeMount   | 在挂载开始之前被调用   此时页面上还看不到真实数据 只是一个模板页面而已 |
| mounted       | el被新创建的vm.$el替换，并挂载到实例上去之后调用该钩子。  数据已经真实渲染到页面上  在这个钩子函数里面我们可以使用一些第三方的插件 |
| beforeUpdate  | 数据更新时调用，发生在虚拟DOM打补丁之前。   页面上数据还是旧的 |
| updated       | 由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子。 页面上数据已经替换成最新的 |
| beforeDestroy | 实例销毁之前调用                                             |
| destroyed     | 实例销毁后调用                                               |

## 数组变异方法

- 在 Vue 中，直接修改对象属性的值无法触发响应式。当你直接修改了对象属性的值，你会发现，只有数据改了，但是页面内容并没有改变

- 变异数组方法即保持数组方法原有功能不变的前提下对其进行功能拓展

| 钩子  | 含义 |
| ----------- | ------------------------------------------------------------ |
| `push()`    | 往数组最后面添加一个元素，成功返回当前数组的长度             |
| `pop()`     | 删除数组的最后一个元素，成功返回删除元素的值                 |
| `shift()`   | 删除数组的第一个元素，成功返回删除元素的值                   |
| `unshift()` | 往数组最前面添加一个元素，成功返回当前数组的长度             |
| `splice()`  | 有三个参数，第一个是想要删除的元素的下标（必选），第二个是想要删除的个数（必选），第三个是删除 后想要在原位置替换的值 |
| `sort()`    | sort()  使数组按照字符编码默认从小到大排序,成功返回排序后的数组 |
| `reverse()` | reverse()  将数组倒序，成功返回倒序后的数组                  |

## 替换数组

- 不会改变原始数组，但总是返回一个新数组

| 方法 | 含义 |
| ------ | ------------------------------------------------------------ |
| filter | filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。 |
| concat | concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组 |
| slice  | slice() 方法可从已有的数组中返回选定的元素。该方法并不会修改数组，而是返回一个子数组 |

## 动态数组响应式数据

- Vue.set(a,b,c)，让触发视图重新更新一遍，数据动态起来

- a 是要更改的数据、b 是数据的第几项、c 是更改后的数据

## 图书列表案例

- 静态列表效果

- 基于数据实现模板效果

- 处理每行的操作按钮

### 1、提供的静态数据

- 数据存放在vue 中 data 属性中

```javascript
const vm = new Vue({
    el: '#app',
    data: {
        books: [{
            id: 1,
            name: '三国演义',
            date: ''
        }, {
            id: 2,
            name: '水浒传',
            date: ''
        }, {
            id: 3,
            name: '红楼梦',
            date: ''
        }, {
            id: 4,
            name: '西游记',
            date: ''
        }]
    }
});
```

### 2、把提供好的数据渲染到页面上

- 利用 v-for 循环遍历 books 将每一项数据渲染到对应的数据中

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <table border="2">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in books" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.date}}</td>
                    <td>
                        <a href="#" @click.prevent>修改</a>
                        <a href="#" @click.prevent>删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                books: [{
                    id: 1,
                    name: '三国演义',
                    date: ''
                }, {
                    id: 2,
                    name: '水浒传',
                    date: ''
                }, {
                    id: 3,
                    name: '红楼梦',
                    date: ''
                }, {
                    id: 4,
                    name: '西游记',
                    date: ''
                }],
            },
        });
    </script>
</body>

</html>
```

### 3、添加图书

- 通过双向绑定获取到输入框中的输入内容

- 给按钮添加点击事件

- 把输入框中的数据存储到 data 中的 books  里面

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <div class="book">
            <label for="id">
                编号：
            </label>
            <!-- 3.1、通过双向绑定获取到输入框中的输入的 id  -->
            <input type="text" id="id" v-model='id'>
            <label for="name">
                名称：
            </label>
            <!-- 3.2、通过双向绑定获取到输入框中的输入的 name  -->
            <input type="text" id="name" v-model='name'>
            <!-- 3.3、给按钮添加点击事件  -->
            <button @click='handle'>提交</button>
        </div>
        <table border="2">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in books" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.date}}</td>
                    <td>
                        <a href="#" @click.prevent="handleEdit(item.id)">修改</a>
                        <a href="#" @click.prevent="handleDelete(item.id)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                books: [{
                    id: 1,
                    name: '三国演义',
                    date: ''
                }, {
                    id: 2,
                    name: '水浒传',
                    date: ''
                }, {
                    id: 3,
                    name: '红楼梦',
                    date: ''
                }, {
                    id: 4,
                    name: '西游记',
                    date: ''
                }],
                id: '',
                name: ''
            },
            methods: {
                handle: function () {
                    // 3.4 定义一个新的对象book 存储 获取到输入框中 书 的id和名字 
                    var book = {};
                    book.id = this.id;
                    book.name = this.name;
                    // 日期先留空处理
                    book.date = '';
                    // 3.5 把book  通过数组的变异方法 push 放到    books 里面
                    this.books.push(book);
                    //3.6 清空输入框
                    this.id = '';
                    this.name = '';
                }
            },
        });
    </script>
</body>

</html>
```

### 4、修改图书

- 修改信息填充到表单并禁用 ID 输入框

```javascript
toEdit(id) {
    this.flag = true;
    // 根据 id 查询出数据
    var book = this.books.filter(item => item.id == id);
    // 填充到表单
    this.id = book[0].id;
    this.name = book[0].name;
}
```

- 重用添加和修改的方法

```javascript
handle: function () {
    if (this.flag) {
        // 编辑
        this.books.some(item => {
            if (item.id == this.id) {
                item.name = this.name;
                return true;
            }
        });
        // 打开 ID 输入框
        this.flag = false;
    } else {
        // 添加
        var book = {};
        book.id = this.id;
        book.name = this.name;
        book.date = '';
        this.books.push(book);
    }
    this.id = '';
    this.name = '';
}
```

### 5、修改图书逻辑和代码

- 5.1  定义一个标识符， 主要是控制 编辑状态下当前编辑书籍的id 不能被修改 即 处于编辑状态下 当前控制书籍编号的输入框禁用  

-  5.2  通过属性绑定给书籍编号的 绑定 disabled 的属性  flag 为 true 即为禁用

-  5.3  flag 默认值为false   处于编辑状态 要把 flag 改为true 即当前表单为禁用 

-  5.4  复用添加方法   用户点击提交的时候依然执行 handle 中的逻辑如果 flag 为 true 即 表单处于不可输入状态 此时执行的用户编辑数据数据

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <div class="book">
            <label for="id">
                编号：
            </label>
            <!-- 3.1、通过双向绑定获取到输入框中的输入的 id  -->
            <input type="text" id="id" v-model='id' :disabled="flag">
            <label for="name">
                名称：
            </label>
            <!-- 3.2、通过双向绑定获取到输入框中的输入的 name  -->
            <input type="text" id="name" v-model='name'>
            <!-- 3.3、给按钮添加点击事件  -->
            <button @click='handle'>提交</button>
        </div>
        <table border="2">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in books" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.date}}</td>
                    <td>
                        <a href="#" @click.prevent="toEdit(item.id)">修改</a>
                        <a href="#" @click.prevent>删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const vm = new Vue({
            el: '#app',
            data: {
                id: '',
                name: '',
                flag: false,
                books: [{
                    id: 1,
                    name: '三国演义',
                    date: ''
                }, {
                    id: 2,
                    name: '水浒传',
                    date: ''
                }, {
                    id: 3,
                    name: '红楼梦',
                    date: ''
                }, {
                    id: 4,
                    name: '西游记',
                    date: ''
                }],
            },
            methods: {
                handle: function () {
                    if (this.flag) {
                        // 编辑
                        this.books.some(item => {
                            if (item.id == this.id) {
                                item.name = this.name;
                                return true;
                            }
                        });
                        // 打开 ID 输入框
                        this.flag = false;
                    } else {
                        // 添加
                        var book = {};
                        book.id = this.id;
                        book.name = this.name;
                        book.date = '';
                        this.books.push(book);
                    }
                    this.id = '';
                    this.name = '';
                },
                toEdit(id) {
                    this.flag = true;
                    // 根据 id 查询出数据
                    var book = this.books.filter(item => item.id == id);
                    // 填充到表单
                    this.id = book[0].id;
                    this.name = book[0].name;
                }
            },
        });
    </script>
</body>

</html>
```

### 6 删除图书

- 6.1 给删除按钮添加事件 把当前需要删除的书籍id 传递过来

- 6.2 根据id从数组中查找元素的索引

- 6.3 根据索引删除数组元素

```javascript
deleteBook(id) {
    /* var index = this.books.findIndex(item => item.id == id);
    this.books.splice(index, 1); */
    this.books = this.books.filter(item => item.id != id);
}
```

## 常用特性应用场景

### 1、过滤器

- Vue.filter  定义一个全局过滤器

```javascript
Vue.filter('format', function (value, arg) {});
```

### 2、自定义指令

- 让表单自动获取焦点

- 通过 Vue.directive 自定义指定

```javascript
Vue.directive('focus', {
    inserted: function (el) {
        el.focus();
    }
});
```

### 3、计算属性

- 通过计算属性计算图书的总数，总数就是计算数组的长度 

```javascript
computed: {
    total: function() {
        return this.books.length;
    }
}
```

### 4、监听器

监听图书名字是否存在，存在就禁用提交

```javascript
watch: {
    name: function (val) {
        // 验证图书名称是否已经存在
        var flag = this.books.some(item => item.name == val)
        if (flag) {
            this.submitFlag = true;
        } else {
            this.submitFlag = false;
        }
    }
},
```

### 5、生命周期

```javascript
mounted() {
    const books = [{
        id: 1,
        name: '三国演义',
        date: 1604629863894
    }, {
        id: 2,
        name: '水浒传',
        date: 1604629863894
    }, {
        id: 3,
        name: '红楼梦',
        date: 1604629863894
    }, {
        id: 4,
        name: '西游记',
        date: 1604629863894
    }];
    this.books = books
}
```

## 完整代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

<body>
    <div id="app">
        <div class="book">
            <label for="id">
                编号：
            </label>
            <!-- 3.1、通过双向绑定获取到输入框中的输入的 id  -->
            <input type="text" id="id" v-model='id' :disabled="flag" v-focus>
            <label for="name">
                名称：
            </label>
            <!-- 3.2、通过双向绑定获取到输入框中的输入的 name  -->
            <input type="text" id="name" v-model='name'>
            <!-- 3.3、给按钮添加点击事件  -->
            <button @click='handle' :disabled="submitFlag">提交</button>
        </div>
        <table border="2">
            <thead>
                <tr>
                    <th>编号</th>
                    <th>名称</th>
                    <th>时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in books" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.date | format('yyyy-MM-dd hh:mm:ss')}}</td>
                    <td>
                        <a href="#" @click.prevent="toEdit(item.id)">修改</a>
                        <a href="#" @click.prevent="deleteBook(item.id)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <p>{{total}}</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        Vue.directive('focus', {
            inserted: function (el) {
                el.focus();
            }
        });
        Vue.filter('format', function (value, arg) {
            function dateFormat(date, format) {
                if (typeof date === "string") {
                    var mts = date.match(/(\/Date\((\d+)\)\/)/);
                    if (mts && mts.length >= 3) {
                        date = parseInt(mts[2]);
                    }
                }
                date = new Date(date);
                if (!date || date.toUTCString() == "Invalid Date") {
                    return "";
                }
                var map = {
                    "M": date.getMonth() + 1, //月份 
                    "d": date.getDate(), //日 
                    "h": date.getHours(), //小时 
                    "m": date.getMinutes(), //分 
                    "s": date.getSeconds(), //秒 
                    "q": Math.floor((date.getMonth() + 3) / 3), //季度 
                    "S": date.getMilliseconds() //毫秒 
                };
                format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
                    var v = map[t];
                    if (v !== undefined) {
                        if (all.length > 1) {
                            v = '0' + v;
                            v = v.substr(v.length - 2);
                        }
                        return v;
                    } else if (t === 'y') {
                        return (date.getFullYear() + '').substr(4 - all.length);
                    }
                    return all;
                });
                return format;
            }
            return dateFormat(value, arg);
        });
        const vm = new Vue({
            el: '#app',
            data: {
                id: '',
                name: '',
                flag: false,
                submitFlag: false,
                books: [],
            },
            computed: {
                total: function () {
                    return this.books.length;
                }
            },
            watch: {
                name: function (val) {
                    // 验证图书名称是否已经存在
                    var flag = this.books.some(item => item.name == val)
                    if (flag) {
                        this.submitFlag = true;
                    } else {
                        this.submitFlag = false;
                    }
                }
            },
            methods: {
                handle: function () {
                    if (this.flag) {
                        // 编辑
                        this.books.some(item => {
                            if (item.id == this.id) {
                                item.name = this.name;
                                return true;
                            }
                        });
                        // 打开 ID 输入框
                        this.flag = false;
                    } else {
                        // 添加
                        var book = {};
                        book.id = this.id;
                        book.name = this.name;
                        book.date = '';
                        this.books.push(book);
                    }
                    this.id = '';
                    this.name = '';
                },
                toEdit(id) {
                    this.flag = true;
                    // 根据 id 查询出数据
                    var book = this.books.filter(item => item.id == id);
                    // 填充到表单
                    this.id = book[0].id;
                    this.name = book[0].name;
                },
                deleteBook(id) {
                    /* var index = this.books.findIndex(item => item.id == id);
                    this.books.splice(index, 1); */
                    this.books = this.books.filter(item => item.id != id);
                }
            },
            mounted() {
                const books = [{
                    id: 1,
                    name: '三国演义',
                    date: 1604629863894
                }, {
                    id: 2,
                    name: '水浒传',
                    date: 1604629863894
                }, {
                    id: 3,
                    name: '红楼梦',
                    date: 1604629863894
                }, {
                    id: 4,
                    name: '西游记',
                    date: 1604629863894
                }];
                this.books = books
            },
        });
    </script>
</body>

</html>
```