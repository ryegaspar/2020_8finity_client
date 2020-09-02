<template>
	<div>
		<div class="w-full px-3 pt-1 sm:pt-3">
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
							   @click.prevent="changeSelected(item)"
							>
								{{ item.name }}
							</a>
						</div>
					</div>
					<div class="flex-none sm:flex text-sm mt-3 sm:mt-0" v-if="selected.name == 'custom'">
						<div class="flex justify-between">
							<span class="flex m-2 sm:py-1">from date:</span>
							<datetime v-model="statStartDate" class="theme-dark" @input="changeStartDate"/>
						</div>
						<div class="flex justify-between mt-3 sm:mt-0">
							<span class="flex m-2 sm:py-1">to date:</span>
							<datetime v-model="statEndDate" class="theme-dark" @input="changeEndDate"/>
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

export default {
	data() {
		return {
			isOpen: false,
			presets: presets,
			statStartDate: '',
			statEndDate: '',
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
		this.statStartDate = this.selected.start
		this.statEndDate = this.selected.end
	},

	components: {
		datetime: Datetime
	},

	computed: {
		selected() {
			return this.$store.state.date_range.selected
		}
	},

	methods: {
		hide() {
			this.isOpen = false
		},

		changeSelected(item) {
			if (item.name !== 'custom') {
				this.statStartDate = item.start
				this.statEndDate = item.end
			} else {
				item.start = this.statStartDate
				item.end = this.statEndDate
			}
			this.$store.commit('date_range/changeSelection', item)
		},

		changeStartDate(date) {
			this.statStartDate = DateTime.fromISO(date, {setZone: true}).toISODate()
			this.$store.commit('date_range/changeStartDate', this.statStartDate)

			// this.getMatch(this.statStartDate, this.statEndDate)
		},

		changeEndDate(date) {
			this.statEndDate = DateTime.fromISO(date, {setZone: true}).toISODate()
			this.$store.commit('date_range/changeEndDate', this.statEndDate)

			// this.getMatch(this.statStartDate, this.statEndDate)
		},

		getMatch(startDate, endDate) {
			// console.log(startDate)
			// let matched = presets.filter((item) => {
			// 	return item.start == startDate && item.end == endDate
			// })
			//
			// console.log(matched)
			//
			// if (matched) {
			// 	this.$store.commit('date_range/changeSelection', matched)
			// 	console.log('matched!')
			// 	return
			// }
			//
			// let customRange = {name: 'custom', start: startDate, end: endDate}
			// this.$store.commit('date_range/changeSelection', customRange)
		}
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
