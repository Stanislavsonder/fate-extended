import { CharacterMagicModule, Module, ModuleMeta, ModuleStatus, Skill } from '@/types'

const MODULE_META: ModuleMeta = {
	code: 'magic',
	name: 'Magic & Wizardry',
	icon: 'Magic'
}

const BASE_MANA = 0

const SKILLS: Skill[] = [
	{
		name: 'magic',
		overcome: true,
		advantage: true,
		attack: true,
		defence: true,
		bonuses: ['+20 ед маны за ед. навыка'],
		module: 'magic',
		status: ModuleStatus.New
	},
	{
		name: 'will',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: ['+30 ед маны за ед. навыка'],
		module: 'magic',
		status: ModuleStatus.Changed
	},
	{
		name: 'knowledge',
		overcome: true,
		advantage: true,
		attack: false,
		defence: false,
		bonuses: ['+3 максимум заклинаний за ед. навыка'],
		module: 'magic',
		status: ModuleStatus.Changed
	}
]

const CHARACTER: CharacterMagicModule = {
	mana: {
		modifier: 0,
		current: BASE_MANA
	}
}

export default {
	skills: SKILLS,
	meta: MODULE_META,
	character: CHARACTER,
	other: {
		baseMana: BASE_MANA
	}
} as Module
