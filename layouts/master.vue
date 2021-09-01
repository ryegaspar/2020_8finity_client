<template>
	<div>
		<div class="flex overflow-hidden bg-gray-800">
			<div class="flex flex-col w-0 flex-1 overflow-hidden">
				<nav-bar/>
				<div class="flex flex-1 relative bg-black overflow-y-auto focus:outline-none pt-16 min-h-screen">
					<side-bar/>
					<main class="flex-1 md:pr-4 md:pl-10 w-full overflow-auto bg-black">
						<nuxt />
					</main>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {}
</script>
