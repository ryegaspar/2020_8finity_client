import Errors from './Errors'

export default class Form {
	constructor(data) {
		this.originalData = data

		for (let field in data) {
			this[field] = data[field]
		}

		this.errors = new Errors()
	}

	data() {
		let data = {}

		for (let property in this.originalData) {
			data[property] = this[property]
		}

		return data
	}

	reset() {
		for (let field in this.originalData) {
			this[field] = this.originalData[field]
		}

		this.errors.clear()
	}

	onSuccess(data) {
		this.reset()
	}

	onFail(errors) {
		this.errors.record(errors.data.errors)
	}
}
