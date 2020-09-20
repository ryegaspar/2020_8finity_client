<template>
	<div>
		<!-- Off-canvas menu for mobile -->
		<div class="md:hidden">
			<div class="fixed inset-0 flex z-40">
				<!--
				  Off-canvas menu overlay, show/hide based on off-canvas menu state.

				  Entering: "transition-opacity ease-linear duration-300"
					From: "opacity-0"
					To: "opacity-100"
				  Leaving: "transition-opacity ease-linear duration-300"
					From: "opacity-100"
					To: "opacity-0"
				-->
				<div class="fixed inset-0">
					<div class="absolute inset-0 bg-gray-600 opacity-75"></div>
				</div>
				<!--
				  Off-canvas menu, show/hide based on off-canvas menu state.

				  Entering: "transition ease-in-out duration-300 transform"
					From: "-translate-x-full"
					To: "translate-x-0"
				  Leaving: "transition ease-in-out duration-300 transform"
					From: "translate-x-0"
					To: "-translate-x-full"
				-->
				<div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
					<div class="absolute top-0 right-0 -mr-14 p-1">
						<button
							class="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600"
							aria-label="Close sidebar">
							<svg class="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
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
						<nav class="px-2 space-y-1">
							<a href="#"
							   class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150">
								<!-- Heroicon name: home -->
								<svg
									class="mr-4 h-6 w-6 text-gray-300 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
									fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
								</svg>
								Dashboard
							</a>

							<a href="#"
							   class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">
								<!-- Heroicon name: users -->
								<svg
									class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
									fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
								</svg>
								Team
							</a>

							<a href="#"
							   class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">
								<!-- Heroicon name: folder -->
								<svg
									class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
									fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
								</svg>
								Projects
							</a>

							<a href="#"
							   class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">
								<!-- Heroicon name: calendar -->
								<svg
									class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
									fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
								</svg>
								Calendar
							</a>

							<a href="#"
							   class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">
								<!-- Heroicon name: inbox -->
								<svg
									class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
									fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
								</svg>
								Documents
							</a>

							<a href="#"
							   class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">
								<!-- Heroicon name: chart-bar -->
								<svg
									class="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"
									fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
								</svg>
								Reports
							</a>
						</nav>
					</div>
				</div>
				<div class="flex-shrink-0 w-14">
					<!-- Dummy element to force sidebar to shrink to fit close icon -->
				</div>
			</div>
		</div>

		<!-- Static sidebar for desktop -->
		<div class="hidden md:flex md:flex-shrink-0 h-full">
			<div class="flex flex-col w-64">
				<!-- Sidebar component, swap this element with another sidebar if you like -->
				<div class="flex flex-col h-0 flex-1">
					<div class="flex-1 flex flex-col overflow-y-auto">
						<nav class="flex-1 px-2 py-4 bg-gray-900 space-y-2">
							<div v-for="menu in menus">
								<a href="#"
								   class="group flex items-center px-2 py-2 text-md leading-normal font-medium text-white rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-300 hover:bg-gray-700"
								   v-if="'submenu' in menu"
								   @click.prevent="toggleSubmenu(menu)"
								>
									<font-awesome-layers class="fa-fw mr-3">
										<font-awesome-icon :icon="menu.icon"/>
									</font-awesome-layers>
									{{ menu.name }}
								</a>
								<nuxt-link :to="menu.url"
										   class="group flex items-center px-2 py-2 text-md leading-normal font-medium text-white rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-300 hover:bg-gray-700"
										   :class="{'bg-gray-700' : isRouteActive(menu)}"
										   v-else
										   @click.native="closeSubmenus"
								>
									<font-awesome-layers class="fa-fw mr-3">
										<font-awesome-icon :icon="menu.icon"/>
									</font-awesome-layers>
									{{ menu.name }}

								</nuxt-link>
								<div v-show="'submenu' in menu">
									<ul class="space-y-2 -mt-1 py-3 text-sm font-medium rounded-b-md"
										v-if="menu.active"
									>
										<li class="pl-12 py-1 transition ease-in-out duration-150 hover:text-white hover:bg-gray-700 rounded-md"
											v-for="submenu in menu.submenu"
											:class="{'bg-gray-700' : isRouteActive(submenu)}"
										>
											<nuxt-link :to="submenu.url"
											>
												{{ submenu.name }}
											</nuxt-link>
										</li>
									</ul>
								</div>
							</div>
							<!--							<a href="#"-->
							<!--							   class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-white rounded-md bg-black focus:outline-none focus:bg-gray-700 transition ease-in-out duration-150"-->
							<!--							>-->
							<!--								<font-awesome-layers class="fa-fw mr-3">-->
							<!--									&lt;!&ndash;									<font-awesome-icon icon="tachometer-alt"/>&ndash;&gt;-->
							<!--								</font-awesome-layers>-->
							<!--								Dashboard-->
							<!--							</a>-->

							<!--							<ul class="bg-black space-y-2 -mt-1 pb-3 text-sm font-medium rounded-b-md">-->
							<!--								<li class="pl-12 py-1 text-white bg-gray-700 transition ease-in-out duration-150"-->
							<!--								>-->
							<!--									<a href="#">Dashboard</a>-->
							<!--								</li>-->
							<!--								<li class="pl-12 py-1"><a href="#">Sample 1</a></li>-->
							<!--								<li class="pl-12 py-1"><a href="#">Sample 2</a></li>-->
							<!--							</ul>-->

							<!--							<a href="#"-->
							<!--							   class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">-->
							<!--								&lt;!&ndash; Heroicon name: users &ndash;&gt;-->
							<!--								<svg-->
							<!--									class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"-->
							<!--									fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
							<!--									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
							<!--										  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>-->
							<!--								</svg>-->
							<!--								Team-->
							<!--							</a>-->

							<!--							<a href="#"-->
							<!--							   class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">-->
							<!--								&lt;!&ndash; Heroicon name: folder &ndash;&gt;-->
							<!--								<svg-->
							<!--									class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"-->
							<!--									fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
							<!--									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
							<!--										  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>-->
							<!--								</svg>-->
							<!--								Projects-->
							<!--							</a>-->

							<!--							<a href="#"-->
							<!--							   class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">-->
							<!--								&lt;!&ndash; Heroicon name: calendar &ndash;&gt;-->
							<!--								<svg-->
							<!--									class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"-->
							<!--									fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
							<!--									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
							<!--										  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>-->
							<!--								</svg>-->
							<!--								Calendar-->
							<!--							</a>-->

							<!--							<a href="#"-->
							<!--							   class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">-->
							<!--								&lt;!&ndash; Heroicon name: inbox &ndash;&gt;-->
							<!--								<svg-->
							<!--									class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"-->
							<!--									fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
							<!--									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
							<!--										  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>-->
							<!--								</svg>-->
							<!--								Documents-->
							<!--							</a>-->

							<!--							<a href="#"-->
							<!--							   class="group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150">-->
							<!--								&lt;!&ndash; Heroicon name: chart-bar &ndash;&gt;-->
							<!--								<svg-->
							<!--									class="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150"-->
							<!--									fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
							<!--									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
							<!--										  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>-->
							<!--								</svg>-->
							<!--								Reports-->
							<!--							</a>-->
						</nav>
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
			menus: {
				'dashboard': {
					name: 'Dashboard',
					icon: 'tachometer-alt',
					url: '/',
					active: false
				},
				'transactions': {
					name: 'Transactions',
					icon: 'exchange-alt',
					active: false,
					submenu: [
						{
							name: 'Transactions',
							url: '/transactions',
						},
						{
							name: 'Categories',
							url: '/transactions/categories',
						}
					]
				},
				'employees': {
					name: 'Employees',
					icon: 'users',
					active: false,
					submenu: [
						{
							name: 'Employees',
							url: '/employees',
						},
						{
							name: 'Time',
							url: '/employees/time',
						},
						{
							name: 'Salary',
							url: 'employees/salary',
						},
						{
							name: 'Cash Advance',
							url: 'employees/cash-advance',
						},
					]
				}
			}
		}
	},

	mounted() {
		console.log(this.$route.path)
	},

	methods: {
		toggleSubmenu(menu) {
			menu.active = !menu.active

			if (menu.active) {
				for (let k in this.menus) {
					if (this.menus[k] !== menu) {
						this.menus[k].active = false
					}
				}
			}
		},

		isRouteActive(menu) {
			return this.$route.path === menu.url
		},

		closeSubmenus() {
			for (let k in this.menus) {
				this.menus[k].active = false
			}
		}
	}
}
</script>
