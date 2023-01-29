import { createStore } from 'vuex'
import { Aspect, Character, Skill, Stunt } from '@/types'
import { BASE_HEALTH, BASE_INTOXICATION, BASE_MANA, BASE_MENTAL, copy, EMPTY_CHARACTER } from '@/consts/const'

interface CharacterStore {
	current: number
	characters: Character[]
}
// TODO: Decompose store
export default createStore<CharacterStore>({
	state: {
		current: 0,
		characters: [copy<Character>(EMPTY_CHARACTER)],
	},
	getters: {
		maxHealth(state) {
			return (
				BASE_HEALTH +
				(state.characters[state.current].skills.find(e => e.name === 'constitution')?.level || 0) * 15 +
				state.characters[state.current].health.modifier
			)
		},
		maxMental(state) {
			return (
				BASE_MENTAL +
				(state.characters[state.current].skills.find(e => e.name === 'will')?.level || 0) * 12 +
				state.characters[state.current].mental.modifier
			)
		},
		maxMana(state) {
			return (
				BASE_MANA +
				(state.characters[state.current].skills.find(e => e.name === 'magic')?.level || 0) * 20 +
				(state.characters[state.current].skills.find(e => e.name === 'will')?.level || 0) * 30 +
				state.characters[state.current].mana.modifier
			)
		},
		maxIntoxication(state) {
			return (
				BASE_INTOXICATION +
				(state.characters[state.current].skills.find(e => e.name === 'constitution')?.level || 0) * 20 +
				(state.characters[state.current].skills.find(e => e.name === 'alchemy')?.level || 0) * 15 +
				state.characters[state.current].intoxication.modifier
			)
		},
	},
	mutations: {
		loadCharacters(state, characters: Character[]) {
			state.characters = characters
		},
		setCharacter(state, character: Character) {
			if (state.characters[state.current].name === character.name) {
				state.characters[state.current] = copy<Character>(character)
				return
			}
			state.characters.push(copy<Character>(character))
		},
		clearCharacter(state) {
			state.characters[state.current] = copy<Character>(EMPTY_CHARACTER)
		},
		updateAspects(state, aspects: Aspect[]) {
			state.characters[state.current].aspects = aspects
		},
		updateSkills(state, skills: Skill[]) {
			state.characters[state.current].skills = skills
		},
		updateStunts(state, stunts: Stunt[]) {
			state.characters[state.current].stunts = stunts
		},
		updateName(state, name: string) {
			state.characters[state.current].name = name
		},
		updateRace(state, race: string) {
			state.characters[state.current].race = race
		},
		updateLuck(state, luck: number) {
			state.characters[state.current].luck = luck
		},
		updateDescription(state, description: string) {
			state.characters[state.current].description = description
		},
		updateInventory(state, inventory: string) {
			state.characters[state.current].inventory = inventory
		},
		addNewCharacter(state) {
			state.characters.push(copy(EMPTY_CHARACTER))
			state.current = state.characters.length - 1
		},
		changeCharacter(state, index: number) {
			if (index >= 0 && index < state.characters.length) {
				state.current = index
			}
		},
		removeCharacter(state, index: number) {
			if (index < 0 || index > state.characters.length) {
				return
			}

			if (state.characters.length === 1) {
				state.characters[0] = copy(EMPTY_CHARACTER)
				return
			}

			state.characters = state.characters.filter((c, i) => i !== index)
			state.current = index ? index - 1 : 0
		},
	},
	actions: {},
	modules: {},
})
