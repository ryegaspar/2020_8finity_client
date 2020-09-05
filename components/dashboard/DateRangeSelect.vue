<template>
	<div>
		<div class="w-full px-3 py-1 sm:py-3">
			<div class="inline-block min-w-full">
				<div class="md:flex relative">
					<button
						class="relative bg-gray-900 border border-gray-800 text-gray-700 px-3 rounded-lg items-center flex w-full md:w-auto justify-between md:justify-start h-10"
						@click="isOpen = !isOpen"
						v-click-outside="hide"
					>
						<span class="mr-1 my-2 text-gray-400">{{ selected.name }}</span>
						<svg class="fill-current w-4" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 20 20">
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
						</svg>
					</button>
					<div
						class="border border-gray-800 rounded absolute mt-2 sm:mt-12 z-10 w-full md:w-auto"
						v-if="isOpen"
					>
						<div class="py-2 bg-gray-900 rounded">
							<a href="#"
							   class="hover:bg-gray-400 py-2 px-2 block hover:text-gray-900"
							   :class="[selected == item ? 'bg-gray-400 text-gray-900' : 'bg-gray-900']"
							   v-for="item in presets"
							   @click.prevent="changeSelection(item)"
							>
								{{ item.name }}
							</a>
						</div>
					</div>
					<div class="flex-none sm:flex text-sm mt-3 sm:mt-0" v-if="selected.name == 'custom'">
						<div class="flex justify-between">
							<span class="flex m-2 sm:py-1">from date:</span>
							<datetime class="theme-dark" @input="setStartDate" :value="statStartDate"/>
						</div>
						<div class="flex justify-between mt-3 sm:mt-0">
							<span class="flex m-2 sm:py-1">to date:</span>
							<datetime class="theme-dark" @input="setEndDate" :value="statEndDate"/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import {presets} from '@/constants/date_presets'
import {Datetime} from 'vue-datetime'
import {DateTime} from 'luxon'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
	data() {
		return {
			isOpen: false,
			presets: presets,
			theme: {
				background: '#1A202C',
				text: 'text-white',
				border: 'border-gray-700',
				currentColor: 'text-gray-200',
				navigation: {
					background: 'bg-gray-800',
					hover: 'hover:bg-gray-700',
					focus: 'bg-gray-700',
				},
				picker: {
					rounded: 'rounded-md',
					selected: {
						background: 'bg-teal-400',
						border: 'border-teal-400',
						hover: 'hover:border-teal-400',
					},
				},
			}
		}
	},

	mounted() {
		this.updateSummary()
	},

	components: {
		datetime: Datetime
	},

	computed: {
		...mapGetters ({
			selected: 'dashboard_stats/selected',
			statStartDate: 'dashboard_stats/startDate',
			statEndDate: 'dashboard_stats/endDate',
		})
	},

	methods: {
		...mapActions({
			changeSelection: 'dashboard_stats/changeSelectedPreset',
			updateStartDate: 'dashboard_stats/updateStartDate',
			updateEndDate: 'dashboard_stats/updateEndDate',
			updateSummary: 'dashboard_stats/updateSummary'
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
