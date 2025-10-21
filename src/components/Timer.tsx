import {formatTime, type IConfig, type IState, calculateDerivativeState} from '../lib'
import './timer.css'

type FN<I extends unknown[] = [], O = void> = (...args: I) => O

type IProps = {
	config: IConfig
	state: IState

	onToggle: FN
	onRemove: FN
	onReset: FN
}

export const Timer = ({config, state, ...on}: IProps) => {
	const derivativeState = calculateDerivativeState(config, state)
	const {isDone, isPaused, isStarted, timeLeftSec, totalDurationSec} = derivativeState

	const [displayTimeLeft, unit] = formatTime(timeLeftSec)

	return (
		<table
			data-component="timer"
			data-done={isDone}
			data-started={isStarted}
			data-paused={isPaused}
		>
			<thead>
				<tr
					data-progress="total"
					style={isStarted ? {animationDuration: totalDurationSec + 's'} : {}}
				>
					<th>{config.label}</th>
					<td>{displayTimeLeft}</td>
					<td>{unit}</td>
					<td>
						<button onClick={on.onToggle}>{isPaused ? 'Start' : 'Stop'}</button>
					</td>
				</tr>
			</thead>
			<tfoot>
				<tr>
					<td colSpan={4}>
						<div className="button-group">
							<button onClick={on.onRemove}>Delete</button>
							<button onClick={on.onReset} hidden={!isStarted}>
								Reset
							</button>
						</div>
						{config.categories.join(' ')}
					</td>
				</tr>
			</tfoot>
			<tbody>
				{config.routine.map(({reps, sets = 1}, i) => {
					return reps.map(([label, duration], ii, {length}) => {
						const multipleSets = sets > 1

						const [time, unit] = formatTime(duration)

						return (
							<tr key={`${i}-${ii}`}>
								<td>{label}</td>
								<td>{time}</td>
								<td>{unit}</td>
								{!ii && (
									<td data-empty={!multipleSets} rowSpan={length}>
										{multipleSets ? `x${sets}` : ''}
									</td>
								)}
							</tr>
						)
					})
				})}
			</tbody>
		</table>
	)
}
