<template>
	<font-awesome-layers class="fa-fw">
		<font-awesome-icon :icon="rowData.category_icon"/>
	</font-awesome-layers>
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
