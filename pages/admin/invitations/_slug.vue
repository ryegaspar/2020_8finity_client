<template>
	<div class="px-4 md:px-0 mb-16 mt-4 text-gray-400 leading-normal">
		Hello
	</div>
</template>
<script>
export default {
	layout: 'master',

	async asyncData({params}) {
		const slug = params.slug
		return { slug }
	},

	data() {
		return {

		}
	},

	mounted() {
		console.log(this.slug);
	}
}
</script>
