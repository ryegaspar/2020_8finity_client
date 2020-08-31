import { presets } from '@/constants/date_presets'

export const state = () => ({
	selected: presets[0]
})

export const mutations = {
	changeSelection(state, selected) {
		state.selected = selected
	}
}
