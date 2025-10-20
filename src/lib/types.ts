type IInt = number
type ISec = IInt
type ILabel = string

export type IConfig = {
	label: ILabel
	/** @note sets defaults to one */
	routine: {reps: [ILabel, ISec][]; sets?: IInt}[]
	categories: string[]
}

type IMsSinceEpoch = number

export type IState = {
	isPaused: boolean
	startedAt?: IMsSinceEpoch
	timeElapsedB4PrevPauses: IMsSinceEpoch
}
