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
									title="edit"
								>
									<font-awesome-layers class="fa-fw">
										<font-awesome-icon icon="pen"/>
									</font-awesome-layers>
								</button>
								<button
									class="bg-red-400 rounded-md text-gray-900 ml-2 hover:bg-red-500 focus:outline-none"
									@click.prevent="confirmDelete(props.rowData.id)"
									title="delete"
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

			modalOpen: false,

			httpOptions: {
				withCredentials: true,
			},

			url: `${process.env.BASE_URL}/admin/lists`,

			fields: [
				{
					name: 'username',
					title: 'Username',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md',
				},
				{
					name: 'full_name',
					title: 'Name',
					titleClass: 'text-center text-sm lg:text-md',
					dataClass: 'text-left text-sm lg:text-md',
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
			],
		}
	},
}
</script>
