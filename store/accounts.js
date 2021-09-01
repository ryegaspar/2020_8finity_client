export const state = () => ({
	accounts: [],
})

export const getters = {
	accounts(state) {
		return state.accounts
	},
}

export const actions = {
	async getAccounts({commit, rootGetters}) {
		let response = await this.$axios.$get(`admin/accounting/accounts?active`)

		let accounts = response.data

		commit('SET_ACCOUNTS', {accounts})
	}
}

export const mutations = {
	SET_ACCOUNTS(state, {accounts}) {
		state.accounts = accounts
	},
}
