/*
 * @Author: Harry
 * @Date: 2021-12-26 15:38:35
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-15 00:00:13
 * @FilePath: \vant-u\vue.config.js
 */
// vue.config.js
const path = require('path')
// 定制主题
const webpack = require('webpack')
const themePath = path.join(__dirname, './src/assets/css/themevars.less')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// 引入分析包文件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// new BundleAnalyzerPlugin({
//   analyzerMode: 'server',
//   analyzerHost: '127.0.0.1',
//   analyzerPort: 8888,
//   reportFilename: 'report.html',
//   defaultSizes: 'parsed',
//   openAnalyzer: true,
//   generateStatsFile: false,
//   statsFilename: 'stats.json',
//   statsOptions: null,
//   logLevel: 'info'
// })
module.exports = {
  publicPath: './', // 文件加载设置为相对路径
  outputDir: './medicine/static/',
  productionSourceMap: process.env.NODE_ENV !== 'pro',
  // lintOnSave: false, // 关闭eslint
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false // 不删除源文件
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5,
        minChunkSize: 100
      })
    ]
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'pro') {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
      const externals = {
        // vue: 'Vue',
        // 'vue-router': 'VueRouter',
        // vuex: 'Vuex',
        axios: 'axios',
        echarts: 'echarts',
        html2canvas: 'html2canvas'
      }
      config.externals(externals)

      // 在html文件中引入相关CDN
      const cdn = {
        css: [
          // vant css
          // 'https://cdn.jsdelivr.net/npm/vant@3/lib/index.css'
        ],
        js: [
          // vue
          // 'https://cdn.bootcdn.net/ajax/libs/vue/3.0.0/vue.global.prod.js',
          // vue-router
          // 'https://cdn.staticfile.org/vue-router/4.0.0/vue-router.global.min.js',
          // vuex
          // 'https://cdn.staticfile.org/vuex/4.0.0/vuex.global.min.js',
          // // vant
          // 'https://cdn.jsdelivr.net/npm/vant@3/lib/vant.min.js',
          // axios
          'https://cdn.staticfile.org/axios/0.24.0/axios.min.js',
          // echarts
          'https://cdn.staticfile.org/echarts/5.2.2/echarts.min.js',
          'https://cdn.bootcdn.net/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
        ]
      }
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn
          return args
        })
    }
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '中草药害虫识别'
        return args
      })
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
