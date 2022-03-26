/*
 * @Author: Harry
 * @Date: 2021-12-26 15:38:35
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-03-25 12:10:22
 * @FilePath: \vant-u\vue.config.js
 */
/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-11 10:13:01
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-28 13:55:19
 * @LastEditors: Harry
 */
// vue.config.js
const path = require('path')
// 定制主题
const webpack = require('webpack')
const themePath = path.join(__dirname, './src/assets/css/themevars.less')
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: './', // 文件加载设置为相对路径
  outputDir: './medicine/static/',
  // lintOnSave: false, // 关闭eslint
  // productionSourceMap: true, // 生产环境下css 分离文件
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '中草药害虫识别'
        return args
      })
    if (process.env.NODE_ENV === 'pro') {
      config.plugin('compressionPlugin')
        .use(new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 5,
          minChunkSize: 100
        }))
    }
  },
  devServer: {
    open: false, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    proxy: {
      '/v1': {
        target: 'http://127.0.0.1:5051/', // 对应自己的接口，代理地址修改后必须重启项目
        // target: 'http://2e3e-60-223-236-230.ngrok.io', // 对应自己的接口，代理地址修改后必须重启项目
        // target: 'https://detect.mr90.top/', //对应自己的接口，代理地址修改后必须重启项目
        changeOrigin: true, // 是否允许跨域
        pathRewrite: {
          // 重写路径，当我们在浏览器中看到请求的地址为：http://localhost:8080/api/user/userInfo 时
          // 实际上访问的地址是：http://192.168.1.249:9527/user/userInfo,因为重写了 /api
          '^/v1': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 直接覆盖变量
          // 'text-color': '#111',
          // 'border-color': '#eee',
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import "${themePath}";`
        }
      }
    }
  }
}
