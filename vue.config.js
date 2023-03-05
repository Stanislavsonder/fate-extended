const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: process.env.NODE_ENV === 'production' ? '/fate-extended-character-sheet/' : '/',
	pwa: {
		name: 'FATE: Extended Character Sheet',
		themeColor: '#181818',
		msTileColor: '#FFFFFF',
		appleMobileWebAppCapable: 'yes',
		skipWaiting: true,
		clientsClaim: true,
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/app/serviceWorkers/service-worker.js'
		}
	},
	chainWebpack: config => {
		config.entry('app').clear()
		config.entry('app').add('./src/app/index.scss').add('./src/app/index.ts').end()
	},
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "./src/app/styles/media.scss";
						 `
			}
		}
	}
})
