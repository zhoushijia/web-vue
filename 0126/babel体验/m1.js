const a = 1
const b = ['a', 'b', 'c']

function show() {
  console.log(222)
}

//  必须这么写
// export.default={} // 错误写法
export default {
  a,
  b,
  show
}

export let ab = 'ab'
export let ac = 'ac'
export let doSome = () => {
  console.log('doSome')
}
