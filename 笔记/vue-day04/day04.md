## 接口调用方式

- 原生 AJAX

- 基于 jQuery的AJAX

- fetch

- axios

##  异步

- 同一时间可以做多件事件，JS 中常见的异步有定器、AJAX、事件函数


## promise

- 主要解决异步深层嵌套的问题

- Promise 提供了简洁的 API 使得异步操作更加容易

```javascript
/* 1. 使用 new 来构建一个 Promise，接收函数，并且函数中传入两个参数 resolve、reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数 */
var p = new Promise(function (resolve, reject) {
    // 2. 这里用于实现异步任务 setTimeout
    setTimeout(function () {
        var flag = false;
        if (flag) {
            //3. 正常情况
            resolve('hello');
        } else {
            //4. 异常情况
            reject('出错了');
        }
    }, 100);
});
// Promise 实例生成以后，可以用 then 方法指定 resolved 状态和 reject 状态的回调函数 
// 在 then 方法中，你也可以直接 return 数据而不是 Promise 对象，在后面的 then 中就可以接收到数据了  
p.then(function (data) {
    console.log(data)
}, function (info) {
    console.log(info)
});
```

## 基于 Promise 发送 AJAX 请求

```javascript
function queryData(url) {
    // 1.1 创建一个Promise实例
    var p = new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;
            if (xhr.readyState == 4 && xhr.status == 200) {
                // 1.2 处理正常的情况
                resolve(xhr.responseText);
            } else {
                // 1.3 处理异常情况
                reject('服务器错误');
            }
        };
        xhr.open('get', url);
        xhr.send(null);
    });
    return p;
}
// 在 then 方法中，你也可以直接 return 普通数据而不是 Promise 对象，在后面的 then 中就可以接收到数据了
queryData('http://localhost:3000/data')
    .then(function (data) {
        console.log(data)
        // 1.4 想要继续链式编程下去 需要 return
        return queryData('http://localhost:3000/data1');
    })
    .then(function (data) {
        console.log(data);
        return queryData('http://localhost:3000/data2');
    })
    .then(function (data) {
        console.log(data)
    });
```

## Promise 基本 API

### 实例方法，.then()，.catch()，.finally()

```javascript
// console.dir(Promise);
function foo() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // resolve(123);
            reject('error');
        }, 100);
    })
}
/* foo()
    .then(function (data) {
        console.log(data)
    })
    .catch(function (data) {
        console.log(data)
    })
    .finally(function () {
        console.log('finished')
    }); */

// 与上面写法是等价的
foo()
    .then(function (data) {
        // 得到异步任务正确的结果
        console.log(data)
    }, function (data) {
        // 获取异常信息
        console.log(data)
    })
    // 成功与否都会执行（不是正式标准）
    .finally(function () {
        console.log('finished')
    });
```

### 静态方法

#### .all()

`Promise.all` 方法接受一个数组作参数，数组中的对象（p1、p2、p3）均为promise实例（如果不是一个promise，该项会被用`Promise.resolve`转换为一个promise)。它的状态由这三个promise实例决定

#### .race()

`Promise.race` 方法同样接受一个数组作参数。当p1, p2, p3中有一个实例的状态发生改变（变为`fulfilled`或`rejected`），p的状态就跟着改变。并把第一个改变状态的promise的返回值，传给p的回调函数


```javascript
function queryData(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
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
        xhr.send(null);
    });
}

var p1 = queryData('http://localhost:3000/a1');
var p2 = queryData('http://localhost:3000/a2');
var p3 = queryData('http://localhost:3000/a3');
Promise.all([p1, p2, p3]).then(function (result) {
    //   all 中的参数  [p1,p2,p3]   和 返回的结果一 一对应["HELLO TOM", "HELLO JERRY", "HELLO SPIKE"]
    console.log(result) // ["HELLO TOM", "HELLO JERRY", "HELLO SPIKE"]
})
Promise.race([p1, p2, p3]).then(function (result) {
    // 由于p1执行较快，Promise的then()将获得结果'P1'。p2,p3仍在继续执行，但执行结果将被丢弃。
    console.log(result) // "HELLO TOM"
});
```

## fetch

- Fetch API 是新的 AJAX 解决方案，Fetch 会返回 Promise

- **fetch不是AJAX的进一步封装，而是原生js，没有使用XMLHttpRequest对象**

- fetch(url, options).then()

```javascript
/* fetch(url).then()，第一个参数请求的路径，Fetch 会返回 Promise，所以我们可以使用 then 拿到请求成功的结果 */
fetch('http://localhost:3000/fdata').then(function (data) {
    // text() 方法属于 fetchAPI 的一部分，它返回一个 Promise 实例对象，用于获取后台返回的数据
    return data.text();
}).then(function (data) {
    // 在这个then里面我们能拿到最终的数据  
    console.log(data);
});
```

### fetch API 中的 HTTP 请求

- fetch(url, options).then()

- HTTP协议，它给我们提供了很多的方法，如POST，GET，DELETE，UPDATE，PATCH和PUT

```javascript
// 1.1 GET参数传递，通过 ? 形式传参
fetch('http://localhost:3000/books?id=123', {
    // get 请求可以省略不写 默认的是GET 
    method: 'get'
}).then(function (data) {
    // 它返回一个Promise实例对象，用于获取后台返回的数据
    return data.text();
}).then(function (data) {
    // 在这个then里面我们能拿到最终的数据
    console.log(data)
});
```

```javascript
// 1.2 GET 参数传递，restful 形式的 URL 通过 / 的形式传递参数，即 id = 456 和 id 后台的配置有关
fetch('http://localhost:3000/books/456', {
    method: 'get'
}).then(function (data) {
    return data.text();
}).then(function (data) {
    console.log(data)
});
```

```javascript
// 2.1  DELETE 请求方式参数传递
fetch('http://localhost:3000/books/789', {
    method: 'delete'
}).then(function (data) {
    return data.text();
}).then(function (data) {
    console.log(data)
});
```

```javascript
// 3 POST请求传参
fetch('http://localhost:3000/books', {
    method: 'post',
    // 3.1 传递数据 
    body: 'uname=lisi&pwd=123',
    // 3.2 设置请求头 
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}).then(function (data) {
    return data.text();
}).then(function (data) {
    console.log(data)
});
```

```javascript
// POST请求传参
fetch('http://localhost:3000/books', {
    method: 'post',
    body: JSON.stringify({
        uname: '张三',
        pwd: '456'
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(function (data) {
    return data.text();
}).then(function (data) {
    console.log(data)
});
```

```javascript
// PUT请求传参，修改id 是 123 的
fetch('http://localhost:3000/books/123', {
    method: 'put',
    body: JSON.stringify({
        uname: '张三',
        pwd: '789'
    }),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(function (data) {
    return data.text();
}).then(function (data) {
    console.log(data)
});
```

### fetchAPI 中的响应格式

- 用 fetch 来获取数据，如果响应正常返回，我们首先看到的是一个response对象，其中包括返回的一堆原始字节，这些字节需要在收到后，需要我们通过调用方法将其转换为相应格式的数据，比如`JSON`，`BLOB`或者`TEXT`等等

```javascript
fetch('http://localhost:3000/json').then(function (data) {
    // return data.json(); //  将获取到的数据使用 json 转换对象
    return data.text(); // 将获取到的数据 转换成字符串 
}).then(function (data) {
    // console.log(data.uname)
    // console.log(typeof data)
    var obj = JSON.parse(data);
    console.log(obj.uname, obj.age, obj.gender)
});
```

## axios

- 基于promise用于浏览器和node.js的http客户端

- 支持浏览器和node.js

- 支持promise

- 能拦截请求和响应

- 自动转换JSON数据

- 能转换请求和响应数据

### axios基础用法

- get和 delete请求传递参数

  - 通过传统的url  以 ? 的形式传递参数
  -  restful 形式传递参数 
  - 通过params  形式传递参数 

- post  和 put  请求传递参数
  - 通过选项传递参数
  -  通过 URLSearchParams  传递参数 

```javascript
// 1. 发送get 请求
axios.get('http://localhost:3000/adata').then(function (ret) {
    // 拿到 ret 是一个对象      所有的对象都存在 ret 的data 属性里面
    // 注意 data 属性是固定的用法，用于获取后台的实际数据
    // console.log(ret.data)
    console.log(ret)
})
```

```javascript
// 2. get 请求传递参数
// # 2.1 通过传统的 url  以 ? 的形式传递参数
axios.get('http://localhost:3000/axios?id=123').then(function (ret) {
    console.log(ret.data)
});
```

```javascript
// 2.2 restful 形式传递参数
axios.get('http://localhost:3000/axios/123').then(function (ret) {
    console.log(ret.data)
});
```

```javascript
// 2.3 通过 params 形式传递参数
axios.get('http://localhost:3000/axios', {
    params: {
        id: 789
    }
}).then(function (ret) {
    console.log(ret.data)
});
```

```javascript
// 3 axios delete 请求传参，传参的形式和 get 请求一样
axios.delete('http://localhost:3000/axios', {
    params: {
        id: 111
    }
}).then(function (ret) {
    console.log(ret.data)
});
```

```javascript
// 4  axios 的 post 请求
// 4.1  通过选项传递参数
axios.post('http://localhost:3000/axios', {
    uname: 'lisi',
    pwd: 123
}).then(function (ret) {
    console.log(ret.data)
});
```

```javascript
// 4.2  通过 URLSearchParams  传递参数
var params = new URLSearchParams();
params.append('uname', 'zhangsan');
params.append('pwd', '111');
axios.post('http://localhost:3000/axios', params).then(function (ret) {
    console.log(ret.data)
});
```

```javascript
// 5 axios put 请求传参和 post 请求一样
axios.put('http://localhost:3000/axios/123', {
    uname: 'lisi',
    pwd: 123
}).then(function (ret) {
    console.log(ret.data)
});
```

### axios 全局配置

```javascript
// 配置公共的请求头 
axios.defaults.baseURL = 'https://api.example.com';

// 配置超时时间
axios.defaults.timeout = 2500;

// 配置公共的请求头
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// 配置公共的 post 的 Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### axios 拦截器

- 请求拦截器
  - 请求拦截器的作用是在请求发送前进行一些操作
    - 例如在每个请求体里加上token，统一做了处理如果以后要改也非常容易
- 响应拦截器
  - 响应拦截器的作用是在接收到响应后进行一些操作
    - 例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页

```javascript
// 1. 请求拦截器
axios.interceptors.request.use(function (config) {
    console.log(config.url)
    // 1.1  任何请求都会经过这一步在发送请求之前做些什么
    config.headers.mytoken = 'nihao';
    // 1.2  这里一定要return   否则配置不成功
    return config;
}, function (err) {
    // 1.3 对请求错误做点什么
    console.log(err)
});
// 2. 响应拦截器
axios.interceptors.response.use(function (res) {
    // 2.1  在接收响应做些什么
    var data = res.data;
    return data;
}, function (err) {
    // 2.2 对响应错误做点什么
    console.log(err)
});
```

## async 和 await

- async作为一个关键字放到函数前面
  - 任何一个`async`函数都会隐式返回一个`promise`
- `await`关键字只能在使用`async`定义的函数中使用
  - ​    await后面可以直接跟一个 Promise实例对象
  - ​     await函数不能单独使用
- **async/await 让异步代码看起来、表现起来更像同步代码**

```javascript
// 1. async 基础用法
// 1.1 async作为一个关键字放到函数前面
async function queryData() {
    // 1.2 await 关键字只能在使用 async 定义的函数中使用，await后面可以直接跟一个  Promise 实例对象
    var ret = await new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('nihao')
        }, 1000);
    });
    // console.log(ret.data)
    return ret;
};
// 1.3 任何一个 async 函数都会隐式返回一个 promise，我们可以使用 then 进行链式编程
queryData().then(function (data) {
    console.log(data)
});

// 2. async，函数处理多个异步函数
axios.defaults.baseURL = 'http://localhost:3000';

async function queryData() {
    // 2.1 添加 await 之后，当前的 await 返回结果之后才会执行后面的代码

    var info = await axios.get('async1');
    // 2.2  让异步代码看起来、表现起来更像同步代码
    var ret = await axios.get('async2?info=' + info.data);
    return ret.data;
};

queryData().then(function (data) {
    console.log(data)
});
```

## 图书列表案例

### 1. 基于接口案例-获取图书列表

```javascript
// 基准路径
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
// 响应拦截器
axios.interceptors.response.use(function (res) {
    return res.data;
}, function (error) {
    console.log(error);
});
```

```javascript
methods: {
    async queryData() {
        this.books = await axios.get('books');
    }
},
mounted() {
    this.queryData();
},
```

### 2   添加图书

- 获取用户输入的数据发送到后台

- 渲染最新的数据到页面上

```javascript
const res = await axios.post('books', {
    name: this.name
});
if (res.status === 200) {
    // 重新加载数据
    this.queryData();
}
```

### 3  验证图书名称是否存在

- 添加图书之前发送请求验证图示是否已经存在

- 如果不存在 往后台里面添加图书名称
  - 图书存在与否只需要修改submitFlag的值即可

```javascript
watch: {
    name: async function (val) {
        // 验证图书名称是否已经存在
        var res = await axios.get('/books/book/' + this.name);
        if (res.status == 1) {
            // 图书名称存在
            this.submitFlag = true;
        } else {
            // 图书名称不存在
            this.submitFlag = false;
        }
    }
}
```

### 4.  编辑图书

- 根据当前书的id 查询需要编辑的书籍

- 需要根据状态位判断是添加还是编辑 

```javascript
handle: async function () {
    if (this.flag) {
        // 编辑
        const res = await axios.put('books/' + this.id, {
            name: this.name
        });
        if (res.status === 200) {
            // 重新加载数据
            this.queryData();
        }
        // flag 设置为 false，恢复默认点击按钮时为添加状态
        this.flag = false;
    }
    this.id = '';
    this.name = '';
},
async toEdit(id) {
    // 用来区分是编辑还是修改
    this.flag = true;
    const res = await axios.get('books/' + id);
    this.id = res.id;
    this.name = res.name;
},
```

### 5 删除图书

- 把需要删除的id书籍 通过参数的形式传递到后台

```javascript
async deleteBook(id) {
    const res = await axios.delete('books/' + id);
    if (res.status === 200) {
        this.queryData();
    }
}
```

### 6 完整代码

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
            <input type="text" id="id" v-model='id' disabled="false" v-focus>
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
    <script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.0/axios.min.js"></script>
    <script>
        // 基准路径
        axios.defaults.baseURL = 'http://127.0.0.1:3000/';
        // 响应拦截器
        axios.interceptors.response.use(function (res) {
            return res.data;
        }, function (error) {
            console.log(error);
        });
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
                name: async function (val) {
                    // 验证图书名称是否已经存在
                    var res = await axios.get('/books/book/' + this.name);
                    if (res.status == 1) {
                        // 图书名称存在
                        this.submitFlag = true;
                    } else {
                        // 图书名称不存在
                        this.submitFlag = false;
                    }
                }
            },
            methods: {
                handle: async function () {
                    if (this.flag) {
                        // 编辑
                        const res = await axios.put('books/' + this.id, {
                            name: this.name
                        });
                        if (res.status === 200) {
                            // 重新加载数据
                            this.queryData();
                        }
                        // flag 设置为 false，恢复默认点击按钮时为添加状态
                        this.flag = false;
                    } else {
                        // 添加
                        const res = await axios.post('books', {
                            name: this.name
                        });
                        if (res.status === 200) {
                            // 重新加载数据
                            this.queryData();
                        }
                    }
                    this.id = '';
                    this.name = '';
                },
                async toEdit(id) {
                    // 用来区分是编辑还是修改
                    this.flag = true;
                    const res = await axios.get('books/' + id);
                    this.id = res.id;
                    this.name = res.name;
                },
                async deleteBook(id) {
                    const res = await axios.delete('books/' + id);
                    if (res.status === 200) {
                        this.queryData();
                    }
                },
                async queryData() {
                    this.books = await axios.get('books');
                }
            },
            mounted() {
                this.queryData();
            },
        });
    </script>
</body>

</html>
```