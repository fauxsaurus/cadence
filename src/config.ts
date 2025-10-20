import {type IConfig} from './lib'

export const defaultConfig: IConfig[] = [
	{
		label: 'Lift Weights',
		routine: [
			{
				reps: [['Up', 5], ['Down', 5]], // prettier-ignore
				sets: 12,
			},
			{reps: [['Rest', 3 * 60]]},
		],
		categories: ['Fitness', 'Weekday'],
	},
	{
		label: 'Planks',
		routine: [
			{
				reps: [['Get Ready', 2], ['Plank', 100], ['Rest', 3 * 60]], // prettier-ignore
				sets: 3,
			},
		],
		categories: ['Fitness', 'Weekday'],
	},
	{
		label: 'Deep Work',
		routine: [
			{
				reps: [['Focus', 2 * 60 * 60], ['Break', 30 * 60]], // prettier-ignore
				sets: 2,
			},
		],
		categories: ['Work', 'Weekday'],
	},
	{
		label: 'Brush Teeth',
		routine: [
			{
				reps: [['Front', 10], ['Front Gumline', 5], ['Top or Bottom', 7], ['Back', 8]], // prettier-ignore
				sets: 4,
			},
			{reps: [['tongue', 5]]},
		],
		categories: ['Daily', 'Health'],
	},
]
