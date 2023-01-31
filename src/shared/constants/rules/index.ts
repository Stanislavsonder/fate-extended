import core from './fate-core'
import magic from './fate-magic'
import alchemy from './fate-alchemy'
import { joinCharacter, joinSkills } from '@/shared/constants/rules/rule-former'

const modules = [core, magic, alchemy]

const skills = joinSkills(modules)
const character = joinCharacter(modules)

export default {
	SKILLS: skills,
	CHARACTER: character,
	BASE_HEALTH: core.other.baseHealth,
	BASE_MENTAL: core.other.baseMental,
	BASE_MANA: magic.other.baseMana,
	BASE_INTOXICATION: alchemy.other.baseIntoxication,
	LEVEL_CUPS: core.experienceLevelCup,
}
