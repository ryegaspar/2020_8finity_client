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
						<div class="flex flex-row mb-2">
							<vuetable-per-page :per-page-options="perPageOptions"
											   :selected="perPageSelected"
											   @perPageChanged="setPerPage"
							/>
							<!--							<transactions-table-filter @filterChanged="setFilter"/>-->
							<!--							<transactions-table-search @searchUpdated="setSearch"/>-->
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
							<button
								class="bg-blue-400 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none"
							>
								<font-awesome-layers class="fa-fw">
									<font-awesome-icon icon="pen"/>
								</font-awesome-layers>
							</button>
							<button
								class="bg-red-400 rounded-md text-gray-900 ml-2 hover:bg-red-500 focus:outline-none"
							>
								<font-awesome-layers class="fa-fw">
									<font-awesome-icon icon="trash"/>
								</font-awesome-layers>
							</button>
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

		<modal-category :transaction="selectedCategory"
						   :show="modalOpen"
						   :readonly="modalReadOnly"
						   @close="modalOpen = false"
						   @submitted="formSubmitted"
		/>

		<!--		<modal-confirm @close="confirmOpen = false"-->
		<!--					   ref="deleteDialog"-->
		<!--		/>-->
	</div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from "@/components/VuetablePagination";
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import TableIcon from "@/components/transactions/TableIcon";
import TableName from "@/components/categories/TableName";
// import TableAmount from "@/components/transactions/TableAmount";
// import {DateTime} from 'luxon'

Vue.component('table-icon', TableIcon)
Vue.component('table-name', TableName)
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
			selectedCategory: {},
			// confirmOpen: false,

			httpOptions: {
				withCredentials: true,
			},

			url: `${process.env.BASE_URL}/admin/categories`,

			perPageSelected: 50,

			perPageOptions: [10, 20, 50, 100, 500],

			moreParams: {},

			fields: [
				{
					name: 'id',
					title: 'ID',
					titleClass: 'hidden lg:table-cell text-center text-sm lg:text-md',
					dataClass: 'hidden lg:table-cell text-center text-sm lg:text-md',
					sortField: 'id',
				},
				{
					name: 'type',
					title: 'Type',
					titleClass: 'hidden sm:table-cell text-center text-sm lg:text-md',
					dataClass: 'hidden sm:table-cell text-center text-sm lg:text-md',
					sortField: 'type',
				},
				{
					name: '__component:table-name',
					title: 'Name',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md lg:text-center',
					sortField: 'name',
				},
				{
					name: '__component:table-icon',
					title: 'Icon',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-center text-sm lg:text-md',
				},
				{
					name: '__slot:actions',
					title: 'Actions',
					titleClass: 'text-center text-xs lg:text-sm',
					dataClass: 'text-center text-sm lg:text-md'
				}
			],

			// fields: [
			// 	{
			// 		name: 'id',
			// 		title: 'ID',
			// 		titleClass: 'text-center text-sm lg:text-md',
			// 		dataClass: 'text-center text-sm lg:text-md',
			// 		sortField: 'id'
			// 	},
			// 	{
			// 		name: 'description',
			// 		title: 'Description',
			// 		titleClass: 'hidden lg:table-cell text-xs lg:text-sm',
			// 		dataClass: 'hidden lg:table-cell text-left text-sm lg:text-md'
			// 	},
			// 	{
			// 		name: '__component:table-icon',
			// 		title: '',
			// 		dataClass: 'text-center text-sm lg:text-md'
			// 	},
			// 	{
			// 		name: 'category_name',
			// 		title: 'Category',
			// 		titleClass: 'hidden sm:table-cell text-xs lg:text-sm',
			// 		dataClass: 'hidden sm:table-cell text-center text-sm lg:text-md'
			// 	},
			// 	{
			// 		name: '__component:table-amount',
			// 		title: 'Amount',
			// 		sortField: 'amount',
			// 		titleClass: 'text-xs lg:text-sm',
			// 		dataClass: 'text-right text-sm lg:text-md'
			// 	},
			// 	{
			// 		title: 'By',
			// 		name: 'admin_username',
			// 		titleClass: 'hidden md:table-cell text-xs lg:text-sm',
			// 		dataClass: 'hidden md:table-cell text-center text-xs lg:text-sm',
			// 	},
			// 	{
			// 		name: 'date',
			// 		titleClass: 'hidden sm:table-cell text-xs lg:text-sm',
			// 		dataClass: 'hidden sm:table-cell text-center text-sm lg:text-md',
			// 		sortField: 'date',
			// 		callback: 'toDate'
			// 	},
			// 	{
			// 		name: '__slot:actions',
			// 		title: 'Actions',
			// 		titleClass: 'text-center text-xs lg:text-sm',
			// 		dataClass: 'text-center text-sm lg:text-md'
			// 	}
			// ],
			//
			sortOrder: [
				{
					field: 'id',
					direction: 'asc'
				},
			]
		}
	},

	methods: {
		formSubmitted() {
			this.modalOpen = false
			this.$refs.vuetable.refresh()

			this.$toast.success('a category was successfully added', {
				hideProgressBar: true,
			})
		},
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
		//
		// setFilter(option) {
		// 	this.moreParams.filter = option
		// 	this.$nextTick(() => this.$refs.vuetable.refresh())
		// },
		//
		// setSearch(text) {
		// 	this.moreParams.search = text
		// 	this.$nextTick(() => this.$refs.vuetable.refresh())
		// },

		showModal(transaction, readonly = false) {
			this.selectedTransaction = transaction
			// this.modalReadOnly = readonly
			this.modalOpen = true
		},

		// confirmDelete(transaction) {
		// 	this.$refs.deleteDialog.show({
		// 		confirmAction() {
		// 			return this.$axios.$delete(`/admin/transactions/${transaction.id}`)
		// 		}
		// 	}).then(() => {
		// 		this.$refs.vuetable.refresh()
		// 		this.$toast.success('transaction was successfully deleted', {
		// 			hideProgressBar: true,
		// 		})
		// 	}).catch((e) => {
		// 		if (e)
		// 			console.log('fail')
		// 	})
		// },
	}
}
</script>

<style>
.vuetable {
	@apply min-w-full static border-gray-900
}

.vuetable > thead > tr > th {
	@apply px-5 py-2 bg-gray-900 font-medium text-gray-400 uppercase tracking-wider
}

.vuetable-body > tr > td {
	@apply px-4 py-2 font-medium text-gray-300
}

.vuetable-body > tr:nth-child(odd) {
	@apply bg-gray-700
}

.vuetable-body > tr:nth-child(even) {
	@apply bg-gray-800
}
</style>
