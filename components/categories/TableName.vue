<template>
	<span
		:class="{'text-red-400' : rowData.type === 'expense', 'text-green-400' : rowData.type === 'income' }"
	>
		{{ rowData.name }}
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
