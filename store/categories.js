import {chain} from 'lodash'

export const state = () => ({
	categories: [],
})

export const getters = {
	categories(state) {
		return state.categories
	},

	incomeCategory(state) {
		return state.categories.filter((c) => c.type === 'income')
	},

	expenseCategory(state) {
		return state.categories.filter((c) => c.type === 'expense')
	}
}

export const actions = {
	async getCategories({commit, rootGetters}) {
		let response = await this.$axios.$get(`admin/categories/?all`)

		let categories = response.data

		commit('SET_CATEGORIES', {categories})
	}
}

export const mutations = {
	SET_CATEGORIES(state, {categories}) {
		state.categories = categories
	},
}
