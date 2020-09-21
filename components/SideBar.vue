<template>
	<div>
		<!-- Off-canvas menu for mobile -->
		<div class="md:hidden text-white">
			<transition
				enter-active-class="transition ease-in-out duration-300 transform"
				enter-class="-translate-x-full"
				enter-to-class="translate-x-0"
				leave-active-class="transition ease-in-out duration-300 transform"
				leave-class="translate-x-0"
				leave-to-class="-translate-x-full"
			>
				<!-- overlay -->
				<div class="fixed inset-0 flex z-40" v-if="mobileMenu">
					<transition
						enter-active-class="transition-opacity ease-linear duration-300"
						enter-class="opacity-0"
						enter-to-class="opacity-100"
						leave-active-class="transition ease-in-out duration-300 transform"
						leave-class="opacity-100"
						leave-to-class="opacity-0"
					>
						<div class="fixed inset-0" v-if="showOverlay" @click.prevent="closeSidebar">
							<div class="absolute inset-0 bg-gray-600 opacity-75"
							></div>
						</div>
					</transition>

					<div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800 z-50"
					>
						<div class="absolute top-0 right-0 -mr-14 p-1">
							<button
								class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
								aria-label="Close sidebar"
								@click.prevent="closeSidebar"
							>
								<svg class="h-6 w-6 text-white" stroke="currentColor" fill="none"
									 viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										  d="M6 18L18 6M6 6l12 12"/>
								</svg>
							</button>
						</div>
						<div class="flex-shrink-0 flex items-center px-4">
							<img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-on-dark.svg"
								 alt="Workflow">
						</div>
						<div class="mt-5 flex-1 h-0 overflow-y-auto">
							<side-bar-menus/>
						</div>
					</div>
					<div class="flex-shrink-0 w-14">
						<!-- Dummy element to force sidebar to shrink to fit close icon -->
					</div>
				</div>
			</transition>
		</div>

		<!-- Static sidebar for desktop -->
		<div
			class="flex text-white bg-gray-900 overflow-y-scroll -mr-6 min-h-full overflow-hidden hidden md:flex md:flex-shrink-0 h-full">
			<div class="flex flex-col w-48 lg:w-64 text-sm lg:text-md">
				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex flex-col h-0 flex-1">
					<div class="flex-1 flex flex-col">
						<side-bar-menus/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			mobileMenu: false,
			showOverlay: false,
		}
	},

	mounted() {
		this.$root.$on('toggle_menu', () => {
			this.mobileMenu = !this.mobileMenu
			setTimeout(() => this.showOverlay = this.mobileMenu, 200)
		});

		this.$root.$on('close_menu', () => {
			this.closeSidebar()
		})
	},

	methods: {
		closeSidebar() {
			this.showOverlay = false
			setTimeout(() => this.mobileMenu = false, 200)
		}
	}
}
</script>
