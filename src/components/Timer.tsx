import {formatTime, type IConfig, type IState, calculateDerivativeState} from '../lib'
import './timer.css'

type FN<I extends unknown[] = [], O = void> = (...args: I) => O

type IProps = {
	config: IConfig
	state: IState

	onToggle: FN
	onReset: FN
}

export const Timer = ({config, state, onReset, onToggle}: IProps) => {
	const {isDone, isPaused, timeLeftSec} = calculateDerivativeState(config, state)

	return (
		<section data-component="timer" data-done={isDone}>
			<header>
				<button onClick={onReset} disabled={isPaused}>
					Reset
				</button>
				{config.label}: {formatTime(timeLeftSec)}{' '}
				<button onClick={onToggle}>{isPaused ? 'Start' : 'Stop'}</button>
			</header>
			{config.routine.map(({reps, sets = 1}, i) => (
				<div key={i}>
					<div>
						{reps.map(([label, duration], ii) => {
							return (
								<div key={ii}>
									{label}: {formatTime(duration)}
								</div>
							)
						})}
					</div>
					<div>x{sets}</div>
				</div>
			))}
			<footer>{config.categories.join(' ')}</footer>
		</section>
	)
}
