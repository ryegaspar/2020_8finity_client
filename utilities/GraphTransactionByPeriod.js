import {chain, sumBy} from "lodash"
import {DateTime} from "luxon"

export default class GraphTransactionByPeriod {
	#transactions
	#transactionObject
	#combinedKeys

	constructor(transactions, period) {
		this.#transactions = transactions
		this.period = period

		if (this.#transactions)
			this.#prepareData()
	}

	get keys() {
		return this.#combinedKeys
	}

	getValues(type) {
		return this.#combinedKeys.map((i) => {
			const item = this.#transactionObject[type].find((o) => o.id === i)

			return item ? item['amount'] : 0
		})
	}

	#prepareData() {
		const types = ['income', 'expense']

		let sortMethod, dateFormat
		this.#transactionObject = {}

		types.forEach((type) => {
			const categorizedTransactions = this.#transactions.filter((o) => o['category_type'] === type)

			if (this.period === 'daily') {
				dateFormat = "yyyy-MM-dd"
				sortMethod = (a, b) => new Date(a) - new Date(b)
			} else if (this.period === 'weekly') {
				dateFormat = "kkkk-WW"
				sortMethod = (a, b) => a.toString().localeCompare(b.toString())
			} else {
				dateFormat = "yyyy-MM-01"
				sortMethod = (a, b) => new Date(a) - new Date(b)
			}

			/* creates an object:
				transactions = {income: [...values], expense: [...values]}
			 */
			Object.defineProperty(this.#transactionObject, type,
				{
					value: this.#groupByDateFormat(categorizedTransactions, dateFormat).value()
				})
		})

		const t = types.map((type) => this.#transactionObject[type])
			.flat()
			.map((o) => o.id)

		this.#combinedKeys = [...new Set(t)].sort(sortMethod)
	}

	#groupByDateFormat(data, dateFormat) {
		return chain(data)
			.groupBy(result => DateTime.fromISO(result.date, {setZone: true}).toFormat(dateFormat))
			.map((o, id) => ({
				id,
				amount: Math.abs(sumBy(o, 'amount') / 100)
			}))
			.slice(0, 50)
			.reverse()
	}
}
