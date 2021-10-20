<template>
	<nav class="flex-1 px-2 py-4 bg-gray-900 space-y-2">
		<div v-for="menu in menus">
			<a href="#"
			   class="group flex items-center px-2 py-2 text-md leading-normal font-medium text-white rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-300 hover:bg-gray-700 md:mr-6"
			   v-if="'submenu' in menu"
			   @click.prevent="toggleSubmenu(menu)"
			>
				<font-awesome-layers class="fa-fw mr-3">
					<font-awesome-icon :icon="menu.icon"/>
				</font-awesome-layers>
				{{ menu.name }}
			</a>
			<nuxt-link :to="menu.url"
					   class="group flex items-center px-2 py-2 text-md leading-normal font-medium text-white rounded-md focus:outline-none focus:bg-gray-700 transition ease-in-out duration-300 hover:bg-gray-700 md:mr-6"
					   :class="{'bg-gray-700' : isRouteActive(menu)}"
					   v-else
					   @click.prevent="closeSubmenus();clickedLink()"
			>
				<font-awesome-layers class="fa-fw mr-3">
					<font-awesome-icon :icon="menu.icon"/>
				</font-awesome-layers>
				{{ menu.name }}

			</nuxt-link>
			<div v-show="'submenu' in menu">
				<ul class="space-y-2 -mt-1 py-3 text-sm font-medium rounded-b-md md:mr-6"
					v-if="menu.active"
				>
					<li v-for="submenu in menu.submenu"
						:key="submenu.name"
						:class="{'bg-gray-700 rounded-md' : isRouteActive(submenu)}"
						class="outline-none"
					>
						<nuxt-link :to="submenu.url"
								   class="block pl-12 py-1 transition ease-in-out duration-500 hover:text-white hover:bg-gray-700 rounded-md focus:outline-none"
								   @click.prevent="clickedLink"
						>
							{{ submenu.name }}
						</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
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
				'accounting': {
					name: 'Accounting',
					icon: 'money-bill-alt',
					active: false,
					submenu: [
						{
							name: 'Accounts',
							url: '/accounting/'
						},
						{
							name: 'Transactions',
							url: '/accounting/transactions',
						},
						{
							name: 'Transfers',
							url: '/accounting/transfers'
						},
						{
							name: 'Checks',
							url: '/accounting/checks'
						},
						{
							name: 'Categories',
							url: '/accounting/categories',
						},
						{
							name: 'Logs',
							url: '/accounting/logs',
						}
					]
				},
				'receivables': {
					name: 'Receivables',
					icon: 'coins',
					active: false,
					submenu: [
						{
							name: 'accounts',
							url: '/receivables/'
						}
					]
				},
				'hr': {
					name: 'Human Resource',
					icon: 'users',
					active: false,
					submenu: [
						{
							name: 'Employees',
							url: '/hr/',
						},
						// {
						// 	name: 'Time',
						// 	url: '/employees/time',
						// },
						// {
						// 	name: 'Salary',
						// 	url: 'employees/salary',
						// },
						// {
						// 	name: 'Cash Advance',
						// 	url: 'employees/cash-advance',
						// },
					]
				},
				'admin': {
					name: 'Admins',
					icon: 'user-cog',
					active: false,
					url: '/admins'
				}
			},
		}
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

		clickedLink() {
			this.$root.$emit('close_menu')
		},

		isRouteActive(menu) {
			return this.$route.path === menu.url
		},

		closeSubmenus() {
			for (let k in this.menus) {
				this.menus[k].active = false
			}
		},
	}
}
</script>
