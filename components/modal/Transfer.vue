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
						  @submit.prevent="submit"
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
								<label for="from_account"
									   class="block text-sm font-medium text-gray-500">
									From Account
								</label>
								<div class="mt-1">
									<select id="from_account"
											name="account"
											class="w-full px-2 py-1 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
											v-model="form.from_account"
											:disabled="this.readonly"
											@change="fromAccountChanged"
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
										 v-show="form.errors.has('from_account')"
									>
										{{ form.errors.get('from_account') }}
									</div>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="to_account"
									   class="block text-sm font-medium text-gray-500">
									To Account
								</label>
								<div class="mt-1">
									<select id="to_account"
											name="to_account"
											class="w-full px-2 py-1 border border-gray-300 text-gray-700 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
											v-model="form.to_account"
											:disabled="this.readonly"
									>
										<option value="0"></option>
										<option v-for="account in availableAccounts"
												:value="account.id"
												:key="account.id"
										>
											{{ account.name }}
										</option>
									</select>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('to_account')"
									>
										{{ form.errors.get('to_account') }}
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
									Date
								</label>
								<div class="mt-1">
									<datetime class="theme-dark"
											  id="date"
											  ref="dateTimePicker"
											  :week-start="7"
											  :value="form.date"
											  @input="setDate"
											  :disabled="this.readonly"
									/>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('date')"
									>
										{{ form.errors.get('date') }}
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
									<textarea id="notes"
											  rows="3"
											  class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
											  v-model="form.notes"
											  :disabled="this.readonly"
									></textarea>
								</div>
							</div>

							<!--							<div class="col-span-6 block text-sm font-medium text-gray-500"-->
							<!--								 v-if="this.readonly"-->
							<!--							>-->
							<!--								{{ 'only ' }}<i>{{ transaction.admin_username }}</i>{{ ' can modify this transaction' }}-->
							<!--							</div>-->
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
		transfer: {
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
				from_account: '',
				to_account: '',
				amount: 0,
				date: DateTime.local().toISODate(),
				notes: ''
			}),

			selectedFromAccount: '',

			// transaction_admin: '',
			isLoading: false
		}
	},

	mounted() {
		// this.getCategories()
		this.getAccounts()
	},

	computed: {
		title() {
			return (this.isNew ? 'New Transfer' : 'Edit Transfer')
		},

		...mapGetters({
			// incomeCategory: 'categories/incomeCategory',
			// expenseCategory: 'categories/expenseCategory',
			accounts: 'accounts/accounts'
		}),

		availableAccounts() {
			return this.accounts.filter((account) => {
				return account.id !== this.form.from_account
			})
		},
		// selectedTypeCategories() {
		// 	if (this.form.type)
		// 		return this.incomeCategory
		// 	else
		// 		return this.expenseCategory
		// },
		//
		isNew() {
			return (_.isEmpty(this.transfer))
		}
	},

	methods: {
		// toggleType() {
		// 	if (this.readonly) return
		// 	this.form.category_id = null
		// 	this.form.type = !this.form.type
		// },
		//
		...mapActions({
			// getCategories: 'categories/getCategories',
			getAccounts: 'accounts/getAccounts'
		}),

		fromAccountChanged() {
			this.form.to_account = ''
		},

		setDate(date) {
			this.form.date = DateTime.fromISO(date, {setZone: true}).toISODate()
		},

		async submitForm() {
				this.isLoading = true

				try {
					if (this.isNew) {
						await this.$axios.$post('/admin/accounting/transfers', this.form)
						this.$emit('submit_success', true)
					} else {
						// await this.$axios.$patch(`/admin/accounting/transfers/${this.transfer.id}`, this.form)
						// this.$emit('submit_success', false)
					}

					this.isLoading = false
					this.form.onSuccess()
				} catch (e) {
					this.isLoading = false
					if (parseInt(e.response.status) === 422) {
						this.form.onFail(e.response.data)
					}
					// if (parseInt(e.response.status) === 403) {
					// 	this.$emit('close')
					// 	this.$toast.error(`cannot update transaction, you do not own the transaction.`, {
					// 		hideProgressBar: true
					// 	})
					// }
				}
		},

		closeModal() {
			if (!this.isLoading)
				this.$emit('close')
		}
	},

	watch: {
		// show() {
		// 	if (this.show) {
		// 		this.form.reset()
		//
		// 		if (!this.isNew) {
		// 			this.form.description = this.transaction.description
		// 			this.form.type = this.transaction.category_type === 'income' ? true : false
		// 			this.form.category_id = this.transaction.category_id
		// 			this.form.account_id = this.transaction.account_id
		// 			this.form.amount = (Math.abs(this.transaction.amount) / 100)
		// 			this.form.date = this.transaction.date
		// 			this.form.notes = this.transaction.notes
		// 		}
		//
		// 		this.$nextTick(() => {
		// 			this.$refs.description.focus()
		// 		})
		// 	}
		// },
	}
}
</script>

<style>
.vdatetime-input {
	@apply w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700 text-right bg-white
}
</style>
