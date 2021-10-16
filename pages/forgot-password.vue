<template>
	<div class="bg-black-alt min-h-screen flex flex-col">
		<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
			<form class="bg-gray-800 px-6 py-6 rounded-lg shadow text-gray-400 w-full"
				  @submit="submitForm"
			>
				<h1 class="mb-6 text-3xl text-center">Forgot Password</h1>
				<div class="mt-3 grid gap-y-2 gap-x-4 grid-cols-6">
					<div class="col-span-6">
						<label for="email"
							   class="block text-sm font-medium text-gray-500">
							Email
						</label>
						<div class="mt-1">
							<input type="text"
								   id="email"
								   class="w-full border border-gray-800 bg-gray-900 w-full p-2 rounded-lg outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
								   v-model="form.email"
							>
							<div class="block text-red-500 text-xs mt-1 -mb-2"
								 v-show="form.errors.has('email')"
							>
								{{ form.errors.get('email') }}
							</div>
						</div>
					</div>
				</div>

				<button
					type="submit"
					v-promise-btn
					@click.prevent="submitForm"
					class="w-full text-center py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-700 focus:outline-none mb-1 mt-6"
				>
					Send Password Reset Link
				</button>
			</form>
		</div>
	</div>
</template>
<script>
import Form from "../utilities/Form"

export default {
	auth: 'guest',

	data() {
		return {
			form: new Form({
				email: '',
			})
		}
	},

	methods: {
		async submitForm() {
			try {
				await this.$axios.$post(`${process.env.BASE_URL}/admin/forgot-password`, this.form)
				this.form.onSuccess()

				this.$toast.success('link sent successfully on your email', {
					hideProgressBar: true,
				})

			} catch (e) {
				if (parseInt(e.response.status) === 422) {
					this.form.onFail(e.response.data)
				}
			}
		}	}
}
</script>
