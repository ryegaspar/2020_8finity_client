<template>
	<div class="relative">
		<button
			class="flex justify-between bg-gray-900 border border-gray-800 text-gray-600 py-1 px-2 items-center flex hover:text-blue-700 hover:border-blue-700 w-24 focus:outline-none"
			@click.prevent="isOpen = !isOpen"
			v-click-outside="hide"
		>
			<span>{{ selected }}</span>
			<svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd"
					  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					  clip-rule="evenodd"/>
			</svg>
		</button>
		<div class="border border-gray-800 rounded absolute mt-1 z-10 w-full md:w-20 ml-4"
			 v-if="isOpen"
		>
			<div class="py-2 bg-gray-900 rounded">
				<a href="#"
				   class="text-left py-2 px-2 block leading-5 hover:text-gray-900 hover:bg-gray-400 focus:outline-none"
				   v-for="option in options"
				   @click.prevent="setSelected(option)"
				>
					{{ option }}
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false,
			options: ['all', 'income', 'expense'],
			selected: 'all'
		}
	},

	methods: {
		hide() {
			this.isOpen = false
		},

		setSelected(option) {
			this.selected = option
			this.$emit('filterChanged', option)
		}
	}
}
</script>
