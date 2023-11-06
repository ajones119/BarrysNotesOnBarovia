export type AbilityScores = {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
};

export type SavingThrow =
    | "Strength"
    | "Dexterity"
    | "Constitution"
    | "Intelligence"
    | "Wisdom"
    | "Charisma";

export const BASE_ABILITY_SCORES = {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
};

export type SkillProficiency = {
    name: string;
    bonus: number;
};

export type CharacterAction = {
    name: string;
    description: string;
};

export type CharacterSizes =
    | "Tiny"
    | "Small"
    | "Medium"
    | "Large"
    | "Huge"
    | "Gargantuan";

export type CharacterType =
    | "Aberration"
    | "Animal"
    | "Beast"
    | "Celestial"
    | "Construct"
    | "Dragon"
    | "Elemental"
    | "Fey"
    | "Fiend"
    | "Giant"
    | "Humanoid"
    | "Magical Beast"
    | "Monstrosity"
    | "Ooze"
    | "Plant"
    | "Undead"
    | "Unknown";
export type CharacterTypeLowercase =
    | "aberration"
    | "animal"
    | "beast"
    | "celestial"
    | "construct"
    | "dragon"
    | "elemental"
    | "fey"
    | "fiend"
    | "giant"
    | "humanoid"
    | "magical beast"
    | "monstrosity"
    | "ooze"
    | "plant"
    | "undead"
    | "unknown";

export type BaseCharacter = {
    docId?: string;
    campaignDocId?: string;
    name: string;
    description?: string;
    backstory?: string;
    size?: CharacterSizes;
    type?: CharacterType;
    characterImageURL?: string;
    abilityScores: AbilityScores;
    armorClass?: number;
    savingThrowProficiencies?: SavingThrow[];
    averageHitPoints?: number;
    passivePerception?: number;
    skillProficiencies?: string[];
    proficiencyBonus?: number;
    speed?: number;
    actions?: string;
    bonusActions?: string;
    reactions?: string;
    lairActions?: string;
    legendaryActions?: string;
    otherActions?: string;
    xp?: number;
};
