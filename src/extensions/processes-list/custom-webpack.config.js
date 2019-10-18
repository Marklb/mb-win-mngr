const webpack = require('webpack')

module.exports = (config, options) => {
  config.target = 'electron-renderer'
  // console.log(config.resolve.mainFields)
  // console.log(options)

  // config.plugins.push(
  //   new webpack.DefinePlugin({
  //     'APP_VERSION': JSON.stringify(pkg.version),
  //   }),
  // )

  return config
}
