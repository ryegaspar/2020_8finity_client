<template>
	<div class="bg-gray-900 border border-gray-800 rounded shadow">
		<div class="flex justify-between border-b border-gray-800 p-3">
			<h5 class="font-bold uppercase text-gray-600">Cash Flow</h5>
			<div class="relative flex items-center">
				<div class="mr-4 flex items-center text-gray-600" v-show="!isMobile">
					<input type="checkbox"
						   class="h-5 w-5 mr-1"
						   v-model="isLineGraph"
					>
					<span>use line graph</span>
				</div>
				<div>
					<button
						class="relative bg-gray-900 border border-gray-800 text-gray-700 px-3 rounded items-center flex"
						@click="menuActive = !menuActive"
						v-click-outside="() => menuActive = false"
					>
						<span class="text-gray-400 mr-3">{{ periodSelected }}</span>
						<svg class="fill-current w-4" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 20 20">
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
						</svg>
					</button>
					<div class="border border-gray-800 rounded absolute mt-1 z-10 right-0"
						 v-if="menuActive"
					>
						<div class="py-1 bg-gray-900 rounded">
							<a href="#"
							   class="hover:bg-gray-400 py-1 px-2 block hover:text-gray-900"
							   v-for="menu in selections"
							   @click="selectPeriod(menu)"
							>
								{{ menu }}
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="p-5" v-if="!isLineGraph && !isMobile">
			<bar-chart :data="cashFlowBarData" :options="cashFlowBarOptions" :height="150"/>
		</div>
		<div class="p-5" v-if="isLineGraph || isMobile">
			<line-chart :data="cashFlowLineData" :options="cashFlowLineOptions" :height="lineChartHeight"/>
		</div>
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import {mapGetters, mapActions} from 'vuex'

export default {
	data() {
		return {
			selections: [
				'daily',
				'weekly',
				'monthly'
			],

			menuActive: false,

			isLineGraph: false,

			isMobile: window.innerWidth < 400,

			cashFlowBarOptions: {
				responsive: true,
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
			},

			cashFlowLineOptions: {
				responsive: true,
				legend: {
					display: innerWidth > 400
				}
			}
		}
	},

	mounted() {
		addEventListener('resize', () => this.isMobile = innerWidth < 400)
	},

	computed: {
		...mapGetters({
			transactionsByTypeByPeriod: 'dashboard_transactions/transactionsByTypeByPeriod',
			periodSelected: 'dashboard_transactions/periodSelected'
		}),

		incomeByDate() {
			return this.transactionsByTypeByPeriod('income', this.selected)
		},

		expenseByDate() {
			return this.transactionsByTypeByPeriod('expense', this.selected)
		},

		cashFlowBarData() {
			return {
				labels: this.incomeByDate.label,
				datasets: [
					{
						label: 'Income',
						data: this.incomeByDate.values,
						backgroundColor: '#38a169'
					},
					{
						label: 'Expense',
						data: this.expenseByDate.values,
						backgroundColor: '#dd6c20'
					},
				]
			}
		},

		cashFlowLineData() {
			return {
				labels: this.incomeByDate.label,
				datasets: [
					{
						label: "income",
						data: this.incomeByDate.values,
						fill: false,
						borderColor: "#38a169",
						lineTension: 0.1
					},
					{
						label: "expense",
						data: this.expenseByDate.values,
						fill: false,
						borderColor: "#dd6c20",
						lineTension: 0.1

					}
				]
			}
		},

		lineChartHeight() {
			return this.isMobile ? 250 : 150
		}
	},

	methods: {
		...mapActions({
			selectPeriod: 'dashboard_transactions/updatePeriodSelected'
		})
	},

	directives: {
		clickOutside: vClickOutside.directive
	}
}
</script>
