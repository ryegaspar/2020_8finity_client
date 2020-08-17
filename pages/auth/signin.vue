<template>
	<div class="flex flex-col items-center">
		<h1 class="font-medium text-3xl mb-6 text-center text-gray-600">
			Sign in.
		</h1>

		<form action="#"
			  method="post"
			  class="bg-white rounded-lg p-8 w-full md:w-6/12 lg:w-3/12 shadow-xl"
			  @submit.prevent="submit"
		>
			<div class="mb-4">
				<label for="email"
					   class="block mb-2 text-gray-400 uppercase text-sm font-bold tracking-tight"
				>
					Email address
				</label>
				<input type="text"
					   name="email"
					   id="email"
					   class="border-2 border-gray-400 rounded px-3 py-2 w-full"
					   v-model="form.email"
				>
			</div>
			<div class="mb-6">
				<label for="password"
					   class="block mb-2 text-gray-500 uppercase text-sm font-bold tracking-tight"
				>
					Password
				</label>
				<input type="password"
					   name="password"
					   id="password"
					   class="border-2 border-gray-400 rounded px-3 py-2 w-full"
					   v-model="form.password"
				>
			</div>
			<div>
				<button type="submit"
						class="w-full bg-blue-500 text-white px-6 py-3 rounded uppercase font-bold"
				>
					Sign in
				</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				email: '',
				password: '',
			}
		}
	},

	methods: {
		async submit() {
			try {
				await this.$axios.$get('/sanctum/csrf-cookie')
				await this.$auth.loginWith('local', {data: this.form})

				this.$router.replace({name: 'index'})
			} catch (e) {

			}
		}
	}
}
</script>
