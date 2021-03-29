<template>
	<modal :show="show"
		   @close="$emit('close')"
	>
		<div class="divide-y">
			<div class="mt-1">
				<h3 class="text-center text-lg leading-6 font-medium text-gray-300">
					{{ title }}
				</h3>
				<div class="mt-2">
					<form class="space-y-8 divide-gray-200">
						<div class="mt-3 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
							<div class="sm:col-span-6">
								<label for="description"
									   class="block text-sm font-medium text-gray-500">
									Description
								</label>
								<div class="mt-1">
									<input type="text"
										   id="description"
										   ref="description"
										   class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
										   v-model="description"
									>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="type"
									   class="block text-sm font-medium text-gray-500">
									Type
								</label>
								<div class="mt-1 flex">
									<button type="button"
											class="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
											aria-pressed="false"
											aria-labelledby="type"
											:aria-checked="type"
											@click.prevent="type = !type"
											:class="type ? 'bg-blue-700' : 'bg-gray-200'"
											v-model="type"
									>
										<span aria-hidden="true"
											  class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
											  :class="type ? 'translate-x-5' : 'translate-x-0'"
										></span>
									</button>
									<span class="ml-3" id="type">
										<span class="text-sm font-medium text-gray-400">
											{{ type ? 'Income' : 'Expense' }}
										</span>
									</span>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="category"
									   class="block text-sm font-medium text-gray-500">
									Category
								</label>
								<div class="mt-1">
									<select id="category"
											name="category"
											class="w-full px-2 py-1 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
											v-model="category_id"
									>
										<option value="0"></option>
										<option v-for="category in selectedTypeCategories" :value="category.id">
											{{ category.name }}
										</option>
									</select>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="amount"
									   class="block text-sm font-medium text-gray-500">
									Amount
								</label>
								<div class="mt-1">
									<input type="number"
										   step="any"
										   id="amount"
										   class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700 text-right"
										   v-model="amount"
									>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="date"
									   class="block text-sm font-medium text-gray-500">
									Date
								</label>
								<div class="mt-1">
									<datetime class="theme-dark"
											  ref="dateTimePicker"
											  :week-start="7"
											  v-model="date"
									/>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="notes"
									   class="block text-sm font-medium text-gray-700"
								>
									Notes
								</label>
								<div class="mt-1">
									<textarea
										id="notes"
										rows="3"
										class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
										v-model="notes"
									></textarea>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div class="mt-6 pt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
				<button type="button"
						class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm">
					Save
				</button>
				<button type="button"
						class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
						@click.prevent="$emit('close')"
				>
					Cancel
				</button>
			</div>
		</div>
	</modal>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Modal from "~/components/modal/Modal";
import {Datetime} from 'vue-datetime'
import {DateTime} from 'luxon'

export default {
	props: {
		transaction: {
			type: Object
		},
		show: {
			required: true,
			type: Boolean
		}
	},

	components: {
		Modal,
		datetime: Datetime
	},

	data() {
		return {
			description: '',
			type: true,
			category_id: null,
			amount: 0,
			date: DateTime.local().toISODate(),
			notes: ''
		}
	},

	mounted() {
		this.getCategories()
	},

	computed: {
		title() {
			return (_.isEmpty(this.transaction) ? 'New Transaction' : 'Edit Transaction')
		},

		...mapGetters({
			incomeCategory: 'categories/incomeCategory',
			expenseCategory: 'categories/expenseCategory'
		}),

		selectedTypeCategories() {
			if (this.type)
				return this.incomeCategory
			else
				return this.expenseCategory
		},
	},

	methods: {
		setDefaultValues() {
			this.description = ''
			this.type = true
			this.category_id = null
			this.amount = 0
			this.date = DateTime.local().toISODate()
			this.notes = ''
		},

		...mapActions({
			getCategories: 'categories/getCategories'
		}),

	},

	watch: {
		show() {
			if (this.show) {
				if (_.isEmpty(this.transaction))
					this.setDefaultValues()
				this.$nextTick(() => {
					this.$refs.description.focus()
				})
			}
		},

		transactionIsIncome() {
			this.category = 0
		}
	}
}
</script>

<style>
.vdatetime-input {
	@apply w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700 text-right bg-white
}
</style>