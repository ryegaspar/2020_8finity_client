/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
	purge: [
		'./components/**/*.{vue,js}',
		'./layouts/**/*.vue',
		'./pages/**/*.vue',
		'./plugins/**/*.{js,ts}',
		'./nuxt.config.{js,ts}',
	],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontSize: {
				xxs: ['0.625rem', {lineHeight: '1rem'}]
			}
		},
	},
	variants: {
		extend: {
			opacity: ['disabled'],
			cursor: ['hover', 'disabled']
		},
	},
	plugins: [],
}
