<template>
	<span
		:class="{'text-red-400' : rowData.category_type === 'expense', 'text-green-400' : rowData.category_type === 'income' }"
	>
		{{ (Math.abs(rowData.amount) / 100).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}
	</span>
</template>

<script>
export default {
	props: {
		rowData: {
			type: Object,
			required: true
		},
		rowIndex: {
			type: Number
		}
	}
}
</script>
