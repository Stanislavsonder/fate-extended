import {Aspect, Character, Consequence, MainParam, Skill, Stunt} from "@/types";

export const validateCharacter = (data: unknown): boolean => {
    if (!(data instanceof Object)) {
       return false
    }
    const char = data as Character
    if (typeof char.name === 'string' &&
        typeof char.race === 'string' &&
        typeof char.description === 'string' &&
        typeof char.inventory === 'string' &&
        typeof char.level === 'number' &&
        char.skills.every(validateSkill) &&
        char.stunts.every(validateStunt) &&
        char.aspects.every(validateAspect) &&
        char.skills.every(validateSkill) &&
        validateMainParam(char.hp) &&
        validateMainParam(char.mental)) {
        return true
    }
    return false
}

export const validateSkill = (data: unknown): boolean => {
    if (!(data instanceof Object)) {
        return false
    }
    const skill = data as Skill
    if (typeof skill.name === 'string' &&
        typeof skill.level === 'number' &&
        typeof skill.experience === 'number') {
        return true;
    }
    return false
}

export const validateStunt = (data: unknown): boolean => {
    if (!(data instanceof Object)) {
        return false
    }
    const stunt = data as Stunt
    if (typeof stunt.name === 'string' &&
        typeof stunt.skill === 'string' &&
        typeof stunt.description === 'string') {
        return true;
    }
    return false
}

export const validateAspect = (data: unknown): boolean => {
    if (!(data instanceof Object)) {
        return false
    }
    const aspect = data as Aspect
    if (typeof aspect.title === 'string' &&
        typeof aspect.description === 'string' &&
        (aspect.type === 'concept'
            || aspect.type === 'neutral'
            || aspect.type === 'problem')){
        return true;
    }
    return false
}

export const validateConsequence = (data: unknown): boolean => {
    if (!(data instanceof Object)) {
        return false
    }
    const consequence = data as Consequence
    if (typeof consequence.title === 'string' &&
        typeof consequence.description === 'string' &&
        (consequence.type === 0 ||  consequence.type === 1 || consequence.type === 2)){
        return true;
    }
    return false
}

export const validateMainParam = (data: unknown): boolean => {
    if (!(data instanceof Object)) {
        return false
    }
    const params = data as MainParam
    if (typeof params.max === 'number' &&
        typeof params.current === 'number' &&
        params.current <= params.max &&
        params.consequences.every(validateConsequence)){
        return true;
    }
    return false
}

