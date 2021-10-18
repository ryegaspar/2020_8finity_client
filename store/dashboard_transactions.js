import {DateTime} from 'luxon'

export const state = () => ({
	transactions: 0,
	transactionsLastFiveMonths: 0,
	periodSelected: 'daily'
})

export const getters = {
	transactions(state) {
		return state.transactions
	},

	transactionsLastFiveMonths(state) {
		return state.transactionsLastFiveMonths
	},

	periodSelected(state) {
		return state.periodSelected
	},
}

export const actions = {
	async updateTransactions({commit, rootGetters}) {
		let response = await this.$axios.$get(`admin/dashboard/transactions?start_date=${rootGetters['dashboard_date_select/startDate']}&end_date=${rootGetters['dashboard_date_select/endDate']}`)

		commit('SET_TRANSACTIONS', response.data)
	},

	async getTransactionsLastFiveMonths({commit}) {
		let start = DateTime.local().minus({months: 5}).startOf('month').toISODate()
		let end = DateTime.local().endOf('month').toISODate()

		let response = await this.$axios.$get(`admin/dashboard/transactions?start_date=${start}&end_date=${end}`)

		commit('SET_TRANSACTION_LAST_FIVE_MONTHS', response.data)
	},

	updatePeriodSelected({commit}, period) {
		commit('SET_PERIOD_SELECTED', period)
	}
}

export const mutations = {
	SET_TRANSACTIONS(state, payload) {
		state.transactions = payload
	},

	SET_PERIOD_SELECTED(state, period) {
		state.periodSelected = period
	},

	SET_TRANSACTION_LAST_FIVE_MONTHS(state, payload) {
		state.transactionsLastFiveMonths = payload
	}
}
