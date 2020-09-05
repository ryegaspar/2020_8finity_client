import {presets} from '@/constants/date_presets'

export const state = () => ({
	selected: presets[0],
	startDate: presets[0].start,
	endDate: presets[0].end,
	summaryIncome: 0,
	summaryExpense: 0,
	summaryTotal: 0
})

export const getters = {
	selected(state) {
		return state.selected
	},

	startDate(state) {
		return state.startDate
	},

	endDate(state) {
		return state.endDate
	},

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
	changeSelectedPreset({commit, dispatch}, selected) {

		commit('SET_SELECTED', selected)

		if (selected.name !== 'custom') {
			commit('SET_START_DATE', selected.start)
			commit('SET_END_DATE', selected.end)
		} else {
			commit('SET_START_DATE', presets[0].start)
			commit('SET_END_DATE', presets[0].end)
		}

		dispatch('updateSummary')
	},

	updateStartDate({commit, dispatch}, date) {
		commit('SET_START_DATE', date)

		dispatch('updateSummary')
	},

	updateEndDate({commit, dispatch}, date) {
		commit('SET_END_DATE', date)

		dispatch('updateSummary')
	},

	async updateSummary({commit, getters}) {
		let response = await this.$axios.$get(`transactions/summary?start_date=${getters.startDate}&end_date=${getters.endDate}`)

		let total = response.data.total.amount
		let income = response.data.income.amount
		let expense = response.data.expense.amount

		commit('SET_SUMMARY', {total, income, expense})
	}
}

export const mutations = {
	SET_SELECTED(state, selected) {
		state.selected = selected
	},

	SET_START_DATE(state, startDate) {
		state.startDate = startDate
	},

	SET_END_DATE(state, endDate) {
		state.endDate = endDate
	},

	SET_SUMMARY(state, {total, income, expense}) {
		state.summaryTotal = total
		state.summaryIncome = income
		state.summaryExpense = expense
	},
}
