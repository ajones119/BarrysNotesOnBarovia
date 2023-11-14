import { CombatCharacter } from "./CombatCharacter";

export type Combat = {
    docId?: string;
    campaignDocId?: string;
    combatCharacterArray: CombatCharacter[];
    name?: string;
    currentTurnIndex?: number;
}