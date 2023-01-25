import { createStore } from 'vuex'
import {Aspect, Character, Skill, Stunt} from "@/types";
import { copy, EMPTY_CHARACTER } from "@/consts/const";

export default createStore({
  state: {
    character: copy<Character>(EMPTY_CHARACTER)
  },
  getters: {
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
