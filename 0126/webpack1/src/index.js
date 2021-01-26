import $ from 'jquery'

// 导入解析 css
import './css/1.css'
// 导入解析 less
// import './less/1.less'
// 导入解析 sass
// import './sass/1.scss'
import Vue from 'vue'
import App from './components/App.vue'

const vm = new Vue({
  el: '#app',
  render: (fn) => fn(App)
})

class Person {
  static info = 'hello'
}
console.log(Person.info)

$(function () {
  $('ul li:odd').css('background', 'red')
  $('ul li:even').css('background', 'skyblue')
})
