<template>
	<ul class="pagination">
		<li :class="{'disabled cursor-not-allowed bg-gray-600': isOnFirstPage, 'bg-gray-800 hover:bg-gray-600' : !isOnFirstPage}"
			class="relative inline-flex items-center px-2 py-2 rounded-l-md text-sm font-medium text-gray-300"
			@click.prevent="loadPage('prev')"
		>
			<button href=""
					:class="{'cursor-not-allowed': isOnFirstPage}"
					class="focus:outline-none"
			>
				<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
					 aria-hidden="true">
					<path fill-rule="evenodd"
						  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
						  clip-rule="evenodd"/>
				</svg>
			</button>
		</li>

		<template v-if="notEnoughPages">
			<li v-for="n in totalPage"
			>
				<button @click.prevent="loadPage(n)"
						v-html="n"
						:class="{'active cursor-not-allowed bg-gray-600': isCurrentPage(n), 'bg-gray-800' : !isCurrentPage(n)}"
						class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none"

				>
				</button>
			</li>
		</template>
		<template v-else>
			<li v-for="n in windowSize" :class="{'active': isCurrentPage(windowStart+n-1)}">
				<button @click.prevent="loadPage(windowStart+n-1)"
						v-html="windowStart+n-1"
						:class="{'active cursor-not-allowed bg-gray-600': isCurrentPage(windowStart+n-1), 'bg-gray-800' : !isCurrentPage(windowStart+n-1)}"
						class="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-600 focus:outline-none"
				></button>
			</li>
		</template>

		<li :class="{'disabled cursor-not-allowed bg-gray-600': isOnLastPage, 'bg-gray-800 hover:bg-gray-600' : !isOnLastPage}"
			class="relative inline-flex items-center px-2 py-2 rounded-r-md text-sm font-medium text-gray-300"
		>
			<button href=""
					@click.prevent="loadPage('next')"
					:class="{'cursor-not-allowed' : isOnLastPage}"
					class="focus:outline-none"
			>
				<svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
					 aria-hidden="true">
					<path fill-rule="evenodd"
						  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
						  clip-rule="evenodd"/>
				</svg>
			</button>
		</li>
	</ul>
</template>

<script>
import VuetablePaginationMixin from 'vuetable-2/src/components/VuetablePaginationMixin'

export default {
	mixins: [VuetablePaginationMixin]
}
</script>
