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
				<div class="mt-8 shadow overflow-hidden">
					<div class="flex sm:flex-row flex-col">
						<div class=" flex flex-row mb-2">
							<table-filters-paging :per-page-options="perPageOptions"
												  :selected="perPageSelected"
												  @perPageChanged="setPerPage"
							/>
							<table-filters-dropdown @filterChanged="setType"
													@filterRemoved="removeType"
													title="type"
													:selections="typeSelections"
							/>
							<table-filters-search @searchUpdated="setSearch"
												  extraClass="rounded-r-lg"
							/>
						</div>
					</div>
					<vuetable ref="vuetable"
							  :http-options="httpOptions"
							  :sort-order="sortOrder"
							  :api-url="url"
							  :fields="fields"
							  pagination-path=""
							  @vuetable:pagination-data="onPaginationData"
							  :per-page="perPageSelected"
							  :append-params="moreParams"
							  :multi-sort="true"
					>
						<template slot="actions" slot-scope="props">
							<div v-if="$auth.user.id === props.rowData.admin_id && props.rowData.status === 'pending'">
								<button
									class="bg-green-400 rounded-md text-gray-900 hover:bg-green-500 focus:outline-none mr-1"
									@click.prevent="confirmClear(props.rowData)"
									title="clear"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="check-circle"/>
									</font-awesome-layers>
								</button>

								<button
									class="bg-red-400 rounded-md text-gray-900 hover:bg-red-500 focus:outline-none mr-1"
									@click.prevent="confirmCancel(props.rowData)"
									title="cancel"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="times-circle"/>
									</font-awesome-layers>
								</button>

								<button
									class="bg-blue-400 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none mr-1"
									@click.prevent="showModal(props.rowData)"
									title="edit"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="pen"/>
									</font-awesome-layers>
								</button>
								<button
									class="bg-red-400 rounded-md text-gray-900 hover:bg-red-500 focus:outline-none"
									@click.prevent="confirmDelete(props.rowData)"
									title="delete"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="trash"/>
									</font-awesome-layers>
								</button>
							</div>
							<div v-else>
								<button
									class="bg-green-400 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none"
									@click.prevent="showModal(props.rowData, true)"
									title="view"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="eye"/>
									</font-awesome-layers>
								</button>
							</div>
						</template>
					</vuetable>
					<div class="block sm:flex sm:flex-row-reverse justify-between mt-4">
						<vuetable-pagination ref="pagination"
											 @vuetable-pagination:change-page="onChangePage"
											 class="flex"
						></vuetable-pagination>
						<vuetable-pagination-info ref="paginationInfo"
												  class="text-xs sm:text-base mt-2 sm:mt-0"
						/>
					</div>
				</div>
			</div>
		</div>

		<modal-check :check="selectedCheck"
					 :show="modalOpen"
					 :readonly="modalReadOnly"
					 @close="modalOpen = false"
					 @submit_success="submitFormSuccess"
		/>

		<modal-confirm @close="confirmDeleteOpen = false"
					   ref="deleteDialog"
					   title="Delete Check"
					   message="Are you sure you want to delete this check? This action cannot be undone"
		/>

		<modal-confirm @close="confirmClearCheckOpen = false"
					   ref="clearCheckDialog"
					   title="Clear Check"
					   message="Are you sure you want to clear this check? When checks are marked as cleared, a transaction will be created on the same amount and account and you will no longer be able to edit this check.  This action cannot be undone"
					   confirmButtonText="Clear Check"
		/>

		<modal-confirm @close="confirmCancelCheckOpen = false"
					   ref="cancelCheckDialog"
					   title="Cancel Check"
					   message="Are you sure you want to cancel this check? When checks are marked as cancelled, you will no longer be able to edit this check.  This action cannot be undone"
					   confirmButtonText="Cancel Check"
		/>
	</div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from "@/components/VuetablePagination"
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import TableIcon from "@/components/transactions/TableIcon"
import TableAmount from "@/components/transactions/TableAmount"
import {DateTime} from 'luxon'

Vue.component('table-icon', TableIcon)
Vue.component('table-amount', TableAmount)

export default {
	middleware: 'admin',

	layout: 'master',

	components: {
		Vuetable,
		VuetablePagination,
		VuetablePaginationInfo
	},

	data() {
		return {

			modalOpen: false,
			modalReadOnly: false,
			selectedCheck: {},
			confirmDeleteOpen: false,
			confirmClearCheckOpen: false,
			confirmCancelCheckOpen: false,

			httpOptions: {
				withCredentials: true,
			},

			url: `${process.env.BASE_URL}/admin/accounting/checks`,

			perPageSelected: 50,

			perPageOptions: [10, 20, 50, 100, 500],

			moreParams: {},

			fields: [
				{
					name: 'id',
					title: 'ID',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-center text-sm lg:text-md',
					sortField: 'id'
				},
				{
					name: 'description',
					title: 'Description',
					titleClass: 'hidden lg:table-cell text-xs lg:text-sm',
					dataClass: 'hidden lg:table-cell text-left text-sm lg:text-md'
				},
				{
					name: '__component:table-icon',
					title: '',
					dataClass: 'text-center text-sm lg:text-md'
				},
				{
					name: 'category_name',
					title: 'Category',
					titleClass: 'hidden sm:table-cell text-xs lg:text-sm',
					dataClass: 'hidden sm:table-cell text-center text-sm lg:text-md'
				},
				{
					name: 'account_name',
					title: 'Account',
					titleClass: 'hidden sm:table-cell text-xs lg:text-sm',
					dataClass: 'hidden sm:table-cell text-center text-sm lg:text-md'
				},
				{
					title: 'Status',
					name: 'status',
					titleClass: 'lg:table-cell text-xs lg:text-sm',
					dataClass: 'lg:table-cell text-center text-sm lg:text-md',
					callback: function (value) {
						if (value === 'pending')
							return `<span class="text-yellow-500">pending</span>`

						if (value === 'cleared')
							return `<span class="text-green-500">cleared</span>`

						return `<span class="text-red-500">cancelled</span>`
					}
				},
				{
					name: '__component:table-amount',
					title: 'Amount',
					sortField: 'amount',
					titleClass: 'text-xs lg:text-sm',
					dataClass: 'text-right text-sm lg:text-md'
				},
				{
					name: 'due_date',
					title: 'Due Date',
					titleClass: 'hidden md:table-cell text-xs lg:text-sm',
					dataClass: 'hidden md:table-cell text-center text-sm lg:text-md',
					sortField: 'due_date',
					callback: function (value) {
						const dueDate = DateTime.fromISO(value, {setZone: true})
						const today = DateTime.now()

						if (today.startOf('day') > dueDate.startOf('day')) {
							return `<span class="text-red-500">${dueDate.toLocaleString(DateTime.DATE_MED)}</span>`
						}

						return `<span class="text-green-400">${dueDate.toLocaleString(DateTime.DATE_MED)}</span>`
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
					field: 'due_date',
					direction: 'desc'
				},
				{
					field: 'id',
					direction: 'desc'
				}
			],

			typeSelections: [
				{
					id: 1,
					name: 'income'
				},
				{
					id: 2,
					name: 'expense'
				}
			]
		}
	},

	methods: {
		onPaginationData(paginationData) {
			this.$refs.pagination.setPaginationData(paginationData)
			this.$refs.paginationInfo.setPaginationData(paginationData)
		},

		onChangePage(page) {
			this.$refs.vuetable.changePage(page)
		},

		setPerPage(page) {
			this.perPageSelected = page
			this.$nextTick(() => {
				this.$refs.vuetable.refresh()
			})
		},

		setType(option) {
			if (option.id === 1) {
				this.moreParams.type = 'income'
			} else {
				this.moreParams.type = 'expense'
			}

			this.$nextTick(() => this.$refs.vuetable.refresh())
		},

		removeType() {
			this.moreParams.type = 'all'
			this.$nextTick(() => this.$refs.vuetable.refresh())
		},

		setSearch(text) {
			this.moreParams.search = text
			this.$nextTick(() => this.$refs.vuetable.refresh())
		},

		showModal(check, readonly = false) {
			this.selectedCheck = check
			this.modalReadOnly = readonly
			this.modalOpen = true
		},

		submitFormSuccess(isNew) {
			let message = isNew ? 'successfully added check' : 'successfully updated check'

			this.$toast.success(message, {
				hideProgressBar: true,
			})

			this.modalOpen = false
			this.$refs.vuetable.refresh()
		},

		confirmDelete(check) {
			this.$refs.deleteDialog.show({
				confirmAction() {
					return this.$axios.$delete(`/admin/accounting/checks/${check.id}`)
				}
			}).then(() => {
				this.$refs.vuetable.refresh()
				this.$toast.success('check was successfully deleted', {
					hideProgressBar: true,
				})
			}).catch((e) => {
				if (e) {
					if (this.$refs.deleteDialog.error.response.status === 403)
						this.$toast.error(`cannot delete check, you do not own the check or the check is cleared/cancelled`, {
							hideProgressBar: true
						})
				}
			})
		},

		confirmClear(check) {
			this.$refs.clearCheckDialog.show({
				confirmAction() {
					return this.$axios.$patch(`/admin/accounting/checks/process/${check.id}`)
				}
			}).then(() => {
				this.$refs.vuetable.refresh()
				this.$toast.success('check was successfully cleared, a transaction was also created', {
					hideProgressBar: true,
				})
			}).catch((e) => {
				if (e) {
					if (this.$refs.deleteDialog.error.response.status === 403)
						this.$toast.error(`cannot clear check, you do not own the check.`, {
							hideProgressBar: true
						})
				}
			})
		},

		confirmCancel(check) {
			this.$refs.cancelCheckDialog.show({
				confirmAction() {
					return this.$axios.$delete(`/admin/accounting/checks/process/${check.id}`)
				}
			}).then(() => {
				this.$refs.vuetable.refresh()
				this.$toast.success('check was successfully cancelled', {
					hideProgressBar: true,
				})
			}).catch((e) => {
				if (e) {
					if (this.$refs.deleteDialog.error.response.status === 403)
						this.$toast.error(`cannot cancel check, you do not own the check.`, {
							hideProgressBar: true
						})
				}
			})
		}
	}
}
</script>
