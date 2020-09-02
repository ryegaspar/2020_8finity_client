import {presets} from '@/constants/date_presets'

export const state = () => ({
	selected: presets[0],
	startDate: presets[0].start,
	endDate: presets[0].end
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
	}
}

export const mutations = {
	changePresetSelected(state, selected) {
		state.selected = selected

		if (selected.name !== 'custom') {
			state.startDate = selected.start
			state.endDate = selected.end
		}
	},

	changeStartDate(state, date) {
		state.startDate = date
	},

	changeEndDate(state, date) {
		state.endDate = date
	}
}
