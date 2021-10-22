<template>
	<div class="bg-gray-900 border border-gray-800 rounded shadow">
		<div class="border-b border-gray-800 p-3">
			<h5 class="font-bold uppercase text-gray-600">Expenses By Category</h5>
		</div>
		<div class="p-5">
			<horizontal-bar-chart :data=expensesByPeriodData :options=options :height="200"/>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex'
import {chain, sumBy} from "lodash"

export default {
	computed: {
		...mapGetters({
			transactions: 'dashboard_transactions/transactions'
		}),

		expensesByPeriodData() {
			const transactions = chain(this.transactions)
				.filter((o) => o['category_type'] === 'expense')
				.groupBy((o) => o['category_name'])
				.map((o, id) => ({
					categoryName: id,
					amount: Math.abs(sumBy(o, 'amount') / 100)
				}))
				.sort((a, b) => b.amount - a.amount)
				.slice(0, 10)

			const label = transactions.map(t => t.categoryName)
			const amount = transactions.map(t => t.amount)

			return {
				labels: label.value(),
				datasets: [
					{
						data: amount.value(),
						fill: false,
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(201, 203, 207, 0.2)",
							"rgba(66, 153, 225, 0.2)",
							"rgba(229, 62, 62, 0.2)",
							"rgba(90, 103, 216, 0.2)"
						],
						borderColor: [
							"rgb(255, 99, 132)",
							"rgb(255, 159, 64)",
							"rgb(255, 205, 86)",
							"rgb(75, 192, 192)",
							"rgb(54, 162, 235)",
							"rgb(153, 102, 255)",
							"rgb(201, 203, 207)",
							"rgb(66, 153, 255)",
							"rgb(229, 62, 62)",
							"rgb(90, 103, 216)"
						],
						borderWidth: 1
					}
				]
			}
		},

		options() {
			return {
				tooltips: {
					mode: 'index',
					axis: 'y'
				},
				legend: {
					display: false
				}
			}
		}
	}
}
</script>
