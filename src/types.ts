export enum AspectType {
	Concept = 'concept',
	Neutral = 'neutral',
	Problem = 'problem'
}

type CharacterModule = CharacterCoreModule | CharacterMagicModule | CharacterAlchemyModule

export type Module = {
	meta: ModuleMeta
	skills?: Skill[]
	character?: CharacterModule
	other?: any
	experienceLevelCup?: number[]
}

export type ModuleMeta = {
	code: string
	name: string
	icon: string
}

export type Aspect = {
	title: string
	description: string
	type: AspectType
}

export type SkillProgress = {
	name: string
	level: number
	experience: number
}

export type Stunt = {
	name: string
	skill: string
	description: string
}

enum ConsequenceSeverity {
	Easy,
	Medium,
	Hard
}

export type Consequence = {
	title: string
	description: string
	type: ConsequenceSeverity
}

export type MainParam = {
	current: number
	modifier: number
	consequences: Consequence[]
}
export type Health = MainParam
export type Mental = MainParam
export type Mana = Omit<MainParam, 'consequences'>
export type Intoxication = Omit<MainParam, 'consequences'>

export type CharacterCoreModule = {
	name: string
	race: string
	level: number
	modules: string[]
	aspects: Aspect[]
	description: string
	inventory: string
	skills: SkillProgress[]
	stunts: Stunt[]
	health: Health
	mental: Mental
	luck: number
}

export type CharacterMagicModule = {
	mana: Mana
}

export type CharacterAlchemyModule = {
	intoxication: Intoxication
}

export type Character = CharacterCoreModule & CharacterAlchemyModule & CharacterMagicModule

export enum ModuleStatus {
	New,
	Changed,
	Removed
}

export type Skill = {
	name: string
	overcome: boolean
	advantage: boolean
	attack: boolean
	defence: boolean
	bonuses: string[]
	module: string
	status: ModuleStatus
}

export enum RollType {
	Overcome = 'overcome',
	Advantage = 'advantage',
	Attack = 'attack',
	Defence = 'defence'
}
