import {presets} from '@/constants/date_presets'

export const state = () => ({
	selected: presets[0],
	startDate: presets[0].start,
	endDate: presets[0].end,
})

export const getters = {
	selected(state) {
		return state.selected
	},

	startDate(state) {
		return state.startDate
	},

	endDate(state) {
		return state.endDate
	},
}

export const actions = {
	changeSelectedPreset({commit, dispatch}, selected) {

		commit('SET_SELECTED', selected)

		if (selected.name !== 'custom') {
			commit('SET_START_DATE', selected.start)
			commit('SET_END_DATE', selected.end)
		} else {
			commit('SET_START_DATE', presets[0].start)
			commit('SET_END_DATE', presets[0].end)
		}

		dispatch('dashboard_summary/updateSummary', null, {root: true})
	},

	updateStartDate({commit, dispatch}, date) {
		commit('SET_START_DATE', date)

		dispatch('dashboard_summary/updateSummary', null, {root: true})
	},

	updateEndDate({commit, dispatch}, date) {
		commit('SET_END_DATE', date)

		dispatch('dashboard_summary/updateSummary', null, {root: true})
	},
}

export const mutations = {
	SET_SELECTED(state, selected) {
		state.selected = selected
	},

	SET_START_DATE(state, startDate) {
		state.startDate = startDate
	},

	SET_END_DATE(state, endDate) {
		state.endDate = endDate
	},
}
