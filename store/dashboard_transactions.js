import {sumBy, chain} from 'lodash'
import {DateTime} from 'luxon'
import {weekNumberSun} from 'weeknumber'

export const state = () => ({
	periodSelected: 'daily',
	transactions: 0,
})

export const getters = {
	transactions(state) {
		return state.transactions
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
}

export const actions = {
	async updateTransactions({commit, rootGetters}) {
		let response = await this.$axios.$get(`transactions?start_date=${rootGetters['dashboard_date_select/startDate']}&end_date=${rootGetters['dashboard_date_select/endDate']}`)

		commit('SET_TRANSACTIONS', response.data)
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
	}
}
