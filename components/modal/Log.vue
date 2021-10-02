<template>
	<modal :show="show"
		   @close="closeModal"
	>
		<div>
			<div class="mt-1">
				<h3 class="text-center text-lg leading-6 font-medium text-gray-300">
					Log Detail
				</h3>
				<div class="mt-2 space-y-8 divide-gray-200">
					<form class="divide-y">
						<div class="mt-3 grid grid-cols-1 gap-y-2 gap-x-4 sm:grid-cols-6">
							<div class="sm:col-span-6 flex items-center">
								<p class="text-sm font-medium text-gray-500">
									Type:
								</p>
								<p class="ml-2 px-2 text-gray-300">
									{{ log.loggable_type }}
								</p>
							</div>
							<div class="sm:col-span-6 flex items-center">
								<p class="text-sm font-medium text-gray-500">
									Action:
								</p>
								<p class="ml-2 px-2" :class="actionClass">
									{{ log.action }}
								</p>
							</div>
							<div class="sm:col-span-6 flex items-center">
								<p class="text-sm font-medium text-gray-500">
									Target ID:
								</p>
								<p class="ml-2 px-2 text-gray-300">
									{{ log.loggable_id }}
								</p>
							</div>
							<div class="sm:col-span-6 flex items-center">
								<p class="text-sm font-medium text-gray-500">
									Performed by:
								</p>
								<p class="ml-2 px-2 text-gray-300">
									{{ log.admin_username }}
								</p>
							</div>
							<div class="sm:col-span-6 flex items-center">
								<p class="text-sm font-medium text-gray-500">
									Date:
								</p>
								<p class="ml-2 px-2 text-gray-300">
									{{ dateTimeFormatted }}
								</p>
							</div>
							<div class="sm:col-span-6 items-center">
								<p class="text-sm font-medium text-gray-500">
									Changes:
								</p>
								<ul class="ml-4 mt-2 grid gap-y-2 text-gray-300">
									<template v-if="isUpdated">
										<li v-for="(item, index) in changes">
											{{ index }}: <span class="text-red-500">{{ item[0] }}</span> &rarr;
											<span class="text-green-500">{{ item[1]}}</span>
										</li>
									</template>
									<template v-else>
										<li v-for="(item, index) in changes">{{ index }}: {{ item }}</li>
									</template>
								</ul>
							</div>
						</div>
						<div class="mt-6 pt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
							<template>
								<div class="hidden"></div>
								<button type="button"
										class="w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 col-span-2"
										v-on:click="closeModal"
								>
									Close
								</button>
							</template>
						</div>
					</form>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
import Modal from "~/components/modal/Modal"
import {DateTime} from 'luxon'

export default {
	props: {
		log: {
			type: Object
		},
		show: {
			required: true,
			type: Boolean
		}
	},

	components: {
		Modal,
	},

	data() {
		return {}
	},

	mounted() {
	},

	computed: {
		actionClass() {
			if (this.log.action === 'updated')
				return 'text-blue-500'

			if (this.log.action === 'created')
				return 'text-green-500'

			return 'text-red-500'
		},

		dateTimeFormatted() {
			return DateTime.fromISO(this.log.created_at, {setZone: true})
				.toLocaleString({
					weekday: 'short',
					month: 'short',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit'
				})
		},

		isUpdated() {
			return this.log.action === 'updated'
		},

		changes() {
			if (this.log.changes) {
				const items = JSON.parse(this.log.changes)

				if (items.hasOwnProperty('amount'))
					items.amount = this.formatAmount(items.amount)

				if (!this.isUpdated) {
					return items
				}

				const beforeItems = items.before
				const afterItems = items.after

				if (beforeItems.hasOwnProperty('amount')) {
					beforeItems.amount = this.formatAmount(beforeItems.amount)
					afterItems.amount = this.formatAmount(afterItems.amount)
				}

				let updates = {}

				for (const key in beforeItems) {
					updates[key] = [beforeItems[key], afterItems[key]]
				}

				return updates
			}
		}
	},

	methods: {
		closeModal() {
			this.$emit('close')
		},

		formatAmount(amount) {
			return (amount / 100).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})

		}
	},
}
</script>
