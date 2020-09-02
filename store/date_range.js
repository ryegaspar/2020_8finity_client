import {presets} from '@/constants/date_presets'

export const state = () => ({
	selected: presets[0],
	startDate: presets[0].start,
	endDate: presets[0].end
})

export const mutations = {
	changeSelection(state, selected) {
		state.selected = selected
		state.startDate = selected.start
		state.endDate = selected.end
	},

	changeStartDate(state, date) {
		state.selected.startDate = date
	},

	changeEndDate(state, date) {
		state.selected.endDate = date
	}
}
