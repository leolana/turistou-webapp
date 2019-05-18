// Overriding CreateReactApp settings, ref: https://github.com/arackaf/customize-cra
const antdTheme = require('./src/theme.js')
const {
  override,
  fixBabelImports,
  addLessLoader,
  useEslintRc,
  addDecoratorsLegacy,
  addBabelPresets
} = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy(),
  useEslintRc(),
  fixBabelImports('import', {
    libraryName: 'antd', libraryDirectory: 'es', style: true
  }),
  ...addBabelPresets([
    "@babel/preset-flow",
  ]),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: antdTheme
  })
)
