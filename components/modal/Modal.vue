<template>
	<transition
		enter-active-class="transition ease-out duration-300"
		enter-class="opacity-0"
		enter-to-class="opacity-100"
		leave-active-class="transition ease-in duration-200"
		leave-class="opacity-100"
		leave-to-class="opacity-0"
	>
		<div class="fixed z-10 inset-0 overflow-y-auto"
			 v-show="show"
		>
			<div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div class="fixed inset-0 transition-opacity"
					 aria-hidden="true"
					 v-show="show"
					 @click.prevent="dismiss"
				>
					<div class="absolute inset-0 bg-gray-800 opacity-75"></div>
				</div>

				<!-- This element is to trick the browser into centering the modal contents. -->
				<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
				<transition
					enter-active-class="transition ease-out duration-300"
					enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enter-to-class="opacity-100 translate-y-0 sm:scale-100"
					leave-active-class="transition ease-in duration-200"
					leave-class="opacity-100 translate-y-0 sm:scale-100"
					leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>

					<div
						class="inline-block align-bottom bg-gray-900 border border-blue-700 shadow rounded-lg p-3 text-left overflow-hidden shadow-xl transform transition-all sm:my-6 sm:align-middle sm:max-w-lg sm:p-6"
						:class="[modalWidth]"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline"
						v-show="show"
					>
						<slot></slot>
					</div>
				</transition>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props: {
		show: {
			required: true,
			type: Boolean
		},
		hasChildModalOpened: {
			default: false,
			type: Boolean
		},
		modalWidth: {
			default: 'sm:w-full',
			type: String
		}
	},

	created() {
		const escapeHandler = e => {
			if (e.key === 'Escape' && this.show && !this.hasChildModalOpened) {
				this.dismiss()
			}
		}
		document.addEventListener('keydown', escapeHandler)
		this.$once('hook:destroyed', () => {
			document.removeEventListener('keydown', escapeHandler)
		})
	},

	methods: {
		dismiss() {
			this.$emit('close')
		}
	},

	watch: {
		show: {
			immediate: true, // watcher will run when the value is set
			handler: function (show) {
				if (show)
					document.body.style.setProperty('overflow', 'hidden')
				else
					document.body.style.removeProperty('overflow')
			}
		}
	}
}
</script>
