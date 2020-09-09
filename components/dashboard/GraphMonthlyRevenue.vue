<template>
	<div class="bg-gray-900 border border-gray-800 rounded shadow">
		<div class="border-b border-gray-800 p-3">
			<h5 class="font-bold uppercase text-gray-600">Monthly Revenue</h5>
		</div>
		<div class="p-5">
				<bar-chart :data="revenueBarData" :options="revenueBarOptions" :height="200"/>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
	mounted() {
		this.getTransactionsLastFiveMonths()
	},

	computed: {
		...mapGetters({
			revenuePerMonth: 'dashboard_transactions/revenuePerMonth'
		}),

		revenueBarData() {
			return {
				labels: this.revenuePerMonth.label,
				datasets: [
					{
						label: 'Income',
						data: this.revenuePerMonth.values,
						backgroundColor: "rgba(255, 205, 86, 0.2)",
						borderColor: "rgb(255, 205, 86)",
						borderWidth: 1
					}
				]
			}
		},

		revenueBarOptions() {
			return {
				responsive: true,
				legend: {
					display: false,
				},
				tooltips: {
					backgroundColor: '#17BF62'
				},
				scales: {
					xAxes: [
						{
							gridLines: {
								display: false
							}
						}
					],
					yAxes: [
						{
							ticks: {
								beginAtZero: true
							},
							gridLines: {
								display: false
							}
						}
					]
				}
			}
		},
	},

	methods: {
		...mapActions({
			getTransactionsLastFiveMonths: 'dashboard_transactions/getTransactionsLastFiveMonths'
		})
	}
}
</script>
