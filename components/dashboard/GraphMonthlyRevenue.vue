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
import {chain, sumBy} from "lodash"
import {DateTime} from "luxon"

export default {
	data() {
		return {
			revenueBarOptions: {
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
		}
	},

	activated() {
		this.getTransactionsLastFiveMonths()
	},

	computed: {
		...mapGetters({
			transactionsLastFiveMonths: 'dashboard_transactions/transactionsLastFiveMonths'
		}),

		revenueBarData() {
			const sumRevenueMonth = chain(this.transactionsLastFiveMonths)
				.groupBy(result => DateTime.fromISO(result.date, {setZone: true}).toFormat("yyyy-MM-01"))
				.map((o, id) => ({
					monthYear: id,
					amount: sumBy(o, (o) => parseInt(o.amount)) / 100
				}))
				.sort((a, b) => new Date(b.monthYear) - new Date(a.monthYear))
				.reverse()

			const label = sumRevenueMonth.map(t => t.monthYear)
			const amount = sumRevenueMonth.map(t => t.amount)

			return {
				labels: label.value(),
				datasets: [
					{
						label: 'Income',
						data: amount.value(),
						backgroundColor: "rgba(255, 205, 86, 0.2)",
						borderColor: "rgb(255, 205, 86)",
						borderWidth: 1
					}
				]
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
