const path = require('path')
// 导入 html 文件 解析托管包
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html', // 创建了一个 index.html 托管到内存中
  filename: 'index.html'
})

module.exports = {
  // 规定 webpack 配置 环境类型 是开发依赖还是生产包
  mode: 'development',
  // 配置 babel 解析js文件的 入口和出口及文件名
  entry: { path: path.join(__dirname, '/src/index.js') },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'haha.js'
  },
  // 内存中托管 index.html 文件
  plugins: [htmlPlugin], //添加到配置文件中
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
        use: ['style-loader', 'css-loader']
      },
      // 解析 less 文件
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      // 解析 sass 文件
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}
