<template>
	<div class="px-4 md:px-0 mb-16 mt-4 text-gray-400 leading-normal">
		<div class="w-full px-3 py-1 sm:py-3">
<!--			<button-->
<!--				class="relative bg-gray-900 border border-gray-600 text-gray-600 py-2 px-3 rounded-lg items-center flex justify-between hover:border-blue-600 hover:text-blue-600 focus:outline-none"-->
<!--				@click.prevent="showModal({})"-->
<!--			>-->
<!--				<font-awesome-layers class="fa-fw mr-1">-->
<!--					<font-awesome-icon icon="plus-circle"/>-->
<!--				</font-awesome-layers>-->
<!--				New-->
<!--			</button>-->

			<div class="flex flex-col">
				<div class="mt-8 shadow overflow-hidden sm:rounded-lg">
					<vuetable ref="vuetable"
							  :http-options="httpOptions"
							  :sort-order="sortOrder"
							  :api-url="url"
							  :fields="fields"
							  pagination-path=""
							  per-page=50
							  :multi-sort="false"
					>
						<template slot="actions"
								  slot-scope="props"
						>
							<template>
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
<!--									@click.prevent="confirmDelete(props.rowData.id)"-->
<!--								>-->
<!--									<font-awesome-layers class="fa-fw">-->
<!--										<font-awesome-icon icon="trash"/>-->
<!--									</font-awesome-layers>-->
<!--								</button>-->
							</template>
						</template>
					</vuetable>
				</div>
			</div>
		</div>

<!--		<modal-category :category="selectedCategory"-->
<!--						:show="modalOpen"-->
<!--						:readonly="modalReadOnly"-->
<!--						@close="modalOpen = false"-->
<!--						@submit_success="submitFormSuccess"-->
<!--		/>-->

<!--		<modal-confirm @close="confirmOpen = false"-->
<!--					   ref="deleteDialog"-->
<!--					   title="Delete Category"-->
<!--					   message="Are you sure you want to delete this category? This action cannot be undone"-->
<!--		/>-->
	</div>
</template>

<script>
import Vuetable from 'vuetable-2'

export default {
	middleware: 'admin',

	layout: 'master',

	components: {
		Vuetable,
	},

	data() {
		return {

			// modalOpen: false,
			// modalReadOnly: false,
			// selectedCategory: {},

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
					titleClass: 'hidden sm:table-cell text-center text-sm lg:text-md',
					dataClass: 'hidden sm:table-cell text-center text-sm lg:text-md',
					sortField: 'name',
				},
				{
					name: 'amount',
					title: 'Amount',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md lg:text-center',
					sortField: 'amount',
					callback: function(value) {
						return (value/100).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})
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
		// submitFormSuccess(isNew) {
		// 	let message = isNew ? 'successfully added category' : 'successfully updated category'
		//
		// 	this.$toast.success(message, {
		// 		hideProgressBar: true,
		// 	})
		//
		// 	this.modalOpen = false
		// 	this.$refs.vuetable.refresh()
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
		// showModal(category) {
		// 	this.selectedCategory = category
		// 	this.modalOpen = true
		// },
		//
		// confirmDelete(categoryId) {
		// 	this.$refs.deleteDialog.show({
		// 		confirmAction() {
		// 			return this.$axios.$delete(`/admin/accounting/categories/${categoryId}`)
		// 		}
		// 	}).then(() => {
		// 		this.$refs.vuetable.refresh()
		// 		this.$toast.success('category was successfully deleted', {
		// 			hideProgressBar: true,
		// 		})
		// 	}).catch((rejected) => {
		// 		if (rejected) {
		// 			if (this.$refs.deleteDialog.error.response.status === 409)
		// 				this.$toast.error(`the category you wish to delete has transactions, if you wish to remove this category you need to remove its transaction/s first`, {
		// 					hideProgressBar: true
		// 				})
		// 			else
		// 				this.$toast.error(`something went wrong. could not delete category`, {
		// 					hideProgressBar: true
		// 				})
		// 		}
		// 	})
		// },
	}
}
</script>
