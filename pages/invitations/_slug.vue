<template>
	<div class="bg-black-alt min-h-screen flex flex-col">
		<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
			<form class="bg-gray-800 px-6 py-6 rounded-lg shadow text-gray-400 w-full"
				  @submit="submitForm"
			>
				<h1 class="mb-6 text-3xl text-center">Admin Registration</h1>
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
								   :value="this.invitation.email"
								   readonly
							>
						</div>
					</div>

					<div class="col-span-6">
						<label for="first_name"
							   class="block text-sm font-medium text-gray-500">
							First Name
						</label>
						<div class="mt-1">
							<input type="text"
								   id="first_name"
								   class="w-full border border-gray-800 bg-gray-900 w-full p-2 rounded-lg outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
								   v-model="form.first_name"
							>
							<div class="block text-red-500 text-xs mt-1 -mb-2"
								 v-show="form.errors.has('first_name')"
							>
								{{ form.errors.get('first_name') }}
							</div>
						</div>
					</div>

					<div class="col-span-6">
						<label for="last_name"
							   class="block text-sm font-medium text-gray-500">
							Last Name
						</label>
						<div class="mt-1">
							<input type="text"
								   id="last_name"
								   class="w-full border border-gray-800 bg-gray-900 w-full p-2 rounded-lg outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
								   v-model="form.last_name"
							>
							<div class="block text-red-500 text-xs mt-1 -mb-2"
								 v-show="form.errors.has('last_name')"
							>
								{{ form.errors.get('last_name') }}
							</div>
						</div>
					</div>

					<div class="col-span-6">
						<label for="username"
							   class="block text-sm font-medium text-gray-500">
							Username
						</label>
						<div class="mt-1">
							<input type="text"
								   id="username"
								   class="w-full border border-gray-800 bg-gray-900 w-full p-2 rounded-lg outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
								   v-model="form.username"
							>
							<div class="block text-red-500 text-xs mt-1 -mb-2"
								 v-show="form.errors.has('username')"
							>
								{{ form.errors.get('username') }}
							</div>
						</div>
					</div>

					<div class="col-span-6">
						<label for="password"
							   class="block text-sm font-medium text-gray-500">
							Password
						</label>
						<div class="mt-1">
							<input type="password"
								   id="password"
								   class="w-full border border-gray-800 bg-gray-900 w-full p-2 rounded-lg outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
								   v-model="form.password"
							>
							<div class="block text-red-500 text-xs mt-1 -mb-2"
								 v-show="form.errors.has('password')"
							>
								{{ form.errors.get('password') }}
							</div>
						</div>
					</div>

					<div class="col-span-6">
						<label for="password_confirmation"
							   class="block text-sm font-medium text-gray-500">
							Password Confirmation
						</label>
						<div class="mt-1">
							<input type="password"
								   id="password_confirmation"
								   class="w-full border border-gray-800 bg-gray-900 w-full p-2 rounded-lg outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
								   v-model="form.password_confirmation"
							>
							<div class="block text-red-500 text-xs mt-1 -mb-2"
								 v-show="form.errors.has('password_confirmation')"
							>
								{{ form.errors.get('password_confirmation') }}
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
					Register
				</button>
			</form>
		</div>
	</div>
</template>
<script>
import Form from "~/utilities/Form"

export default {
	auth: 'guest',

	data() {
		return {
			invitation: {},

			form: new Form({
				first_name: '',
				last_name: '',
				username: '',
				password: '',
				password_confirmation: '',
				invitation_code: ''
			})
		}
	},

	mounted() {
		const slug = this.$route.params.slug

		this.$axios.$get(`${process.env.BASE_URL}/admin/invitations/${slug}`)
			.then((response) => {
				this.invitation = response
				this.form.invitation_code = this.invitation.code

			})
			.catch((e) => {
				if (e.response.status === 404) {
					return this.$nuxt.error({statusCode: 404, message: e.message})
				}
			})
	},

	methods: {
		async submitForm() {
			try {
				await this.$axios.$post(`${process.env.BASE_URL}/admin/register`, this.form)
				this.form.onSuccess()

				this.$toast.success('Registered successfully... redirecting', {
					hideProgressBar: true,
				})

				setTimeout(() => {
					this.$router.push('/login')
				}, 5000)

			} catch (e) {
				if (parseInt(e.response.status) === 422) {
					this.form.onFail(e.response.data)
				}
			}
		}
	}
}
</script>
