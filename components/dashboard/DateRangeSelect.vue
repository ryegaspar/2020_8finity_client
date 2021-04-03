<template>
	<div class="w-full px-3 py-1 sm:py-3">
		<div class="inline-block min-w-full">
			<div class="md:flex relative">
				<button
					class="relative bg-gray-900 border border-gray-800 text-gray-700 px-3 rounded-lg items-center flex w-full md:w-auto justify-between md:justify-start h-10 hover:border-blue-600 hover:text-blue-600 focus:outline-none"
					@click="isOpen = !isOpen"
					v-click-outside="hide"
				>
					<span class="mr-1 my-2 text-gray-400">{{ selected.name }}</span>
					<svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
						<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
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
					<div
						class="border border-gray-800 rounded absolute mt-2 sm:mt-12 z-10 w-full md:w-32"
						v-if="isOpen"
					>
						<div class="py-2 bg-gray-900 rounded">
							<a href="#"
							   class="py-2 px-4 block leading-5 hover:text-gray-900 hover:bg-gray-400 focus:outline-none"
							   :class="[selected == item ? 'bg-gray-400 text-gray-900' : 'bg-gray-900']"
							   v-for="item in presets"
							   @click.prevent="changeSelection(item)"
							>
								{{ item.name }}
							</a>
						</div>
					</div>
				</transition>
				<div class="flex-none sm:flex text-sm mt-3 sm:mt-0" v-if="selected.name == 'custom'">
					<div class="flex items-center justify-between">
						<span class="flex mx-2">from date:</span>
						<datetime class="theme-dark"
								  :week-start="7"
								  @input="setStartDate"
								  :value="statStartDate"
								  :max-datetime="statEndDate"
						/>
					</div>
					<div class="flex items-center justify-between mt-3 sm:mt-0">
						<span class="flex mx-2">to date:</span>
						<datetime class="theme-dark"
								  :week-start="7"
								  @input="setEndDate"
								  :value="statEndDate"
								  :min-datetime="statStartDate"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import {presets} from '@/utilities/DatePresets'
import {Datetime} from 'vue-datetime'
import {DateTime} from 'luxon'
import {mapGetters, mapActions} from 'vuex'

export default {
	data() {
		return {
			isOpen: false,
			presets: presets,
		}
	},

	mounted() {
		this.updateSummary()
		this.updateTransactions()
	},

	activated() {
		this.updateSummary()
		this.updateTransactions()
	},

	components: {
		datetime: Datetime
	},

	computed: {
		...mapGetters({
			selected: 'dashboard_date_select/selected',
			statStartDate: 'dashboard_date_select/startDate',
			statEndDate: 'dashboard_date_select/endDate',
		})
	},

	methods: {
		...mapActions({
			changeSelection: 'dashboard_date_select/changeSelectedPreset',
			updateStartDate: 'dashboard_date_select/updateStartDate',
			updateEndDate: 'dashboard_date_select/updateEndDate',
			updateSummary: 'dashboard_summary/updateSummary',
			updateTransactions: 'dashboard_transactions/updateTransactions'
		}),

		hide() {
			this.isOpen = false
		},

		setStartDate(date) {
			let d = DateTime.fromISO(date, {setZone: true}).toISODate()
			this.updateStartDate(d)
		},

		setEndDate(date) {
			let d = DateTime.fromISO(date, {setZone: true}).toISODate()
			this.updateEndDate(d)
		},
	},

	directives: {
		clickOutside: vClickOutside.directive
	}
}
</script>

<style>
.vdatetime-input {
	@apply rounded-lg text-right bg-gray-900 text-gray-400 border border-gray-800 outline-none p-2
}

.theme-dark .vdatetime-popup__header,
.theme-dark .vdatetime-calendar__month__day--selected > span > span,
.theme-dark .vdatetime-calendar__month__day--selected:hover > span > span {
	@apply bg-gray-900
}

.theme-dark .vdatetime-year-picker__item--selected,
.theme-dark .vdatetime-time-picker__item--selected,
.theme-dark .vdatetime-popup__actions__button {
	@apply text-gray-900
}

@screen sm {
	.vdatetime-input {
		@apply w-32
	}
}
</style>
