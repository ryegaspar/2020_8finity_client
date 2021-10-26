<template>
	<div class="px-4 md:px-0 mb-16 mt-4 text-gray-400 leading-normal">
		<div class="w-full px-3 py-1 sm:py-3">
			<div class="flex justify-between">
				<div>&nbsp;</div>
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
							<table-filters-dropdown @filterChanged="setAction"
													@filterRemoved="removeAction"
													title="action"
													:selections="actionSelections"
													extraClass="rounded-r-lg"
							/>
						</div>
					</div>
					<vuetable ref="vuetable"
							  :http-options="httpOptions"
							  :sort-order="sortOrder"
							  :api-url="url"
							  :fields="fields"
							  pagination-path="meta"
							  @vuetable:pagination-data="onPaginationData"
							  :per-page="perPageSelected"
							  :append-params="moreParams"
							  :multi-sort="true"
					>
						<template slot="actions" slot-scope="props">
							<button
								class="bg-blue-400 rounded-md text-gray-900 hover:bg-blue-500 focus:outline-none"
								title="view details"
								@click.prevent="showModal(props.rowData)"
							>
								<font-awesome-layers class="fa-fw">
									<font-awesome-icon icon="eye"/>
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

		<modal-log :log="selectedLog"
				   :show="modalOpen"
				   @close="modalOpen = false"
		/>

	</div>
</template>

<script>
import Vue from 'vue'
import Vuetable from 'vuetable-2'
import VuetablePagination from "@/components/VuetablePagination"
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import {DateTime} from 'luxon'

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
			// modalReadOnly: false,
			selectedLog: {},
			// confirmOpen: false,

			httpOptions: {
				withCredentials: true,
			},

			url: `${process.env.BASE_URL}/admin/accounting/logs`,

			perPageSelected: 50,

			perPageOptions: [10, 20, 50, 100, 500],

			moreParams: {},

			fields: [
				{
					name: 'admin_username',
					title: 'Username',
					titleClass: 'hidden lg:table-cell text-xs lg:text-sm',
					dataClass: 'hidden lg:table-cell text-left text-sm lg:text-md',
				},
				{
					name: 'loggable_type',
					title: 'Type',
					titleClass: 'text-xs lg:text-sm',
					dataClass: 'text-left text-sm lg:text-md',
				},
				{
					name: 'action',
					title: 'Action',
					titleClass: 'text-xs lg:text-sm',
					dataClass: 'text-center text-sm lg:text-md',
					callback: function (value) {
						if (value === 'created') {
							return `<span class="text-green-500">created</span>`
						}

						if (value === 'updated') {
							return `<span class="text-blue-500">updated</span>`
						}

						return `<span class="text-red-500">deleted</span>`
					}
				},
				{
					name: 'loggable_id',
					title: 'Target ID',
					titleClass: 'text-xs lg:text-sm',
					dataClass: 'text-center text-sm lg:text-md',
				},
				{
					name: 'created_at',
					title: 'Date',
					titleClass: 'hidden md:table-cell text-xs lg:text-sm',
					dataClass: 'hidden md:table-cell text-center text-sm lg:text-md',
					sortField: 'created_at',
					callback: function (value) {
						return DateTime.fromISO(value, {setZone: true})
							.toLocaleString({
								weekday: 'short',
								month: 'short',
								day: '2-digit',
								hour: '2-digit',
								minute: '2-digit'
							})
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
					field: 'created_at',
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
					name: 'Account'
				},
				{
					id: 2,
					name: 'Transaction'
				},
				{
					id: 3,
					name: 'Transfer'
				},
				{
					id: 4,
					name: 'Check'
				},
				{
					id: 5,
					name: 'Category'
				},
			],

			actionSelections: [
				{
					id: 1,
					name: 'created'
				},
				{
					id: 2,
					name: 'updated'
				},
				{
					id: 3,
					name: 'deleted'
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
			this.moreParams.type = this.typeSelections.find(i => i.id === option.id).name

			this.$nextTick(() => this.$refs.vuetable.refresh())
		},

		removeType() {
			this.moreParams.type = ''
			this.$nextTick(() => this.$refs.vuetable.refresh())
		},

		setAction(action) {
			this.moreParams.action = this.actionSelections.find(i => i.id === action.id).name

			this.$nextTick(() => this.$refs.vuetable.refresh())
		},

		removeAction() {
			this.moreParams.action = ''
			this.$nextTick(() => this.$refs.vuetable.refresh())
		},

		showModal(log) {
			this.selectedLog = log
			this.modalOpen = true
		},
	}
}
</script>
