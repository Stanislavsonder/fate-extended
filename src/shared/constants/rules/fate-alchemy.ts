import { CharacterAlchemyModule, Module, ModuleMeta, ModuleStatus, Skill } from '@/types'

const BASE_INTOXICATION = 20

const MODULE_META: ModuleMeta = {
	code: 'alchemy',
	name: 'Toxicity',
	icon: 'Alchemy',
}

const SKILLS: Skill[] = [
	{
		name: 'alchemy',
		overcome: true,
		advantage: true,
		attack: true,
		defence: true,
		bonuses: ['+15 ед безопасного порога интоксикации за ед. навыка'],
		module: 'alchemy',
		status: ModuleStatus.New,
	},
	{
		name: 'constitution',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: ['+20 ед безопасного порога интоксикации за ед. навыка'],
		module: 'alchemy',
		status: ModuleStatus.Changed,
	},
]

const CHARACTER: CharacterAlchemyModule = {
	intoxication: {
		modifier: 0,
		current: BASE_INTOXICATION,
	},
}

export default {
	skills: SKILLS,
	meta: MODULE_META,
	character: CHARACTER,
	other: {
		baseIntoxication: BASE_INTOXICATION,
	},
} as Module
