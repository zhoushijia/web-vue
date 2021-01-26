const path = require('path')
// 导入 html 文件 解析托管包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html', // 创建了一个 index.html 托管到内存中
  filename: 'index.html'
})
// 导入 vue 组件解析构造函数
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 规定 webpack 配置 环境类型 是开发依赖还是生产包
  mode: 'development',
  // 配置 js文件的 入口和出口及文件名
  entry: { path: path.join(__dirname, '/src/index.js') },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'haha.js'
  },
  // 内存中托管 index.html 文件
  plugins: [htmlPlugin, new VueLoaderPlugin()], //添加到配置文件中
  // 配置 服务器 ip 端口 默认浏览器打开
  devServer: {
    open: true,
    port: 8888,
    host: '127.0.0.1'
  },
  // 配置样式加载
  module: {
    rules: [
      // 解析 css 文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      // 解析 less 文件
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      },
      // 解析 sass 文件
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      },
      // 解析 文件 类型
      {
        test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,
        use: 'url-loader?limit=16940'
      },
      // 解析js
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/ // 除去 node_modules 文件夹的js文件
      },
      // 解析 vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}
