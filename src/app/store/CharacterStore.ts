import { defineStore } from 'pinia'
import { Aspect, Character, SkillProgress, Stunt } from '@/types'
import { computed, ref } from 'vue'
import { copy } from '@/shared/helpers/helpers'
import rules from '@/shared/constants/rules'

export const useCharactersStore = defineStore('character', () => {
	const characters = ref<Character[]>([copy(rules.CHARACTER)])
	const current = ref<number>(0)

	const maxHealth = computed(() => {
		return (
			rules.BASE_HEALTH +
			(characters.value[current.value].skills.find(e => e.name === 'constitution')?.level || 0) * 15 +
			characters.value[current.value].health.modifier
		)
	})

	const maxMental = computed(() => {
		return (
			rules.BASE_MENTAL +
			(characters.value[current.value].skills.find(e => e.name === 'will')?.level || 0) * 12 +
			characters.value[current.value].mental.modifier
		)
	})

	const maxMana = computed(() => {
		return (
			rules.BASE_MANA +
			(characters.value[current.value].skills.find(e => e.name === 'magic')?.level || 0) * 20 +
			(characters.value[current.value].skills.find(e => e.name === 'will')?.level || 0) * 30 +
			characters.value[current.value].mana.modifier
		)
	})

	const maxIntoxication = computed(() => {
		return (
			rules.BASE_INTOXICATION +
			(characters.value[current.value].skills.find(e => e.name === 'constitution')?.level || 0) * 20 +
			(characters.value[current.value].skills.find(e => e.name === 'alchemy')?.level || 0) * 15 +
			characters.value[current.value].intoxication.modifier
		)
	})

	function loadCharacters(_characters: Character[]): void {
		characters.value = _characters
	}

	function setCharacter(character: Character) {
		if (characters.value[current.value].name === character.name) {
			characters.value[current.value] = copy<Character>(character)
			return
		}
		characters.value.push(copy<Character>(character))
	}

	function clearCharacter() {
		characters.value[current.value] = copy<Character>(rules.CHARACTER)
	}

	function updateAspects(aspects: Aspect[]) {
		characters.value[current.value].aspects = aspects
	}

	function updateSkills(skills: SkillProgress[]) {
		characters.value[current.value].skills = skills
	}

	function updateStunts(stunts: Stunt[]) {
		characters.value[current.value].stunts = stunts
	}

	function updateName(name: string) {
		characters.value[current.value].name = name
	}

	function updateRace(race: string) {
		characters.value[current.value].race = race
	}

	function updateLuck(luck: number) {
		characters.value[current.value].luck = luck
	}

	function updateDescription(description: string) {
		characters.value[current.value].description = description
	}

	function updateInventory(inventory: string) {
		characters.value[current.value].inventory = inventory
	}

	function addNewCharacter() {
		characters.value = [...characters.value, copy(rules.CHARACTER)]
		current.value = characters.value.length - 1
	}

	function changeCharacter(index: number) {
		if (index >= 0 && index < characters.value.length) {
			current.value = index
		}
	}

	function addSkillExperience(skill: string, experience: number) {
		characters.value[current.value].skills = characters.value[current.value].skills.map(e => {
			if (e.name !== skill) {
				return e
			}
			const diff = e.experience + experience
			if (diff < 0 && e.level === 1) {
				e.experience = 0
			} else if (diff < 0) {
				e.level--
				e.experience = rules.LEVEL_CUPS[e.level - 1] + diff
			} else if (diff >= rules.LEVEL_CUPS[e.level - 1] && e.level === rules.LEVEL_CUPS.length) {
				e.experience = rules.LEVEL_CUPS[e.level - 1]
			} else if (diff >= rules.LEVEL_CUPS[e.level - 1]) {
				e.experience = diff - rules.LEVEL_CUPS[e.level - 1]
				e.level++
			} else {
				e.experience += experience
			}
			return e
		})
	}

	function removeCharacter(index: number) {
		if (index < 0 || index > characters.value.length) {
			return
		}

		if (characters.value.length === 1) {
			characters.value[0] = copy(rules.CHARACTER)
			return
		}

		characters.value = characters.value.filter((c, i) => i !== index)
		current.value = index ? index - 1 : 0
	}

	return {
		characters,
		current,
		maxHealth,
		maxMana,
		maxMental,
		maxIntoxication,
		loadCharacters,
		setCharacter,
		clearCharacter,
		updateAspects,
		updateSkills,
		updateStunts,
		updateName,
		updateRace,
		updateLuck,
		updateDescription,
		updateInventory,
		addNewCharacter,
		changeCharacter,
		removeCharacter,
		addSkillExperience
	}
})
