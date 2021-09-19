<template>
	<div class="px-4 md:px-0 mb-16 mt-4 text-gray-400 leading-normal">
		<div class="w-full px-3 py-1 sm:py-3">
			<div class="flex justify-between">
				<button
					class="bg-gray-900 border border-gray-600 text-gray-600 py-2 px-3 rounded-lg items-center flex justify-between hover:border-blue-600 hover:text-blue-600 focus:outline-none text-sm md:text-base"
					@click.prevent="showModal({})"
				>
					<font-awesome-layers class="fa-fw mr-1">
						<font-awesome-icon icon="plus-circle"/>
					</font-awesome-layers>
					New
				</button>

				<button
					class="bg-gray-900 border border-gray-600 text-gray-600 py-2 px-3 rounded-lg items-center flex justify-between hover:border-green-600 hover:text-green-600 focus:outline-none text-sm md:text-base"
					@click.prevent="$refs.vuetable.refresh()"
				>
					<font-awesome-layers class="fa-fw mr-1">
						<font-awesome-icon icon="sync"/>
					</font-awesome-layers>
					Refresh
				</button>
			</div>

			<div class="flex flex-col">
				<div class="mt-8 shadow overflow-hidden sm:rounded-lg">
					<vuetable ref="vuetable"
							  :http-options="httpOptions"
							  :sort-order="sortOrder"
							  :api-url="url"
							  :fields="fields"
							  pagination-path=""
							  :per-page=50
							  :multi-sort="false"
					>
						<template slot="actions"
								  slot-scope="props"
						>
							<template>
								<button
									class="bg-blue-400 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none"
									@click.prevent="showModal(props.rowData)"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="pen"/>
									</font-awesome-layers>
								</button>
								<button
									class="bg-red-400 rounded-md text-gray-900 ml-2 hover:bg-red-500 focus:outline-none"
									@click.prevent="confirmDelete(props.rowData.id)"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="trash"/>
									</font-awesome-layers>
								</button>
							</template>
						</template>
					</vuetable>
				</div>
			</div>
		</div>

		<modal-account :account="selectedAccount"
					   :show="modalOpen"
					   @close="modalOpen = false"
					   @submit_success="submitFormSuccess"
		/>

		<modal-confirm @close="confirmOpen = false"
					   ref="deleteDialog"
					   title="Delete Account"
					   message="Are you sure you want to delete this account? This action cannot be undone"
		/>
	</div>
</template>

<script>
import Vuetable from 'vuetable-2'
import {mapActions} from 'vuex'

export default {
	middleware: 'admin',

	layout: 'master',

	components: {
		Vuetable,
	},

	activated() {
		this.$refs.vuetable.refresh()
	},

	data() {
		return {

			modalOpen: false,
			selectedAccount: {},

			httpOptions: {
				withCredentials: true,
			},

			url: `${process.env.BASE_URL}/admin/accounting/accounts`,

			fields: [
				{
					name: 'id',
					title: 'ID',
					titleClass: 'hidden lg:table-cell text-center text-sm lg:text-md',
					dataClass: 'hidden lg:table-cell text-center text-sm lg:text-md',
					sortField: 'id',
				},
				{
					name: 'name',
					title: 'Name',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md lg:text-center',
					sortField: 'name',
				},
				{
					name: 'is_active',
					title: 'Status',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md lg:text-center',
					callback: function (value) {
						return (value ? `<span class="text-green-500">active</span>` : `<span class="text-red-500">inactive</span>`)
					}
				},
				{
					name: 'balance',
					title: 'Balance',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md lg:text-center',
					sortField: 'balance',
					callback: function (value) {
						const color = value >= 0 ? 'text-green-400' : 'text-red-400'
						return `<span class="${color}">${(value / 100).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}</span>`
					}
				},
				{
					name: 'check_balance',
					title: 'Check',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md lg:text-center',
					sortField: 'check_balance',
					callback: function (value) {
						const color = value >= 0 ? 'text-green-400' : 'text-red-400'
						return `<span class="${color}">${(value / 100).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}</span>`
					}
				},
				{
					name: '__slot:actions',
					title: 'Actions',
					titleClass: 'text-center text-xs lg:text-sm',
					dataClass: 'text-center text-sm lg:text-md'
				}
			],

			sortOrder: [
				{
					field: 'id',
					direction: 'asc'
				},
			]
		}
	},

	methods: {
		...mapActions({
			getAccounts: 'accounts/getAccounts'
		}),

		submitFormSuccess(isNew) {
			let message = isNew ? 'successfully added account' : 'successfully updated account'

			this.$toast.success(message, {
				hideProgressBar: true,
			})

			this.modalOpen = false
			this.$refs.vuetable.refresh()
		},

		showModal(account) {
			this.selectedAccount = account
			this.modalOpen = true
		},

		confirmDelete(accountId) {
			this.$refs.deleteDialog.show({
				confirmAction() {
					return this.$axios.$delete(`/admin/accounting/accounts/${accountId}`)
				}
			}).then(() => {
				this.getAccounts()
				this.$refs.vuetable.refresh()
				this.$toast.success('account was successfully deleted', {
					hideProgressBar: true,
				})
			}).catch((rejected) => {
				if (rejected) {
					if (this.$refs.deleteDialog.error.response.status === 409)
						this.$toast.error(`the account you wish to delete may still have transactions/transfers, delete transactions/transfers with the account first`, {
							hideProgressBar: true
						})
					else
						this.$toast.error(`something went wrong. could not delete account`, {
							hideProgressBar: true
						})
				}
			})
		},
	}
}
</script>
