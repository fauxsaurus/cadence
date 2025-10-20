import {useEffect, useState} from 'react'
import {defaultConfig} from './config'
import {calculateDerivativeState, createConfig, createTimeState, setAt, type IState} from './lib'
import './App.css'

const App = () => {
	const [configs, setConfigs] = useState(defaultConfig)
	const [timeStates, setTimeStates] = useState(configs.map(() => createTimeState()))

	const [currentTime, setCurrentTime] = useState(Date.now())


	return (
		<>
		</>
	)
}

export default App
