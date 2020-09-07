export const state = () => ({
	summaryIncome: 0,
	summaryExpense: 0,
	summaryTotal: 0
})

export const getters = {
	summaryIncome(state) {
		return state.summaryIncome
	},

	summaryExpense(state) {
		return state.summaryExpense
	},

	summaryTotal(state) {
		return state.summaryTotal
	}
}

export const actions = {
	async updateSummary({commit, rootGetters}) {
		let response = await this.$axios.$get(`transactions/summary?start_date=${rootGetters['dashboard_date_select/startDate']}&end_date=${rootGetters['dashboard_date_select/endDate']}`)

		let total = response.data.total.amount
		let income = response.data.income.amount
		let expense = response.data.expense.amount

		commit('SET_SUMMARY', {total, income, expense})
	}
}

export const mutations = {
	SET_SUMMARY(state, {total, income, expense}) {
		state.summaryTotal = total
		state.summaryIncome = income
		state.summaryExpense = expense
	},
}
