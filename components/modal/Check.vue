<template>
	<modal :show="show"
		   @close="closeModal"
	>
		<div>
			<div class="mt-1">
				<h3 class="text-center text-lg leading-6 font-medium text-gray-300">
					{{ title }}
				</h3>
				<div class="mt-2 space-y-8 divide-gray-200">
					<form class="divide-y"
						  @submit.prevent="submitForm"
					>
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
										   v-model="form.description"
										   :disabled="this.readonly"
									>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('description')"
									>
										{{ form.errors.get('description') }}
									</div>
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
											:aria-checked="form.type"
											@click.prevent="toggleType"
											:class="form.type ? 'bg-blue-700' : 'bg-gray-200'"
											v-model="form.type"
									>
										<span aria-hidden="true"
											  class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
											  :class="form.type ? 'translate-x-5' : 'translate-x-0'"
										></span>
									</button>
									<span class="ml-3" id="type">
										<span class="text-sm font-medium text-gray-400">
											{{ form.type ? 'Income' : 'Expense' }}
										</span>
									</span>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="account"
									   class="block text-sm font-medium text-gray-500">
									Account
								</label>
								<div class="mt-1">
									<select id="account"
											name="account"
											class="w-full px-2 py-1 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
											v-model="form.account_id"
											:disabled="this.readonly"
									>
										<option value="0"></option>
										<option v-for="account in accounts"
												:value="account.id"
												:key="account.id"
										>
											{{ account.name }}
										</option>
									</select>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('account_id')"
									>
										{{ form.errors.get('account_id') }}
									</div>
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
											v-model="form.category_id"
											:disabled="this.readonly"
									>
										<option value="0"></option>
										<option v-for="category in selectedTypeCategories"
												:value="category.id"
												:key="category.id"
										>
											{{ category.name }}
										</option>
									</select>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('category_id')"
									>
										{{ form.errors.get('category_id') }}
									</div>
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
										   min="1"
										   max="10000000"
										   id="amount"
										   class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700 text-right"
										   v-model="form.amount"
										   :disabled="this.readonly"
									>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('amount')"
									>
										{{ form.errors.get('amount') }}
									</div>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="date"
									   class="block text-sm font-medium text-gray-500">
									Due Date
								</label>
								<div class="mt-1">
									<datetime class="theme-dark"
											  ref="dateTimePicker"
											  :week-start="7"
											  :value="form.due_date"
											  @input="setDate"
											  :disabled="this.readonly"
									/>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('due_date')"
									>
										{{ form.errors.get('due_date') }}
									</div>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="notes"
									   class="block text-sm font-medium text-gray-500"
								>
									Notes
								</label>
								<div class="mt-1">
									<textarea
										id="notes"
										rows="3"
										class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
										v-model="form.notes"
										:disabled="this.readonly"
									></textarea>
								</div>
							</div>

							<div class="col-span-6 block text-sm font-medium text-gray-500"
								 v-if="this.readonly"
							>
								<template v-if="check.status === 'pending'">
									only <i>{{ check.admin_username }}</i> can modify this transaction
								</template>
								<template v-else>
									check has been <span :class="{'text-green-500' : check.status=== 'cleared', 'text-red-500': check.status=== 'cancelled'}">{{ check.status }}</span>, only pending checks can be modified.
								</template>
							</div>
							<div class="col-span-6 block text-sm font-medium text-gray-500"
								 v-if="check.status === 'cleared'"
							>
								Transaction #: {{ check.transaction_id }}
							</div>
						</div>
						<div class="mt-6 pt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
							<template v-if="!this.readonly">
								<button type="submit"
										class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
										v-promise-btn
										@click.prevent="submitForm"
								>
									{{ (isNew ? 'Add' : 'Update') }}
								</button>
								<button type="button"
										class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
										@click.prevent="closeModal"
								>
									Cancel
								</button>
							</template>
							<template v-else>
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
import {mapGetters, mapActions} from 'vuex'
import Modal from "~/components/modal/Modal"
import {Datetime} from 'vue-datetime'
import {DateTime} from 'luxon'
import Form from "~/utilities/Form"

export default {
	props: {
		check: {
			type: Object
		},
		readonly: {
			type: Boolean,
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
			form: new Form({
				description: '',
				type: true,
				category_id: null,
				account_id: 1,
				amount: 0,
				due_date: DateTime.local().toISODate(),
				notes: ''
			}),

			isLoading: false
		}
	},

	mounted() {
		this.getCategories()
		this.getAccounts()
	},

	computed: {
		title() {
			return (this.isNew ? 'New Check' : 'Edit Check')
		},

		...mapGetters({
			incomeCategory: 'categories/incomeCategory',
			expenseCategory: 'categories/expenseCategory',
			accounts: 'accounts/accounts'
		}),

		selectedTypeCategories() {
			if (this.form.type)
				return this.incomeCategory
			else
				return this.expenseCategory
		},

		isNew() {
			return (_.isEmpty(this.check))
		}
	},

	methods: {
		toggleType() {
			if (this.readonly) return
			this.form.category_id = null
			this.form.type = !this.form.type
		},

		setDate(date) {
			this.form.due_date = DateTime.fromISO(date, {setZone: true}).toISODate()
		},

		...mapActions({
			getCategories: 'categories/getCategories',
			getAccounts: 'accounts/getAccounts'
		}),

		async submitForm() {
			this.isLoading = true

			try {
				if (this.isNew) {
					await this.$axios.$post('/admin/accounting/checks', this.form)
					this.$emit('submit_success', true)
				} else {
					await this.$axios.$patch(`/admin/accounting/checks/${this.check.id}`, this.form)
					this.$emit('submit_success', false)
				}

				this.isLoading = false
				this.form.onSuccess()
			} catch (e) {
				this.isLoading = false
				if (parseInt(e.response.status) === 422) {
					this.form.onFail(e.response.data)
				}
				if (parseInt(e.response.status) === 403) {
					this.$emit('close')
					this.$toast.error(`cannot update transaction, you do not own the transaction.`, {
						hideProgressBar: true
					})
				}
			}
		},

		closeModal() {
			if (!this.isLoading)
				this.$emit('close')
		}
	},

	watch: {
		show() {
			if (this.show) {
				this.form.reset()

				if (!this.isNew) {
					this.form.description = this.check.description
					this.form.type = this.check.category_type === 'income' ? true : false
					this.form.category_id = this.check.category_id
					this.form.account_id = this.check.account_id
					this.form.amount = (Math.abs(this.check.amount) / 100)
					this.form.due_date = this.check.due_date
					this.form.notes = this.check.notes
				}

				this.$nextTick(() => {
					this.$refs.description.focus()
				})
			}
		},
	}
}
</script>

<style>
.vdatetime-input {
	@apply w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700 text-right bg-white
}
</style>
