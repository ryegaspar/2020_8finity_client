<template>
	<div>
		<!--Container-->
		<div class="container w-full mx-auto pt-20 lg:pt-24">
			<div class="w-full px-4 md:px-0 lg:mt-12 mb-16 text-gray-400 leading-normal">
				<date-range-select/>
				<!--Console Content-->
				<hr class="border-b-2 border-gray-600 my-8 mx-4">

				<stats-summary/>

				<!--Divider-->
				<hr class="border-b-2 border-gray-600 my-8 mx-4">

				<div class="flex-flex-row flex-wrap flex-grow mt-2">
					<div class="w-full p-3">
						<graph-transactions />
					</div>
				</div>

				<div class="flex flex-row flex-wrap flex-grow mt-2">
					<div class="w-full md:w-1/2 p-3">
						<graph-expenses />
					</div>

					<div class="w-full md:w-1/2 p-3">
						<graph-monthly-revenue />
					</div>
				</div>
			</div>
		</div>

		<footer class="bg-gray-900 border-t border-gray-400 shadow">
			<div class="container max-w-md mx-auto flex py-4">

				<div class="w-full mx-auto">
					<h3 class="text-gray-100 text-center text-sm">&#169; 2020 8finity</h3>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
export default {
	middleware: 'admin',
	layout: 'admin',
}
</script>
