<template>
	<div class="relative">
		<button
			class="relative p-1 text-gray-300 rounded-full hover:bg-gray-300 hover:text-gray-500 focus:outline-none focus:shadow-outline focus:text-gray-400"
			aria-label="Notifications"
			@click.prevent="showNotification"
			v-click-outside="hide"
		>
			<svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
				<path stroke-linecap="round"
					  stroke-linejoin="round"
					  stroke-width="2"
					  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
			</svg>
			<span class="absolute -top-1.5 left-4 rounded-full bg-red-600 text-xs w-5 h-5 flex justify-center items-center text-gray-300"
				  v-if="notifications.length && !hasSeen"
			>
				{{ notifications.length }}
			</span>
		</button>

		<div class="origin-top-right absolute border border-gray-500 w-48 max-h-80 overflow-y-auto right-0 rounded-md shadow-lg"
			 v-if="notificationWindow"
		>
			<div class="py-1 rounded-md bg-gray-900">
				<template v-if="notifications.length">
					<button v-for="notification in notifications"
						 :key="notification.id"
						 class="px-3 py-1 w-full leading-tight flex flex-col leading-snug text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition ease-in-out duration-150 border-t border-b border-gray-800"
					>
						<span class="text-left">
							{{ notification.message }}
						</span>
						<span class="text-xxs text-left"><i>{{ notification.created_at }}</i></span>
					</button>
				</template>
				<template v-else>
					<span
						class="flex px-4 py-2 text-sm text-gray-400 transition ease-in-out duration-150">no new notifications</span>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
	data() {
		return {
			hasSeen: false,
			notificationWindow: false,
		}
	},

	mounted() {
		this.getNotifications()
	},

	computed: {
		...mapGetters({
			notifications: 'notifications/notifications'
		})
	},

	methods: {
		...mapActions({
			getNotifications: 'notifications/getNotifications',
		}),

		showNotification() {
			this.hasSeen = true
			this.notificationWindow = !this.notificationWindow
		},

		hide() {
			this.notificationWindow = false
		}
	},

	watch: {
		hasSeen(val, oldVal) {
			if (oldVal === false && val === true) {
				this.$axios.$delete(`admin/notifications`)
			}
		}
	}
}
</script>
