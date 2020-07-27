const webpack = require('webpack')
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  // chainWebpack: config => {
  //   config.plugins.delete('prefetch')
  // },
  // chainWebpack: config => {
  //   // 发布模式
  //   config.when(process.env.NODE_ENV === 'production', config => {
  //     config
  //       .entry('app')
  //       .clear()
  //       .add('./src/main-prod.js')

  //     config.set('externals', {
  //       vue: 'Vue',
  //       'vue-router': 'VueRouter',
  //       axios: 'axios',
  //       moment: 'moment',
  //       lodash: '_'
  //     })

  //     config.plugin('html').tap(args => {
  //       args[0].isProd = true
  //       return args
  //     })
  //   })

  //   // 开发模式
  //   config.when(process.env.NODE_ENV === 'development', config => {
  //     config
  //       .entry('app')
  //       .clear()
  //       .add('./src/main-dev.js')

  //     config.plugin('html').tap(args => {
  //       args[0].isProd = false
  //       return args
  //     })
  //   })
  // }
  devServer: {
    // host: 'localhost',
    // port: 8080,
    proxy: {
      '/api': {
        // target: 'https://www.f5points.com.tw/api',
        target: 'http://f5point.twczw.website/api',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    },
    // http://localhost:8080/home/#/login
    publicPath: '/home',
    overlay: {
      warnings: false,
      errors: false
    },
  },
  lintOnSave: false,
  chainWebpack: config => {
		config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    }]);
  }
}
