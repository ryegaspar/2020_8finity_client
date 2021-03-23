export const state = () => ({
	categories: [],
})

export const getters = {
	categories(state) {
		return state.categories
	},
}

export const actions = {
	async getCategories({commit, rootGetters}) {
		let response = await this.$axios.$get(`admin/categories`)

		let total = response.data.data

		commit('SET_SUMMARY1', {total})
	}
}

export const mutations = {
	SET_CATEGORIES(state, {categories}) {
		state.categories = categories
	},
}
