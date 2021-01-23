## Fetch 发送 GET 或 DELETE 请求以及传参

```js
fetch('http://localhost:3000/fdata?id=888', {
    method: 'DELETE',
    // 后端如果返回的是普通文本，需要通过 data.text() 进行解析，解析的结果是一个 Promise，要继续通过 then 去拿到真正的结果
})
    .then((res) => res.text())
    .then((data) => {
        console.log(data);
    });
```

## Fetch 发送 POST 或 PUT 请求以及传参

传递 key=value 的形式

```js
fetch('http://localhost:3000/books', {
    method: 'post',
    body: 'uname=lisi&pwd=123',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
})
    .then((res) => res.text())
    .then(function (data) {
        console.log(data);
    });
```

传递 json 的形式

```js
fetch('http://localhost:3000/books', {
    method: 'post',
    body: JSON.stringify({
        uname: '张三',
        pwd: '456',
    }),
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then(function (data) {
        return data.text();
    })
    .then(function (data) {
        console.log(data);
    });
```

## Axios 发起 GET/DELETE 请求以及传参

```js
axios.get('http://localhost:3000/axios', {
    params: {
        id: 789
    }
}).then(function(res){
    // 真正后端响应的数据，在 res.data 里面，是 axios 固定的用法
    console.log(res.data)
});
```

## Axios 发起 POST/PUT 请求以及传参

```js
// 会转成 application/json 格式去传递
axios.post('http://localhost:3000/axios', {
    uname: 'lisi',
    pwd: 123
}).then(function(ret){
    console.log(ret.data)
});
```

```js
// 会转成 application/x-www-form-urlencoded 格式去传递
const params = new URLSearchParams();
params.append('uname', 'zhangsan');
params.append('pwd', '111');
axios.post('http://localhost:3000/axios', params).then(function (ret) {
    console.log(ret.data)
})
```

## 拦截器

```js
// 请求拦截器，请求发送之前会经过这里
axios.interceptors.request.use(function(config) {
    config.headers.Authorization = localStorage.getItem('token');
    return config;
});
// 响应拦截器，内容到达之前可以提前进行处理
axios.interceptors.response.use(function(res) {
    let data = res.data;
    return data;
});

axios.get('http://localhost:3000/adata').then(function(data){
    console.log(data)
});
```

## Async/Await

Async/Await 也是用来处理异步的，使用的时候基于 Promise，它最大的意义在于可以**以同步的方式写异步的代码！**

```js
axios.defaults.baseURL = 'http://localhost:3000';

// 之所以可以在 then 之后拿到结果，是因为 axios 内部做了这样一个操作 resolve(res)
/* axios.get('adata').then(function (res) {
    console.log(res.data)
}); */

// 1. await 必须放 async 函数里面，语法要求
// 2. await 后面一般都要跟一个 Promise，await 之后的返回值就是这个 Promise resolve 的结果
// 3. 用 async 修饰的函数是异步函数，异步函数调用完毕的返回值是 Promise
/* async function queryData() {
    const res = await axios.get('adata');
    console.log(res);
}
queryData(); */

// 函数封装原则之一：不要替调用者决定做什么事情！
async function queryData() {
    const res = await axios.get('adata');
    return res;
    // 上面写法，相当于内部会有下面的包装
    // return Promise.resolve(res);
}
queryData().then(r => {
    console.log(r);
});
```

改写 Promise

```js
function queryData(url) {
    return new Promise(function (resolve, reject) {
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
/* queryData('http://localhost:3000/data').then(data => {
    console.log(data);
    // 这一步 return 的结果会当作外层 then 的返回值
    return queryData('http://localhost:3000/data1');
}).then(data => {
    console.log(data);
    // 这一步 return 的结果会当作外层 then 的返回值
    return queryData('http://localhost:3000/data2');
}).then(data => {
    console.log(data);
}); */

/* async function run() {
    // await 之后的返回值，就是这个 Promise resolve 的结果
    // await 必须会等待当前代码执行完毕，才会往后继续
    let r1 = await queryData('http://localhost:3000/data');
    let r2 = await queryData('http://localhost:3000/data1');
    let r3 = await queryData('http://localhost:3000/data2');
    console.log(r1, r2, r3);
}
run(); */

;(async () => {
    let r1 = await queryData('http://localhost:3000/data');
    let r2 = await queryData('http://localhost:3000/data1');
    let r3 = await queryData('http://localhost:3000/data2');
    console.log(r1, r2, r3);
})();
```

## 睡眠函数

```js
// 需求：等一段时间再往后面执行代码
// 等到 time 时间就会成功，就会调用 resolve
const sleep = time => new Promise((resolve, reject) => setTimeout(resolve, time));
; (async () => {
    // await 必须要等到 Promise resolve 的结果，才会继续往下
    await sleep(3000);
    console.log(1);
})();
```

## 如何捕获async/await的错误

```js
const p = new Promise((resolve, reject) => {
    reject(new Error('失败啦'));
});
/* p.then(() => {}, err => {
    console.log(err.message);
}); */

/* p.then(() => {}).catch(err => {
    console.log(err.message);
}); */

// 可以通过 try catch 捕获同步代码的错误
; (async () => {
    try {
        // 把可能发生错误的代码放到 try 里面
        const r = await p;
    } catch (err) {
        console.log(err.message);
    }
})();
```

## 增删改查

1\. 先封装一个获取列表并渲染的接口（queryData）

2\. 后续所有增、删、改，只需要调用对应的接口，成功之后再此调用 queryData