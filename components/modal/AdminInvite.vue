<template>
	<modal :show="show"
		   @close="closeModal"
	>
		<div>
			<div class="mt-1">
				<h3 class="text-center text-lg leading-6 font-medium text-gray-300">
					Admin Invite
				</h3>
				<div class="mt-2 space-y-8 divide-gray-200">
					<form class="divide-y"
						  @submit.prevent="submitForm"
					>
						<div class="mt-3 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
							<div class="sm:col-span-6">
								<label for="name"
									   class="block text-sm font-medium text-gray-500">
									Email
								</label>
								<div class="mt-1">
									<input type="text"
										   id="name"
										   ref="name"
										   class="w-full px-2 py-1 placeholder-gray-300 border border-gray-300  text-gray-600 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-700"
										   v-model="form.email"
									>
									<div class="block text-red-500 text-sm mt-1 -mb-2"
										 v-show="form.errors.has('email')"
									>
										{{ form.errors.get('email') }}
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
								Invite
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

export default {
	props: {
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
				email: '',
			}),

			isLoading: false
		}
	},

	methods: {
		async submitForm() {
			this.isLoading = true

			try {
				await this.$axios.$post('/admin/invitations', this.form)

				this.$emit('submit_success', true)

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
}
</script>
