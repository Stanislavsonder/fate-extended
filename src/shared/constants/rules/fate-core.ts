import { CharacterCoreModule, Module, ModuleMeta, ModuleStatus, Skill } from '@/types'

const BASE_HEALTH = 50
const BASE_MENTAL = 35

const MODULE_META: ModuleMeta = {
	code: 'core',
	name: 'FATE: Extended Core',
	icon: 'Core'
}

const CHARACTER: CharacterCoreModule = {
	name: '',
	race: '',
	luck: 0,
	health: {
		current: BASE_HEALTH,
		modifier: 0,
		consequences: []
	},
	mental: {
		current: BASE_MENTAL,
		modifier: 0,
		consequences: []
	},
	aspects: [],
	inventory: '',
	description: '',
	skills: [],
	stunts: [],
	modules: [],
	level: 1
}

const SKILL_LEVEL_CUP = [20, 50, 90, 150, 200, 300, 450, 625, 825, 1000]

const SKILLS: Skill[] = [
	{
		name: 'lockpicking',
		overcome: true,
		advantage: false,
		attack: false,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'driving',
		overcome: true,
		advantage: true,
		attack: false,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'will',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: ['+15 ед. ментального стресса за ед. навыка'],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'theft',
		overcome: true,
		advantage: true,
		attack: false,
		defence: false,
		bonuses: ['+0.5 фт. к дальности кражи за ед. навыка'],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'perception',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: ['+5 фт. к дальности обзора за ед. навыка'],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'deduction',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'fight',
		overcome: true,
		advantage: true,
		attack: true,
		defence: true,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'knowledge',
		overcome: true,
		advantage: true,
		attack: false,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'contacts',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'agility',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: ['+5 фт к перемещению за ед. навыка'],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'medicine',
		overcome: true,
		advantage: true,
		attack: false,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'craft',
		overcome: true,
		advantage: true,
		attack: false,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'deceit',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'provocation',
		overcome: true,
		advantage: true,
		attack: true,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'resources',
		overcome: true,
		advantage: true,
		attack: false,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'stealth',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'shooting',
		overcome: true,
		advantage: true,
		attack: true,
		defence: false,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'constitution',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: ['+15 ед. здоровья за ед. навыка'],
		module: 'core',
		status: ModuleStatus.New
	},
	{
		name: 'charisma',
		overcome: true,
		advantage: true,
		attack: false,
		defence: true,
		bonuses: [],
		module: 'core',
		status: ModuleStatus.New
	}
]

export default {
	skills: SKILLS,
	meta: MODULE_META,
	character: CHARACTER,
	other: {
		baseHealth: BASE_HEALTH,
		baseMental: BASE_MENTAL
	},
	experienceLevelCup: SKILL_LEVEL_CUP
} as Module
