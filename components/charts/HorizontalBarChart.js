import {HorizontalBar} from 'vue-chartjs'

export default {
	extends: HorizontalBar,

	props: ['data', 'options'],

	watch: {
		data() {
			this.renderChart(this.data, this.options)
		}
	}
}
