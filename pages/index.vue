<template>
	<div class="px-4 md:px-0 mb-16 mt-4 text-gray-400 leading-normal">
		<date-range-select/>
		<!--Console Content-->
		<hr class="border-b-2 border-gray-600 my-4 mx-4">

		<stats-summary/>

		<!--Divider-->
		<hr class="border-b-2 border-gray-600 my-4 mx-4">

		<div class="flex-flex-row flex-wrap flex-grow mt-2">
			<div class="w-full p-3">
				<graph-cash-flow/>
			</div>
		</div>

		<div class="flex flex-row flex-wrap flex-grow mt-2">
			<div class="w-full md:w-1/2 p-3">
				<graph-expenses/>
			</div>

			<div class="w-full md:w-1/2 p-3">
				<graph-monthly-revenue/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	middleware: 'admin',
	layout: 'master'
}
</script>
