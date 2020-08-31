<template>
	<div>
		<div class="w-full p-3">
			<div class="inline-block relative min-w-full">
				<button
					class="bg-gray-900 border border-gray-800 text-gray-700 py-1 px-3 rounded-lg items-center flex w-full md:w-auto justify-between md:justify-start"
					@click="isOpen = !isOpen"
					v-click-outside="hide"
				>
					<span class="mr-1">{{ selected }}</span>
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
						   :class="[selected == menu ? 'bg-gray-400 text-gray-900' : 'bg-gray-900']"
						   v-for="menu in activeRange"
						   @click.prevent="changeActiveRange(menu)"
						>
							{{ menu }}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
	data() {
		return {
			isOpen: false,
			selected: 'this month',
			activeRange: [
				'this month',
				'last month',
				'this week',
				'last week',
				'this year',
				'last year',
				'custom'
			],
		}
	},

	methods: {
		hide() {
			this.isOpen = false
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
