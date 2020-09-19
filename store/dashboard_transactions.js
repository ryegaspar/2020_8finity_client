import {sumBy, chain} from 'lodash'
import {DateTime} from 'luxon'
import {weekNumberSun} from 'weeknumber'

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

	transactionsByTypeByPeriod(state) {
		return (type) => {
			let transactions = chain(state.transactions)
				.filter((o) => o['category_type'] === type)

			if (state.periodSelected === 'daily') {
				transactions = transactions
					.groupBy(result => DateTime.fromISO(result.date, {setZone: true}).toISODate())
					.map((o, id) => ({
						date: id,
						amount: sumBy(o, 'amount') / 100
					}))
					.sort((a, b) => new Date(b.date) - new Date(a.date))
					.slice(0, 50)
					.reverse()

				let label = transactions.map(t => t.date)
				let amount = transactions.map(t => t.amount)

				return {
					label: label.value(),
					values: amount.value()
				}

			} else if (state.periodSelected === 'weekly') {
				transactions = transactions
					.groupBy(result => weekNumberSun(new Date(result.date)))
					.map((o, id) => ({
						week: parseInt(id),
						amount: sumBy(o, 'amount') / 100
					}))
					.sort((a, b) => b - a)
					.slice(0, 50)
					.reverse()

				let label = transactions.map(t => t.week)
				let amount = transactions.map(t => t.amount)

				return {
					label: label.value(),
					values: amount.value()
				}

			} else {
				transactions = transactions
					.groupBy(result => DateTime.fromISO(result.date, {setZone: true}).toFormat("yyyy-MM-01"))
					.map((o, id) => ({
						monthYear: id,
						amount: sumBy(o, 'amount') / 100
					}))
					.sort((a, b) => new Date(b.monthYear) - new Date(a.monthYear))
					.slice(0, 50)
					.reverse()

				let label = transactions.map(t => t.monthYear)
				let amount = transactions.map(t => t.amount)

				return {
					label: label.value(),
					values: amount.value()
				}
			}
		}
	},

	expensesByPeriod(state) {
		let transactions = chain(state.transactions)
			.filter((o) => o['category_type'] === 'expense')
			.groupBy((o) => o['category_name'])
			.map((o, id) => ({
				categoryName: id,
				amount: sumBy(o, 'amount') / 100
			}))
			.sort((a, b) => b.amount - a.amount)
			.slice(0, 10)

		let label = transactions.map(t => t.categoryName)
		let amount = transactions.map(t => t.amount)

		return {
			label: label.value(),
			values: amount.value()
		}
	},

	revenuePerMonth(state) {
		let sumRevenueMonth = chain(state.transactionsLastFiveMonths)
			.groupBy(result => DateTime.fromISO(result.date, {setZone: true}).toFormat("yyyy-MM-01"))
			.map((o, id) => ({
				monthYear: id,
				amount: sumBy(o, (o) => o['category_type'] === 'income' ? o.amount : parseInt(o.amount) * -1) / 100
			}))
			.sort((a, b) => new Date(b.monthYear) - new Date(a.monthYear))
			.reverse()

		let label = sumRevenueMonth.map(t => t.monthYear)
		let amount = sumRevenueMonth.map(t => t.amount)

		return {
			label: label.value(),
			values: amount.value()
		}
	}
}

export const actions = {
	async updateTransactions({commit, rootGetters}) {
		let response = await this.$axios.$get(`admin/transactions?start_date=${rootGetters['dashboard_date_select/startDate']}&end_date=${rootGetters['dashboard_date_select/endDate']}`)

		commit('SET_TRANSACTIONS', response.data)
	},

	async getTransactionsLastFiveMonths({commit}) {
		let start = DateTime.local().minus({months: 5}).startOf('month').toISODate()
		let end = DateTime.local().endOf('month').toISODate()

		let response = await this.$axios.$get(`admin/transactions?start_date=${start}&end_date=${end}`)

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
