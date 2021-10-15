<template>
	<div class="fixed z-10 flex h-16 w-full bg-blue-800 shadow-2x">
		<button
			class="px-4 text-gray-500 focus:outline-none focus:bg-gray-100 focus:text-gray-600 md:hidden"
			aria-label="Open sidebar"
			@click="toggleMobileMenu"
		>
			<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
					  d="M4 6h16M4 12h16M4 18h7"/>
			</svg>
		</button>
		<div class="flex-1 px-4 flex justify-between">
			<div class="flex-1 flex">
			</div>
			<div class="ml-4 flex items-center md:ml-6">
				<notification/>
				<!-- Profile dropdown -->
				<div class="ml-3 relative">
					<div>
						<button
							class="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:shadow-outline"
							id="user-menu"
							aria-label="User menu"
							aria-haspopup="true"
							@click="showUserMenu"
							v-click-outside="hide"
						>
							<img class="h-8 w-8 rounded-full"
								 :src="$auth.user.gravatar"
								 alt="">
						</button>
					</div>
					<transition
						enter-active-class="transition ease-out duration-100"
						enter-class="transform opacity-0 scale-95"
						enter-to-class="transform opacity-100 scale-100"
						leave-active-class="transition ease-in duration-75"
						leave-class="transform opacity-100 scale-100"
						leave-to-class="transform opacity-0 scale-95"
					>
						<div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg"
							 v-if="userMenu"
						>
							<div class="py-1 rounded-md bg-gray-900 shadow-xs border border-gray-500" role="menu"
								 aria-orientation="vertical" aria-labelledby="user-menu">
								<a href="#"
								   class="block px-4 py-2 text-sm text-gray-400 hover:bg-gray-200 transition ease-in-out duration-150"
								   role="menuitem"
								   @click.prevent="logout"
								>
									Sign out
								</a>
							</div>
						</div>
					</transition>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			userMenu: false,
		}
	},

	mounted() {
		console.log(this.$auth.user.gravatar)
	},

	methods: {
		toggleMobileMenu() {
			this.$root.$emit('toggle_menu')
		},

		showUserMenu() {
			this.userMenu = !this.userMenu
		},

		hide() {
			this.userMenu = false
		},

		async logout() {
			await this.$auth.logout()

			await this.$router.push('/login')
		}
	}
}
</script>
