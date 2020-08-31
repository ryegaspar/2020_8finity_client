<template>
	<div>
		<div class="w-full px-3 pt-3">
			<div class="inline-block relative min-w-full">
				<div class="md:flex">
					<button
						class="bg-gray-900 border border-gray-800 text-gray-700 px-3 rounded-lg items-center flex w-full md:w-auto justify-between md:justify-start mb-3"
						@click="isOpen = !isOpen"
						v-click-outside="hide"
					>
						<span class="mr-1">{{ selected.name }}</span>
						<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
							 viewBox="0 0 20 20">
							<path
								d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
						</svg>
					</button>
					<div
						class="border border-gray-800 rounded absolute mt-2 z-10 w-full md:w-auto"
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
					<div class="flex-none sm:flex">
						<VueTailwindPicker
							:theme="theme"
							@change="(v) => rangeStartDate = v"
							class="flex px-3 mb-3"
						>
							<span class="mr-2">from date:</span>
							<input
								class="rounded-lg text-right bg-gray-900 text-gray-400 border border-gray-800 outline-none pr-2 flex-auto w-32"
								type="text"
								v-model="rangeStartDate"
							/>
						</VueTailwindPicker>
						<VueTailwindPicker
							:theme="theme"
							@change="(v) => rangeStartDate = v"
							class="flex px-3 mb-3"
						>
							<span class="mr-2">to date:</span>
							<input
								class="rounded-lg text-right bg-gray-900 text-gray-400 border border-gray-800 outline-none pr-2 flex-auto w-32"
								type="text"
								v-model="rangeStartDate"
							/>
						</VueTailwindPicker>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside'
import {presets} from '@/constants/date_presets'
import VueTailwindPicker from 'vue-tailwind-picker'

export default {
	data() {
		return {
			isOpen: false,
			presets: presets,
			rangeStartDate: '',
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

	components: {
		VueTailwindPicker
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
			this.$store.commit('date_range/changeSelection', item)
		},

		changeActiveRange(range) {
			this.selected = range
			this.isOpen = false
		}
	},

	directives: {
		clickOutside: vClickOutside.directive
	}
}
</script>
