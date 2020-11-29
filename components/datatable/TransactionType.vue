<template>
	<span :class="badgeColor"
		  class="inline-block px-2 rounded-full font-semibold text-sm text-gray-900"
	>
		{{ data.category.type === 'in' ? 'income' : 'expense' }}
	</span>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default: () => ({})
		}
	},

	computed: {
		badgeColor() {
			return {
				"bg-green-500": this.data.category.type === 'in',
				"bg-red-500": this.data.category.type === 'out'
			}
		}
	}
}
</script>
