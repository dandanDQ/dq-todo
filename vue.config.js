module.exports = {
  publicPath: '/dq-todo/',
  lintOnSave: process.env.NODE_ENV === 'development',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Fan & Bao TODO'
        return args
      })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
}
