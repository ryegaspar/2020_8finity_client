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
											:class="form.type === 'in' ? 'bg-blue-700' : 'bg-gray-200'"
											v-model="form.type"
									>
										<span aria-hidden="true"
											  class="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
											  :class="form.type === 'in' ? 'translate-x-5' : 'translate-x-0'"
										></span>
									</button>
									<span class="ml-3" id="type">
										<span class="text-sm font-medium text-gray-400">
											{{ form.type === 'in' ? 'Income' : 'Expense' }}
										</span>
									</span>
								</div>
								<div class="block text-red-500 text-sm mt-1 -mb-2"
									 v-show="form.errors.has('type')"
								>
									{{ form.errors.get('type') }}
								</div>
							</div>

							<div class="sm:col-span-6">
								<label for="name"
									   class="block text-sm font-medium text-gray-500">
									Name
								</label>
								<div class="mt-1">
									<input type="text"
										   id="name"
										   ref="name"
										   class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
										   v-model="form.name"
									>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('name')"
									>
										{{ form.errors.get('name') }}
									</div>
								</div>
							</div>

							<div class="sm:col-span-6">
								<label class="block text-sm font-medium text-gray-500">
									Icon
								</label>
								<div class="mt-2 -mr-2 flex flex-wrap max-h-80 overflow-y-scroll">
									<div v-for="icon in icons"
										 :key="icon"
										 class="border border-gray-700 m-1 p-1 mr-2 hover:cursor-pointer hover:text-blue-500 hover:border-blue-500"
										 :class="{'selected_icon' : form.icon === icon}"
										 @click.prevent="setIcon(icon)"
									>
										<font-awesome-layers class="fa-2x mr-1">
											<font-awesome-icon :icon="icon"/>
										</font-awesome-layers>
									</div>
								</div>
							</div>
						</div>

						<div class="mt-6 pt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
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
						</div>
					</form>
				</div>
			</div>
		</div>
	</modal>
</template>

<script>
import Modal from "~/components/modal/Modal"
import Form from "~/utilities/Form"
import {mapActions} from 'vuex'
import {categoryIcons} from "~/utilities/CategoryIcons"

export default {
	props: {
		category: {
			type: Object
		},
		show: {
			required: true,
			type: Boolean
		}
	},

	components: {
		Modal,
	},

	data() {
		return {
			form: new Form({
				type: 'in',
				name: '',
				icon: 'piggy-bank',
			}),

			icons: categoryIcons,

			isLoading: false
		}
	},

	computed: {
		title() {
			return (this.isNew ? 'New Category' : 'Edit Category')
		},

		isNew() {
			return (_.isEmpty(this.category))
		}
	},

	methods: {
		...mapActions({
			getCategories: 'categories/getCategories',
		}),

		toggleType() {
			this.form.type = this.form.type === 'in' ? 'out' : 'in'
		},

		setIcon(icon) {
			this.form.icon = icon
		},

		async submitForm() {
			this.isLoading = true

			try {
				if (this.isNew) {
					await this.$axios.$post('/admin/accounting/categories', this.form)
					await this.getCategories()

					this.$emit('submit_success', true)
				} else {
					await this.$axios.$patch(`/admin/accounting/categories/${this.category.id}`, this.form)
					await this.getCategories()

					this.$emit('submit_success', false)
				}

				this.isLoading = false
				this.form.onSuccess()
			} catch (e) {
				this.isLoading = false
				if (parseInt(e.response.status) === 422) {
					this.form.onFail(e.response.data)
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
					this.form.type = this.category.type === 'income' ? 'in' : 'out'
					this.form.name = this.category.name
					this.form.icon = this.category.icon
				}

				this.$nextTick(() => {
					this.$refs.name.focus()
					const lastComment = document.querySelector('.selected_icon')
					lastComment.scrollIntoView({behavior: 'smooth'})
				})
			}
		},
	}
}
</script>

<style>
.selected_icon {
	@apply text-green-500 border-green-500
}
</style>
