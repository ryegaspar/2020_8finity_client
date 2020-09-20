<template>
	<div>
		<div class="flex overflow-hidden bg-gray-800">
			<div class="flex flex-col w-0 flex-1 overflow-hidden">
				<nav-bar/>
				<div class="flex flex-1 relative bg-black overflow-y-auto focus:outline-none mt-16">
					<nav class="overflow-hidden w-64 hidden md:block">
						<div class="flex text-white bg-gray-900 h-auto overflow-y-scroll -mr-6 min-h-screen">
							<side-bar />
						</div>
					</nav>
					<main class="flex-1 px-6 w-full overflow-auto" tabindex="0">
						<nuxt/>
					</main>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
}
</script>
