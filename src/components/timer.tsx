import {formatTime, type IConfig, type IState, calculateDerivativeState} from '../lib'

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
		<section data-done={isDone}>
			<header>
				{config.label}: {formatTime(timeLeftSec)}{' '}
				<button onClick={onToggle}>{isPaused ? 'Start' : 'Stop'}</button>
				<button onClick={onReset}>Reset</button>
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
					{sets > 1 && <div>x{sets}</div>}
				</div>
			))}
			<footer>{config.categories.join(' ')}</footer>
		</section>
	)
}
