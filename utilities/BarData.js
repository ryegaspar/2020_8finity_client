import {chain, sumBy} from "lodash"
import {DateTime} from "luxon"

export default class BarData {
	constructor(transactions, period) {
		this.transactions = transactions
		this.period = period

		if (this.transactions)
			this.prepareData()
	}

	prepareData() {
		const types = ['income', 'expense']

		let sortCallback, dateFormat
		const transactions = {}

		types.forEach((type) => {
			const categorizedTransactions = this.transactions.filter((o) => o['category_type'] === type)

			if (this.period === 'daily') {
				dateFormat = "yyyy-MM-dd"
				sortCallback = (a, b) => new Date(a) - new Date(b)
			} else if (this.period === 'weekly') {
				dateFormat = "kkkk-WW"
				sortCallback = (a, b) => a.toString().localeCompare(b.toString())
			} else {
				dateFormat = "yyyy-MM-01"
				sortCallback = (a, b) => new Date(a) - new Date(b)
			}

			/* creates an object:
				transactions = {income: [...values], expense: [...values]}
			 */
			Object.defineProperty(transactions, type,
				{
					value: this.groupByDateFormat(categorizedTransactions, dateFormat).value()
				})
		})

		this.mapKeys(transactions, sortCallback)
	}

	groupByDateFormat(data, dateFormat) {
		return chain(data)
			.groupBy(result => DateTime.fromISO(result.date, {setZone: true}).toFormat(dateFormat))
			.map((o, id) => ({
				id,
				amount: Math.abs(sumBy(o, 'amount') / 100)
			}))
			.slice(0, 50)
			.reverse()
	}

	mapKeys(values, sortCallback) {
		this.keys = [
			...new Set(
				[
					...(values.income).map(t => t.id),
					...(values.expense).map(t => t.id)
				]
			)]
			.sort(sortCallback)

		this.income = this.keys.map((i) => {
			const item = values.income.find((o) => o.id === i)

			return item ? item['amount'] : 0
		})

		this.expense = this.keys.map((i) => {
			const item = values.expense.find((o) => o.id === i)

			return item ? item['amount'] : 0
		})
	}
}
