<template>
	<modal :show="open"
		   @close="cancel()"
		   modal-width="sm:w-96"
	>
		<div class="mt-1">
			<div
				class="inline-block align-bottom rounded-lg px-4 pt-2 pb-2 text-left overflow-hidden shadow-xl transform transition-all">
				<div class="sm:flex sm:items-start">
					<div
						class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12">
						<font-awesome-layers class="fa-2x fa-fw text-red-400">
							<font-awesome-icon icon="exclamation-triangle"/>
						</font-awesome-layers>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<!--						<DialogTitle as="h3" class="text-lg leading-6 font-medium text-gray-300">-->
						Delete Transaction
						<!--						</DialogTitle>-->
						<div class="mt-2">
							<p class="text-sm text-gray-400">
								Are you sure you want to delete this transaction? This action cannot be undone
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-2 space-y-8 divide-gray-200">
				<form class="divide-y"
					  @submit.prevent="submit"
				>
					<div class="mt-6 pt-2 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
						<button type="submit"
								class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-2 py-1 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
								v-promise-btn
								@click.prevent="confirm"
						>
							Delete
						</button>
						<button type="button"
								class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-base font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
								@click.prevent="cancel"
								:disabled="isDisabled"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	</modal>
</template>

<script>
import Modal from "~/components/modal/Modal";

export default {

	components: {
		Modal,
	},

	data() {
		return {
			open: false,
			isDisabled: false,

			resolvePromise: undefined,
			rejectPromise: undefined,
			confirmAction: undefined
		}
	},

	computed: {},

	methods: {
		show(opts = {}) {
			this.open = true
			this.confirmAction = opts.confirmAction
			return new Promise((resolve, reject) => {
				this.resolvePromise = resolve
				this.rejectPromise = reject
			})
		},

		async confirm() {
			this.isDisabled = true

			await this.confirmAction()
				.then(() => {
					this.resolvePromise(true)
					this.open = false
				})
				.catch(() => {
					this.rejectPromise(true)
					this.open = false
				})

			this.isDisabled = false
		},

		cancel() {
			if (!this.isDisabled) {
				this.rejectPromise(false)
				this.open = false
			}
		}
	},
}
</script>
