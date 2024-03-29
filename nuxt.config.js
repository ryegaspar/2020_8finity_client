import webpack from 'webpack'

export default {
	/*
	** Nuxt rendering mode
	** See https://nuxtjs.org/api/configuration-mode
	*/
	ssr: false, //spa
	/*
	** Nuxt target
	** See https://nuxtjs.org/api/configuration-target
	*/
	target: 'server',
	/*
	** Headers of the page
	** See https://nuxtjs.org/api/configuration-head
	*/
	head: {
		title: process.env.APP_NAME || '',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: process.env.APP_NAME || ''}
		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
		]
	},
	/*
	** Global CSS
	*/
	css: [],
	/*
	** Plugins to load before mounting the App
	** https://nuxtjs.org/guide/plugins
	*/
	plugins: [
		'@/plugins/vue_promise_btn',
		'@/plugins/v_click_outside',
		'@/plugins/vue-datetime',
		'@/plugins/axios',
		'@/plugins/vue_js_modal',
	],
	/*
	** Auto import components
	** See https://nuxtjs.org/api/configuration-components
	*/
	components: [
		'~/components/',
		'~/components/charts/',
		'~/components/dashboard/',
	],
	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		// Doc: https://github.com/nuxt-community/nuxt-tailwindcss
		'@nuxtjs/tailwindcss',
		'@nuxtjs/fontawesome',
		'@nuxtjs/dotenv'
	],
	/*
	** Nuxt.js modules
	*/
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		// '@nuxtjs/dotenv',
		'@nuxtjs/auth',
		'vue-toastification/nuxt',
		'@nuxtjs/robots'
	],

	auth: {
		strategies: {
			local: {
				endpoints: {
					login: {
						url: '/admin/login',
						method: 'post'
					},
					logout: {
						url: '/admin/logout',
						method: 'post'
					},
					user: {
						url: '/admin',
						method: 'get',
						propertyName: false,
					}
				},
				tokenRequired: false,
				tokenType: false
			},
		},
		redirect: {
			login: '/login',
			home: '/'
		},
		localStorage: false
	},
	/*
	** Axios module configuration
	** See https://axios.nuxtjs.org/options
	*/
	axios: {
		baseURL: process.env.BASE_URL + '/',
		credentials: true
	},

	fontawesome: {
		icons: {
			solid: true,
			brands: true
		}
	},
	/*
	** Build configuration
	** See https://nuxtjs.org/api/configuration-build/
	*/
	build: {
		plugins: [
			new webpack.ProvidePlugin({
				_: 'lodash'
			})
		]
	},

	router: {
		middleware: ['auth']
	},

	robots: {
		UserAgent: '*',
		Disallow: '/'
	}
}
