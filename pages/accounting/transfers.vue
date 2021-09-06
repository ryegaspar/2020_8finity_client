<template>
	<div class="px-4 md:px-0 mb-16 mt-4 text-gray-400 leading-normal">
		<div class="w-full px-3 py-1 sm:py-3">
			<button
				class="relative bg-gray-900 border border-gray-600 text-gray-600 py-2 px-3 rounded-lg items-center flex justify-between hover:border-blue-600 hover:text-blue-600 focus:outline-none"
				@click.prevent="showModal({})"
			>
				<font-awesome-layers class="fa-fw mr-1">
					<font-awesome-icon icon="plus-circle"/>
				</font-awesome-layers>
				New
			</button>

			<div class="flex flex-col">
				<div class="mt-8 shadow overflow-hidden sm:rounded-lg">
					<div class="flex sm:flex-row flex-col">
						<div class=" flex flex-row mb-2">
							<vuetable-per-page :per-page-options="perPageOptions"
											   :selected="perPageSelected"
											   @perPageChanged="setPerPage"
							/>
							<transactions-table-filter @filterChanged="setType"/>
							<transactions-table-search @searchUpdated="setSearch"/>
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
<!--						<template slot="actions" slot-scope="props">-->
<!--							<div v-if="$auth.user.id === props.rowData.admin_id">-->
<!--								<button-->
<!--									class="bg-blue-400 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none"-->
<!--									@click.prevent="showModal(props.rowData)"-->
<!--								>-->
<!--									<font-awesome-layers class="fa-fw">-->
<!--										<font-awesome-icon icon="pen"/>-->
<!--									</font-awesome-layers>-->
<!--								</button>-->
<!--								<button-->
<!--									class="bg-red-400 rounded-md text-gray-900 ml-2 hover:bg-red-500 focus:outline-none"-->
<!--									@click.prevent="confirmDelete(props.rowData)"-->
<!--								>-->
<!--									<font-awesome-layers class="fa-fw">-->
<!--										<font-awesome-icon icon="trash"/>-->
<!--									</font-awesome-layers>-->
<!--								</button>-->
<!--							</div>-->
<!--							<div v-else>-->
<!--								<button-->
<!--									class="bg-green-400 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none"-->
<!--									@click.prevent="showModal(props.rowData, true)"-->
<!--								>-->
<!--									<font-awesome-layers class="fa-fw">-->
<!--										<font-awesome-icon icon="eye"/>-->
<!--									</font-awesome-layers>-->
<!--								</button>-->
<!--							</div>-->
<!--						</template>-->
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

<!--		<modal-transaction :transaction="selectedTransaction"-->
<!--						   :show="modalOpen"-->
<!--						   :readonly="modalReadOnly"-->
<!--						   @close="modalOpen = false"-->
<!--						   @submit_success="submitFormSuccess"-->
<!--		/>-->

<!--		<modal-confirm @close="confirmOpen = false"-->
<!--					   ref="deleteDialog"-->
<!--					   title="Delete Transaction"-->
<!--					   message="Are you sure you want to delete this transaction? This action cannot be undone"-->
<!--		/>-->
	</div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from "@/components/VuetablePagination"
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
// import TableIcon from "@/components/transactions/TableIcon"
// import TableAmount from "@/components/transactions/TableAmount"
import {DateTime} from 'luxon'

// Vue.component('table-icon', TableIcon)
// Vue.component('table-amount', TableAmount)

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
			selectedTransaction: {},
			confirmOpen: false,

			httpOptions: {
				withCredentials: true,
			},

			url: `${process.env.BASE_URL}/admin/accounting/transfers`,

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
					name: 'from_account_name',
					title: 'From',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-center text-sm lg:text-md'
				},
				{
					name: 'to_account_name',
					title: 'To',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-center text-sm lg:text-md'
				},
				{
					title: 'By',
					name: 'admin_username',
					titleClass: 'hidden lg:table-cell text-center text-xs lg:text-sm',
					dataClass: 'hidden lg:table-cell text-center text-left text-sm lg:text-md',
				},
				{
					name: 'amount',
					title: 'Amount',
					sortField: 'amount',
					titleClass: 'text-xs lg:text-sm',
					dataClass: 'text-right text-sm lg:text-md',
					callback: function (value) {
						return (value / 100).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					}
				},
				{
					name: 'date',
					titleClass: 'hidden md:table-cell text-xs lg:text-sm',
					dataClass: 'hidden md:table-cell text-center text-sm lg:text-md',
					sortField: 'date',
					callback: function(value) {
						return DateTime.fromISO(value, {setZone: true}).toLocaleString(DateTime.DATE_MED)
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
					field: 'date',
					direction: 'desc'
				},
				{
					field: 'id',
					direction: 'desc'
				}
			]
		}
	},

	methods: {
		// submitFormSuccess(isNew) {
		// 	let message = isNew ? 'successfully added transaction' : 'successfully updated transaction'
		//
		// 	this.$toast.success(message, {
		// 		hideProgressBar: true,
		// 	})
		//
		// 	this.modalOpen = false
		// 	this.$refs.vuetable.refresh()
		// },
		//
		// toDate(value) {
		// 	return DateTime.fromISO(value, {setZone: true}).toLocaleString(DateTime.DATE_MED)
		// },
		//
		// toCurrency(value) {
		// 	return (value / 10).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
		// },
		//
		// formatType(value) {
		// 	return (value === 'income' ? `<span class="text-green-400">income</span>` : `<span class="text-red-400">expense</span>`)
		// },
		//
		// onPaginationData(paginationData) {
		// 	this.$refs.pagination.setPaginationData(paginationData)
		// 	this.$refs.paginationInfo.setPaginationData(paginationData)
		// },
		//
		// onChangePage(page) {
		// 	this.$refs.vuetable.changePage(page)
		// },
		//
		// setPerPage(page) {
		// 	this.perPageSelected = page
		// 	this.$nextTick(() => {
		// 		this.$refs.vuetable.refresh()
		// 	})
		// },
		//
		// setType(option) {
		// 	this.moreParams.type = option
		// 	this.$nextTick(() => this.$refs.vuetable.refresh())
		// },
		//
		// setSearch(text) {
		// 	this.moreParams.search = text
		// 	this.$nextTick(() => this.$refs.vuetable.refresh())
		// },
		//
		// showModal(transaction, readonly = false) {
		// 	this.selectedTransaction = transaction
		// 	this.modalReadOnly = readonly
		// 	this.modalOpen = true
		// },
		//
		// confirmDelete(transaction) {
		// 	this.$refs.deleteDialog.show({
		// 		confirmAction() {
		// 			return this.$axios.$delete(`/admin/accounting/transactions/${transaction.id}`)
		// 		}
		// 	}).then(() => {
		// 		this.$refs.vuetable.refresh()
		// 		this.$toast.success('transaction was successfully deleted', {
		// 			hideProgressBar: true,
		// 		})
		// 	}).catch((e) => {
		// 		if (e) {
		// 			if (this.$refs.deleteDialog.error.response.status === 403)
		// 				this.$toast.error(`cannot delete transaction, you do not own the transaction.`, {
		// 					hideProgressBar: true
		// 				})
		// 		}
		// 	})
		// },
	}
}
</script>
