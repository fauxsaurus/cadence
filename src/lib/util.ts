import type {IConfig, IState} from './types'

// ARRAY
export const setAt = <T,>(array: T[], i: number, item: T) =>
	array.slice(0, i).concat([item]).concat(array.slice(i + 1)); // prettier-ignore

// DATA
export const createConfig = (): IConfig => ({
	label: 'Name',
	routine: [],
	categories: [],
})

export const createTimeState = (): IState['times'] => [-1, 0]

export const calculateDerivativeState = (config: IConfig, state: IState) => {
	const totalDurationSec = routine2totalDuration(config)

	const [startTime, msElapsedFromPriorPauses] = state.times
	const isPaused = state.times[0] === -1

	const msElapsedSinceLastStart = isPaused ? 0 : state.currentTime - startTime

	const timeLeftSec =
		totalDurationSec - Math.floor((msElapsedFromPriorPauses + msElapsedSinceLastStart) / 1000)

	return {
		isDone: timeLeftSec <= 0,
		isPaused,
		isStarted: timeLeftSec < totalDurationSec,

		msElapsedFromPriorPauses,
		msElapsedSinceLastStart,

		totalDurationSec,
		startTime,
		timeLeftSec,
	}
}

const routine2totalDuration = (config: IConfig) =>
	config.routine
		.map(({reps, sets = 1}) => reps.map(([_label, duration]) => duration).reduce(sum, 0) * sets)
		.reduce(sum, 0)

const sum = (a: number, b: number) => a + b

// FORMATTING
export const formatTime = (seconds: number) => {
	const isNegative = seconds < 0
	const sign = isNegative ? '-' : ''

	const absoluteSeconds = Math.abs(seconds)
	const h = Math.floor(absoluteSeconds / 3600)
	const m = Math.floor((absoluteSeconds % 3600) / 60)
	const s = absoluteSeconds % 60

	const firstNonEmptyI = [h, m, s].findIndex(num => num)
	if (firstNonEmptyI === -1) return '00 sec'

	const relevantUnits = [h, m, s].slice(firstNonEmptyI)
	const unit = ['', 'sec', 'min', 'hr'][relevantUnits.length]

	const time = relevantUnits.map(num => num.toString().padStart(2, '0')).join(':')

	return [sign + time, unit]
}
