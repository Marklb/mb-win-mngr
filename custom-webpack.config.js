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



// TODO: Experiment with this config to see if it or similar can fix some native
// module issues I can into with angular-cli build.

// export const electronConfig = {
//   target: 'electron-renderer',
//   node: {
//       __dirname: false,
//   },
//   module: {
//       rules: [
//           {
//               test: /\.node$/,
//               use: 'node-loader'
//           }
//       ]
//   }
// };
