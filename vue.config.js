const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
      ? '/fate-extended-character-sheet/' : '/',
  pwa: {
    name: 'FATE: Extended Character Sheet',
    themeColor: "#181818",
    msTileColor: "#FFFFFF",
    appleMobileWebAppCapable: 'yes'
  },
  configureWebpack: {

  }

})
