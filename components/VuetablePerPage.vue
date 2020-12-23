<template>
	<div>
		<button
			class="bg-gray-900 border border-gray-800 text-gray-600 py-1 px-2 rounded-l-lg rounded-r-none items-center flex hover:text-blue-700 hover:border-blue-700 focus:outline-none"
			@click.prevent="isOpen = !isOpen"
			v-click-outside="hide"
		>
			{{ selectedValue }}
			<svg class="-mr-1 ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd"
					  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					  clip-rule="evenodd"/>
			</svg>
		</button>
		<div class="border border-gray-800 rounded absolute mt-1 z-10 w-14 md:w-16"
			 v-if="isOpen"
		>
			<div class="py-2 bg-gray-900 rounded">
				<a href="#"
				   class="text-center py-2 px-4 block leading-5 hover:text-gray-900 hover:bg-gray-400 focus:outline-none"
				   v-for="(page, index) in perPageOptions"
				   @click.prevent="updateSelected(page)"
				>
					{{ page }}
				</a>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['perPageOptions', 'selected'],

	data() {
		return {
			isOpen: false,
			selectedValue: this.selected
		}
	},

	methods: {
		hide() {
			this.isOpen = false
		},

		updateSelected(page) {
			this.selectedValue = page
			this.$emit('perPageChanged', page)
		}
	}
}
</script>
