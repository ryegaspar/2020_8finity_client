<template>
	<div class="bg-black-alt min-h-screen flex flex-col">
		<div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
			<form class="bg-gray-800 px-6 py-6 rounded-lg shadow text-gray-400 w-full">
				<h1 class="mb-6 text-3xl text-center">Login</h1>
				<input type="text"
					   class="block border border-gray-800 bg-gray-900 w-full p-3 rounded-lg mb-4 outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
					   name="username"
					   placeholder="username"
					   v-model="form.username"
					   ref="username"
				/>

				<input type="password"
					   class="block border border-gray-800 bg-gray-900 w-full p-3 rounded-lg mb-2 outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
					   name="password"
					   placeholder="password"
					   v-model="form.password"
					   ref="password"
				/>

				<em class="block text-center text-red-600 text-sm mb-2" v-show="hasError">{{ errorMessage }}</em>

				<button
					type="submit"
					v-promise-btn
					@click.prevent="submit"
					class="w-full text-center py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-700 focus:outline-none mb-1 mt-2"
				>
					Sign In
				</button>

				<nuxt-link to="/forgot-password" class="text-sm flex flex-row-reverse mt-1">forgot password?</nuxt-link>
			</form>
		</div>
	</div>
</template>

<script>
export default {

	auth: 'guest',

	data() {
		return {
			hasError: false,
			form: {
				username: '',
				password: '',
			},
			errorMessage: 'invalid username or password'
		}
	},

	methods: {
		async submit() {
			this.hasError = false;
			try {
				await this.$axios.$get('/sanctum/csrf-cookie')
				await this.$auth.loginWith('local', {data: this.form})
			} catch (e) {
				if (parseInt(e.response.status) === 422) {
					this.errorMessage = 'invalid username or password'
					this.hasError = true
					this.$refs.username.select()
				}

				if (parseInt(e.response.status) === 429) {
					this.errorMessage = e.response.data.errors.username[0]
					this.hasError = true
				}
			}
		}
	}
}
</script>
