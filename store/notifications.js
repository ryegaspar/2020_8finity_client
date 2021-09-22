export const state = () => ({
	notifications: [],
})

export const getters = {
	notifications(state) {
		return state.notifications
	},
}

export const actions = {
	async getNotifications({commit}) {
		let response = await this.$axios.$get(`admin/notifications`)

		let notifications = response.data

		commit('SET_NOTIFICATIONS', {notifications})
	},
}

export const mutations = {
	SET_NOTIFICATIONS(state, {notifications}) {
		state.notifications = notifications
	},
}
