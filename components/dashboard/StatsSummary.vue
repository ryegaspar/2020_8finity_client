<template>
	<div class="flex flex-wrap">
		<div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<!--Metric Card-->
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-blue-600">
							<font-awesome-layers class="fa-2x fa-fw">
								<font-awesome-icon icon="piggy-bank"/>
							</font-awesome-layers>
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">Total Revenue</h5>
						<h3 class="font-bold text-3xl"
							:class="[summaryTotal >= 0 ? 'text-gray-600' : 'text-red-800']"
						>
							{{ summaryTotal < 0 ? '-' : '' }}
							&#8369;
							<i-count-up :endVal="summaryTotal | number_format"
										:options="options"
							/>
						</h3>
					</div>
				</div>
			</div>
			<!--/Metric Card-->
		</div>
		<div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<!--Metric Card-->
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-green-600">
							<font-awesome-layers class="fa-2x fa-fw">
								<font-awesome-icon icon="smile-wink"/>
							</font-awesome-layers>
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">Income</h5>
						<h3 class="font-bold text-3xl"
							:class="[summaryIncome >= 0 ? 'text-gray-600' : 'text-red-800']"
						>
							{{ summaryIncome < 0 ? '-' : '' }}
							&#8369;
							<i-count-up :endVal="summaryIncome | number_format"
										:options="options"
							/>
						</h3>
					</div>
				</div>
			</div>
			<!--/Metric Card-->
		</div>
		<div class="w-full md:w-1/2 xl:w-1/3 p-3">
			<!--Metric Card-->
			<div class="bg-gray-900 border border-gray-800 rounded shadow p-2">
				<div class="flex flex-row items-center">
					<div class="flex-shrink pr-4">
						<div class="rounded p-3 bg-orange-600">
							<font-awesome-layers class="fa-2x fa-fw">
								<font-awesome-icon icon="sad-cry"/>
							</font-awesome-layers>
						</div>
					</div>
					<div class="flex-1 text-right md:text-center">
						<h5 class="font-bold uppercase text-gray-400">Expenses</h5>
						<h3 class="font-bold text-3xl"
							:class="[summaryExpense >= 0 ? 'text-gray-600' : 'text-gray-800']"
						>
							{{ summaryExpense < 0 ? '-' : '' }}
							&#8369;
							<i-count-up :endVal="summaryExpense | number_format"
										:options="options"
							/>
						</h3>
					</div>
				</div>
			</div>
			<!--/Metric Card-->
		</div>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'
import ICountUp from 'vue-countup-v2'

export default {
	data() {
		return {
			options: {
				decimal: '.',
				useGrouping: true,
				decimalPlaces: 2,
				duration: .5
			}
		}
	},

	computed: {
		...mapGetters({
			summaryTotal: 'dashboard_summary/summaryTotal',
			summaryIncome: 'dashboard_summary/summaryIncome',
			summaryExpense: 'dashboard_summary/summaryExpense'
		})
	},

	components: {
		ICountUp
	},

	filters: {
		number_format(value) {
			let v = Math.abs(value)
			return parseFloat((v / 100).toFixed(2))
		},
	},
}
</script>
