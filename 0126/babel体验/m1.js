const a = 1
const b = ['a', 'b', 'c']
const c = 'dadada'

function show() {
  console.log(222)
}

//  必须这么写
// export.default={} // 错误写法
export default {
  a,
  b,
  c,
  show
}

export let ab = 'ab'
export let ac = 'ac'
export function doSome() {
  console.log('doSome')
}
