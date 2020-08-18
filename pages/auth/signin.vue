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
				/>

				<input type="password"
					   class="block border border-gray-800 bg-gray-900 w-full p-3 rounded-lg mb-4 outline-none focus:border-gray-600 appearance-none leading-normal text-gray-400"
					   name="password"
					   placeholder="Password"
					   v-model="form.password"
				/>

				<button
					type="submit"
					v-promise-btn
					@click.prevent="submit"
					class="w-full text-center py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
				>
					Sign In
				</button>
			</form>
		</div>
	</div>
</template>

<script>
export default {

	data() {
		return {
			hasError: false,
			form: {
				username: '',
				password: '',
			}
		}
	},

	methods: {
		async submit() {
			this.hasError = false;
			try {
				await this.$axios.$get('/sanctum/csrf-cookie')
				await this.$auth.loginWith('local', {data: this.form})

				this.$router.replace({name: 'index'})
			} catch (e) {
				if (parseInt(e.response.status) === 422) {
					this.hasError = true
				}
			}
		}
	}
}
</script>
