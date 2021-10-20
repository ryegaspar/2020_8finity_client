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
					>
						<span class="text-gray-400 mr-3">{{ periodSelected }}</span>
						<svg class="fill-current w-4" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 20 20">
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
						</svg>
					</button>
					<transition
						enter-active-class="transition ease-out duration-500 transform"
						enter-class="opacity-0 scale-95"
						enter-to-class="opacity-100 scale-100"
						leave-active-class="transition ease-in duration-75 transform"
						leave-class="opacity-100 scale-100"
						leave-to-class="opacity-0 scale-95"
					>
						<div class="border border-gray-800 rounded absolute mt-1 z-10 right-0"
							 v-if="menuActive"
							 v-click-outside="() => menuActive = false"
						>
							<div class="py-1 bg-gray-900 rounded">
								<a href="#"
								   class="hover:bg-gray-400 py-1 px-2 block hover:text-gray-900"
								   v-for="menu in selections"
								   :key="menu"
								   @click="select(menu)"
								>
									{{ menu }}
								</a>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
		<div class="p-5" v-if="!isLineGraph && !isMobile">
			<bar-chart :data="barData" :options="cashFlowBarOptions" :height="150" ref="barChart"/>
		</div>
		<div class="p-5" v-if="isLineGraph || isMobile">
			<line-chart :data="lineData" :options="cashFlowLineOptions" :height="lineChartHeight" ref="lineChart"/>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import BarData from "~/utilities/BarData"

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

			isMobile: window.innerWidth < 600,

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
		addEventListener('resize', () => this.isMobile = innerWidth < 600)
	},

	computed: {
		...mapGetters({
			periodSelected: 'dashboard_transactions/periodSelected',
			transactions: 'dashboard_transactions/transactions'
		}),

		barData() {
			if (!this.transactions) return

			const barData = new BarData(this.transactions, this.periodSelected)

			return {
				labels: barData.keys,
				datasets: [
					{
						label: 'Income',
						data: barData.income,
						backgroundColor: '#38a169'
					},
					{
						label: 'Expense',
						data: barData.expense,
						backgroundColor: '#dd6c20'
					},
				]
			}
		},

		lineData() {
			if (!this.transactions) return

			const barData = new BarData(this.transactions, this.periodSelected)

			return {
				labels: barData.keys,
				datasets: [
					{
						label: "Income",
						data: barData.income,
						fill: false,
						borderColor: "#38a169",
						lineTension: 0.1
					},
					{
						label: "Expense",
						data: barData.expense,
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
		}),

		select(item) {
			this.selectPeriod(item)
			this.menuActive = false
		},
	},
}
</script>
