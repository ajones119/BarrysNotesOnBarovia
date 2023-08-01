export type AbilityScores = {
    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
}

export const BASE_ABILITY_SCORES = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
}

export type SkillProficiency = {
    name: string,
    bonus: number,
}

export type CharacterAction = {
    name: string,
    description: string
}