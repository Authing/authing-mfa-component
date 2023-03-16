const path = require('path')
const rm = require('rimraf')
const webpack = require('webpack')
const webpackEsmBundlerConfig = require('./webpack.config')

try {
  rm.sync(path.resolve(__dirname, '../', 'dist'))
} catch (e) {
  console.error('\n\n build Authing MFA, failed to delete dist directory, please operate manually \n\n')
}

readyGo()

function readyGo () {
  webpack(webpackEsmBundlerConfig, (error) => {
    if (error) {
      console.error('build Authing MFA esm bundler error: ', error)
    }
  })
}
