import { createStore } from 'vuex'
import {Aspect, Character, Skill, Stunt} from "@/types";
import {BASE_HEALTH, BASE_INTOXICATION, BASE_MANA, BASE_MENTAL, copy, EMPTY_CHARACTER} from "@/consts/const";

export default createStore({
  state: {
    character: copy<Character>(EMPTY_CHARACTER)
  },
  getters: {
    maxHealth(state) {
      return BASE_HEALTH +
          (state.character.skills.find(e => e.name === 'constitution')?.level || 0) * 15
          + state.character.health.modifier
    },
    maxMental(state) {
      return BASE_MENTAL +
          (state.character.skills.find(e => e.name === 'will')?.level || 0) * 12
          + state.character.mental.modifier
    },
    maxMana(state) {
      return BASE_MANA +
          (state.character.skills.find(e => e.name === 'magic')?.level || 0) * 20
          + (state.character.skills.find(e => e.name === 'will')?.level || 0) * 30
          + state.character.mana.modifier
    },
    maxIntoxication(state) {
      return BASE_INTOXICATION +
          (state.character.skills.find(e => e.name === 'constitution')?.level || 0) * 20
          + (state.character.skills.find(e => e.name === 'alchemy')?.level || 0) * 15
          + state.character.intoxication.modifier
    }
  },
  mutations: {
    setCharacter(state, character: Character) {
      state.character = copy<Character>(character);
    },
    clearCharacter(state) {
      state.character = copy<Character>(EMPTY_CHARACTER)
    },
    updateAspects(state, aspects: Aspect[]) {
      state.character.aspects = aspects
    },
    updateSkills(state, skills: Skill[]) {
      state.character.skills = skills
    },
    updateStunts(state, stunts: Stunt[]) {
      state.character.stunts = stunts
    },
    updateName(state, name: string) {
      state.character.name = name
    },
    updateRace(state, race: string) {
      state.character.race = race
    },
    updateLuck(state, luck: number) {
      state.character.luck = luck
    },
    updateDescription(state, description: string) {
      state.character.description = description
    },
    updateInventory(state, inventory: string) {
      state.character.inventory = inventory
    },

  },
  actions: {
  },
  modules: {
  }
})
