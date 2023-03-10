module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'plugin:vue/recommended',
		'plugin:prettier-vue/recommended'
	],
	parserOptions: {
		ecmaVersion: 2020
	},
	rules: {
		'no-console': 'warn',
		'no-debugger': 'warn',
		quotes: ['warn', 'single'],
		semi: ['warn', 'never'],
		indent: ['warn', 'tab'],
		'vue/multi-word-component-names': 'off',
		'vue/no-multiple-template-root': 'off',
		'vue/no-v-model-argument': 'off',
		'vue/order-in-components': [
			'warn',
			{
				order: [
					'el',
					'name',
					'key',
					'parent',
					'functional',
					['delimiters', 'comments'],
					['components', 'directives', 'filters'],
					'extends',
					'mixins',
					'emits',
					['provide', 'inject'],
					'ROUTER_GUARDS',
					'layout',
					'middleware',
					'validate',
					'scrollToTop',
					'transition',
					'loading',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'setup',
					'asyncData',
					'data',
					'fetch',
					'head',
					'computed',
					'watch',
					'watchQuery',
					'LIFECYCLE_HOOKS',
					'methods',
					['template', 'render'],
					'renderError'
				]
			}
		],
		'prettier-vue/prettier': [
			'warn',
			{
				printWidth: 120,
				singleQuote: true,
				semi: false,
				trailingComma: 'none',
				useTabs: true,
				tabWidth: 3,
				singleAttributePerLine: true,
				jsxSingleQuote: true,
				arrowParens: 'avoid',
				bracketSameLine: true
			}
		]
	}
}
