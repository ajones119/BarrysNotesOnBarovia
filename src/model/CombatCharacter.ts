import { CharacterType } from "./BaseCharacter";

export type CombatCharacter = {
    initiative?: number;
    initiativeBonus?: number;
    name?: string;
    armorClass?: number;
    health?: number;
    maxHealth?: number;
    playerDocId?: string;
    npcDocId?: string;
    enemyId?: string;
    imageURL?: string;
    type?: CharacterType;
    passivePerception?: number;
    shouldShowHealthBar?: boolean;
    shouldShow?: boolean;
    isConcentrating?: boolean;
    conditions?: string[];
    color ?: string;
    size?: "small" | "medium" | "large" | "huge" | "gargantuan" | "colossal"
    position?: {
        x?: number;
        y?: number;
    }
}