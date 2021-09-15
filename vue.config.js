module.exports = {
  publicPath: '/dq-todo/',
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
