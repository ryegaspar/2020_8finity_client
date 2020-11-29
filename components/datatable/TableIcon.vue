<template>
	<font-awesome-layers class="fa-fw">
		<font-awesome-icon :icon="data.category.icon"/>
	</font-awesome-layers>
</template>

<script>
export default {
	props: {
		data: {}
	}
}
</script>
