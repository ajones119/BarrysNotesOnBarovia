export type CombatCharacter = {
    initiative?: number;
    initiativeBonus?: number;
    name?: string;
    armorClass?: number;
    health?: number;
    maxHealth?: number;
    playerDocId?: string;
    passivePerception?: number;
    shouldShowHealthBar?: boolean;
    shouldShow?: boolean;
    isConcentrating?: boolean;
    conditions?: string[];
    color ?: string;
}