import {DateTime} from 'luxon'

export const presets = [
	{
		name: 'this month',
		start: DateTime.local().startOf('month').toISODate(),
		end: DateTime.local().endOf('month').toISODate(),
	},
	{
		name: 'last month',
		start: DateTime.local().minus({ months: 1}).startOf('month').toISODate(),
		end: DateTime.local().minus({ months: 1}).endOf('month').toISODate(),
	},
	{
		name: 'this week',
		start: DateTime.local().startOf('week').minus({days: 1}).toISODate(),
		end: DateTime.local().endOf('week').minus({days: 1}).toISODate(),
	},
	{
		name: 'last week',
		start: DateTime.local().minus({weeks: 1}).startOf('week').minus({days: 1}).toISODate(),
		end: DateTime.local().minus({weeks: 1}).endOf('week').minus({days: 1}).toISODate(),
	},
	{
		name: 'this year',
		start: DateTime.local().startOf('year').toISODate(),
		end: DateTime.local().endOf('year').toISODate()
	},
	{
		name: 'last year',
		start: DateTime.local().minus({years: 1}).startOf('year').toISODate(),
		end: DateTime.local().minus({years: 1}).endOf('year').toISODate()
	},
	{
		name: 'custom',
		start: null,
		end: null
	}
]
