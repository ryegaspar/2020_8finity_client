<template>
	<div class="px-4 md:px-0 mb-16 mt-4 text-gray-400 leading-normal">
		<div class="w-full px-3 py-1 sm:py-3">
			<button
				class="relative bg-gray-900 border border-gray-600 text-gray-600 py-2 px-3 rounded-lg items-center flex justify-between hover:border-blue-700 hover:text-blue-700"
			>
				<font-awesome-layers class="fa-fw mr-1">
					<font-awesome-icon icon="plus-circle"/>
				</font-awesome-layers>
				New
			</button>

			<data-table
				:columns="columns"
				:url=url
				:classes="classes"
				:per-page="['10','25','50','100']"
				:debounce-delay=1000
				ref="myTable"
			>
				<div slot="filters"
					 slot-scope="{tableData = {}, perPage = []}"
					 class="flex flex-row mb-1 sm:mb-0 mt-2"
				>
					<div class="my-2 flex sm:flex-row flex-col">
						<div class="flex flex-row mb-1 sm:mb-0">
							<per-page :per-page="perPage"
									  :table-length="tableData.length"
									  @changePerPage="(r) => {tableData.length = r}"
							/>
							<filter-transactions :filter-selections="filterSelections"
												 :value="tableData.filters.income"
												 @change="(f) => {tableData.filters.income = f.value;reloadTable()}"
							/>
							<div class="relative h-full">
                        		<span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                            		<svg viewBox="0 0 24 24" class="h-4 w-4 fill-current text-gray-500">
                                		<path
											d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                            		</svg>
                        		</span>
								<input
									placeholder="Search"
									v-model="tableData.search"
									class="rounded-r rounded-l sm:rounded-l-none border border-gray-800 border-b block pl-8 pr-6 w-full h-full bg-gray-900 text-sm placeholder-gray-400 text-gray-400 focus:border-blue-700 focus:outline-none"/>
							</div>
						</div>
					</div>
				</div>

				<div
					slot="pagination"
					slot-scope="{ links = {}, meta = {} }"
					class="px-5 py-5 bg-gray-900 border-t flex flex-col xs:flex-row items-center border-gray-700 xs:justify-between rounded-b">
                <span class="text-xs xs:text-sm text-gray-900">
                    Showing {{ meta.from }} to {{ meta.to }} of {{ meta.total }} Entries
                </span>
					<div class="inline-flex mt-2 xs:mt-0">
						<button
							:disabled="!links.prev"
							@click="url = links.prev"
							:class="{ 'opacity-50': !links.prev, 'cursor-not-allowed': !links.prev }"
							class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
							Prev
						</button>
						<button
							:disabled="!links.next"
							@click="url = links.next"
							:class="{ 'opacity-50': !links.next, 'cursor-not-allowed': !links.next }"
							class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
							Next
						</button>
					</div>
				</div>

			</data-table>
		</div>
	</div>
</template>

<script>
export default {
	middleware: 'admin',

	layout: 'master',

	mounted() {
	},

	methods: {
		reloadTable() {
			this.$refs.myTable.getData()
		}
	},

	data() {
		return {

			url: `${process.env.BASE_URL}/admin/transactions`,

			columns: [
				{
					label: '',
					name: 'category.icon',
				},
				{
					label: 'Description',
					name: 'description'
				},
				{
					label: 'Type',
					name: 'category.type',
					orderable: true
				},
				{
					label: 'Category',
					name: 'category.description'
				},
				{
					label: 'Amount',
					name: 'amount'
				},
				{
					label: 'Date',
					name: 'date',
					orderable: true
				},
			],

			filters: {
				income: ''
			},

			filterSelections: [
				{
					description: 'All',
					value: ''
				},
				{
					description: 'Income',
					value: 'in'
				},
				{
					description: 'Expense',
					value: 'out'
				}
			],

			selectedFilter: 'None',

			classes: {
				'table-container': {
					'justify-center': true,
					'w-full': true,
					'flex': true,
					"border-gray-700": true,
					'inline-block': true,
					'min-w-full': true,
					'overflow-hidden': true,
				},
				table: {
					'text-left': true,
					'w-full': true,
				},
				"t-body": {
					'bg-gray-800': true,
				},
				"t-head-tr": {
					'border-b': true,
					'border-gray-700': true,
				},
				"t-body-tr": {
					'stripped-table': true,
					'bg-grey-darkest': true,
				},
				"td": {
					'py-4': true,
					'px-6': true,
					'border-b': true,
					'border-gray-700': true,
					'text-gray-light': true,
				},
				"th": {
					'text-gray-dark': true,
					'border-gray-700': true,
					'border-b-2': true,
					'border-gray-200': true,
					'py-3': true,
					'px-4': true,
					'bg-gray-900': true,
					'text-left': true,
					'text-xs': true,
					'font-semibold': true,
					'text-gray-600': true,
					'uppercase': true,
					'tracking-wider': true,
				},
			}
		}
	},
}
</script>
