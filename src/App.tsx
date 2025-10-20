import {useEffect, useState} from 'react'
import {Timer} from './components/timer'
import {defaultConfig} from './config'
import {calculateDerivativeState, createConfig, createTimeState, setAt, type IState} from './lib'

import './App.css'

const App = () => {
	const [configs, setConfigs] = useState(defaultConfig)
	const [timeStates, setTimeStates] = useState(configs.map(() => createTimeState()))

	const [currentTime, setCurrentTime] = useState(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setCurrentTime(Date.now()), 1000)

		return () => clearInterval(interval)
	})

	const addTimer = () => {
		setConfigs(configs => configs.concat([createConfig()]))
		setTimeStates(states => states.concat([createTimeState()]))
	}

	const resetTimer = (i: number) => {
		setTimeStates(timeStates => setAt(timeStates, i, createTimeState()))
	}

	const toggleTimer = (i: number) => {
		const state = {currentTime, times: timeStates[i]}
		const derivativeState = calculateDerivativeState(configs[i], state)

		// isPaused = start, isDone = reset, isRunning = pause
		const newTimes: IState['times'] = derivativeState.isPaused
			? [currentTime, derivativeState.msElapsedFromPriorPauses]
			: derivativeState.isDone
			? createTimeState()
			: [
					-1,
					derivativeState.msElapsedFromPriorPauses +
						derivativeState.msElapsedSinceLastStart,
			  ]

		setTimeStates(timeStates => setAt(timeStates, i, newTimes))
	}

	return (
		<>
			<header>
				<h1>Cadence</h1>
				<button onClick={addTimer}>+</button>
			</header>
			{timeStates.map((times, i) => (
				<Timer
					config={configs[i]}
					state={{currentTime, times}}
					key={i}
					onToggle={() => toggleTimer(i)}
					onReset={() => resetTimer(i)}
				/>
			))}
		</>
	)
}

export default App
