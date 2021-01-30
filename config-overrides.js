// Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra
const antdTheme = require('./src/theme.js')
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addDecoratorsLegacy,
  addWebpackAlias
} = require('customize-cra')
const path = require('path')

module.exports = override(
  addDecoratorsLegacy(),
  useEslintRc(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antdTheme,
  }),
  addWebpackAlias({
    ['@components']: path.resolve(__dirname, './src/components'),
    ['@constants']: path.resolve(__dirname, './src/constants'),
    ['@containers']: path.resolve(__dirname, './src/containers'),
    ['@core']: path.resolve(__dirname, './src/core'),
    ['@layout']: path.resolve(__dirname, './src/layout'),
    ['@locales']: path.resolve(__dirname, './src/locales'),
    ['@redux']: path.resolve(__dirname, './src/redux'),
    ['@router']: path.resolve(__dirname, './src/router.js'),
    ['@config']: path.resolve(__dirname, './src/config.js'),
    ['@costom.scss']: path.resolve(__dirname, './src/costom.scss'),
    ['@index']: path.resolve(__dirname, './src/index.js'),
  })
)
