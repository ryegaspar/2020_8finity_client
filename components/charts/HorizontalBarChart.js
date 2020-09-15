import {HorizontalBar} from 'vue-chartjs'

export default {
	extends: HorizontalBar,

	props: ['data', 'options'],

	mounted() {
		this.renderChart(this.data, this.options)
	},

	watch: {
		data() {
			this.renderChart(this.data, this.options)
		}
	}
}
