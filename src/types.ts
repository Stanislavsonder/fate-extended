
export enum AspectType {
    Concept = 'concept',
    Neutral = "neutral",
    Problem = 'problem'
}


type Aaa = {
    a: string
}

export type Aspect = {
    title: string
    description: string
    type: AspectType
}

export type Skill = {
    name: string,
    level: number,
    experience: number
}

export type Stunt = {
    name: string,
    skill: string,
    description: string
}

export type Module = {
    a: string
}

enum ConsequenceSeverity {
    Easy,
    Medium,
    Hard,
}

export type Consequence = {
    title: string
    description: string,
    type: ConsequenceSeverity
}

export type MainParam = {
    max: number
    current: number,
    consequences: Consequence[]
}
export type Health = MainParam
export type Mental = MainParam
export type Mana = Omit<MainParam, 'consequences'>
export type Intoxication = Omit<MainParam, 'consequences'>


export type CharacterCoreModule = {
    name: string
    race: string
    level: number
    modules: Module[]
    aspects: Aspect[]
    description: string
    inventory: string
    skills: Skill[]
    stunts: Stunt[]
    hp: Health
    mental: Mental
}


type CharacterMagicModule = {
    mana: Mana
}

type CharacterAlchemyModule = {
    intoxication: Intoxication
}

export type Character = CharacterCoreModule &
    CharacterAlchemyModule &
    CharacterMagicModule

export enum ModuleStatus {
    New,
    Changed,
    Removed
}

export type SkillType = {
    name: string
    overcome: boolean,
    advantage: boolean,
    attack: boolean,
    defence: boolean,
    bonuses: string[],
    module: string,
    status: ModuleStatus
}
