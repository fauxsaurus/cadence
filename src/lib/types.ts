type IInt = number
type ISec = IInt
type ILabel = string

export type IConfig = {
	label: ILabel
	/** @note sets defaults to one */
	routine: {reps: [ILabel, ISec][]; sets?: IInt}[]
	categories: string[]
}

export type IMsSinceEpoch = number
type IPaused = -1

type IPrevElapsedTime = IMsSinceEpoch

export type IState = {
	currentTime: IMsSinceEpoch
	/** @note [isRunning, time elapsed during prior pauses] */
	times: [IPaused | IMsSinceEpoch, IPrevElapsedTime]
}
