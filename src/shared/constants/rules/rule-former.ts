import { Character, CharacterCoreModule, Module, Skill } from '@/types'
import { copy } from '@/consts/const'

export function joinSkills(modules: Module[]): Skill[] {
	if (!modules.length) {
		throw new Error('No modules loaded.')
	}
	const [core] = copy<Module[]>(modules).splice(0, 1)
	const allSkills = copy<Skill[]>(core.skills || [])

	for (let i = 0; i < modules.length; i++) {
		const skills = modules[i].skills || []

		skills.forEach(newSkill => {
			const foundIndex = allSkills.findIndex(existedSkill => existedSkill.name === newSkill.name)
			if (foundIndex >= 0) {
				allSkills.splice(foundIndex, 1, extendSkill(allSkills[foundIndex], newSkill))
				return
			}
			allSkills.push(newSkill)
		})
	}

	return allSkills
}

function extendSkill(extendable: Skill, extension: Skill): Skill {
	return {
		name: extendable.name,
		module: extendable.module,
		attack: extension.attack,
		defence: extension.defence,
		overcome: extension.overcome,
		advantage: extension.advantage,
		bonuses: [...extendable.bonuses, ...extension.bonuses],
		status: extension.status,
	}
}

export function joinCharacter(modules: Module[]): Character {
	if (!modules[0].character) {
		throw new Error('Rules error', { cause: 'Wrong modules order' })
	}

	const [core] = copy<Module[]>(modules).splice(0, 1)

	const character = copy<CharacterCoreModule>(core.character as CharacterCoreModule)

	for (let i = 0; i < modules.length; i++) {
		const characterAddon = modules[i].character

		if (!characterAddon) {
			continue
		}

		for (const key in characterAddon) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			character[key] = characterAddon[key]
		}
	}
	return character as Character
}
