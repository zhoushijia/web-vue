// 默认导出
// import m1, { ab, doSome } from './m1.js'
// 默认导出 和 按需导出
import m1, { ab, ac, doSome } from './m1.js'
// 加载缓存机制
// import m2 from './m2.js'
import './m2.js'
import './m2.js'

console.log(m1)
// console.log(ab)
// console.log(ac)
// doSome()
// m1.show()
// doSome()
