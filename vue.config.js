/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-11-11 10:13:01
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-12-26 16:21:55
 * @LastEditors: Harry
 */
// vue.config.js
const path = require('path')
module.exports = {
  publicPath: './', // 文件加载设置为相对路径
  outputDir: `dist-${process.env.NODE_ENV}`,
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
        args[0].title = '中草药识别'
        return args
      })
  }
}
