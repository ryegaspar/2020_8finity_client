<template>
	<div class="relative w-full">
		<span class="absolute inset-y-0 left-0 flex items-center pl-2">
			<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
				<path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"/>
			</svg>
		</span>
		<input
			placeholder="Search"
			class="w-full sm:w-auto border border-gray-800 border-b block pl-8 sm:pr-6 h-full bg-gray-900 text-sm placeholder-gray-400 text-gray-400 focus:border-blue-700 focus:outline-none w-10/12"
			:class="extraClass"
			@input="updateSearch"
			:value="search"
		/>
		<div class="absolute inset-y-0 right-0 pr-1 flex items-center"
			 v-if="showReset"
		>
			<button class="h-5 w-5 text-gray-600 hover:text-gray-500"
					@click.prevent="clearSearch"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path fill-rule="evenodd"
						  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
						  clip-rule="evenodd"/>
				</svg>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		extraClass: {
			type: String
		}
	},

	data() {
		return {
			search: '',
		}
	},

	methods: {
		clearSearch() {
			this.search = ''
			this.$emit('searchUpdated', this.search)
		},

		updateSearch(e) {
			if (this.timeout) clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
				this.search = e.target.value
				this.$emit('searchUpdated', this.search)
			}, 500)
		}
	},

	computed: {
		showReset() {
			return this.search.length > 0
		}
	},
}
</script>
