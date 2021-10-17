<template>
	<div class="relative w-full">
		<div
			class="relative flex justify-between md:w-36 bg-gray-900 border border-gray-800 text-gray-600 py-1 px-2 items-center flex hover:text-blue-700 hover:border-blue-700 focus:outline-none whitespace-nowrap"
			:class="extraClass"
		>
			<span>{{ selected[selectionName] }}</span>
			<div class="h-6 w-5">
				<button v-if="!hasSelected"
						@click.prevent="isOpen = !isOpen"
						class="focus:outline-none"
				>
					<svg class="absolute inset-y-0 right-0 flex items-center h-8 w-6"
						 viewBox="0 0 20 20"
						 fill="currentColor"
					>
						<path fill-rule="evenodd"
							  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							  clip-rule="evenodd"/>
					</svg>
				</button>
				<div class="absolute inset-y-0 right-0 flex items-center"
					 v-else
				>
					<button class="h-5 w-5 text-gray-600 hover:text-gray-500"
							@click.prevent="removeSelection"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path fill-rule="evenodd"
								  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
								  clip-rule="evenodd"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
		<div class="border border-gray-800 rounded absolute mt-1 z-10 w-full md:w-36"
			 v-if="isOpen"
			 v-click-outside="hide"
		>
			<div class="py-2 bg-gray-900 rounded">
				<button
					class="text-left py-2 px-2 block leading-5 hover:text-gray-900 hover:bg-gray-400 focus:outline-none w-full"
					v-for="item in selections"
					:key="item[selectionKey]"
					@click.prevent="setSelected(item)"
				>
					{{ item[selectionName] }}
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			required: true,
			type: String
		},
		extraClass: {
			type: String,
		},
		selections: {
			required: true,
			type: Array
		},
		selectionKey: {
			type: String,
			default: 'id',
		},
		selectionName: {
			type: String,
			default: 'name'
		}
	},

	data() {
		return {
			isOpen: false,
			selected: {
				name: this.title
			},
			defaultSelection: {
				name: this.title
			}
		}
	},

	computed: {
		hasSelected() {
			return this.selected[this.selectionName] !== this.defaultSelection.name
		}
	},

	methods: {
		hide() {
			this.isOpen = false
		},

		setSelected(item) {
			this.selected = item
			this.$emit('filterChanged', item)
			this.hide()
		},

		removeSelection() {
			this.selected = this.defaultSelection
			this.$emit('filterRemoved')
		}
	}
}
</script>
