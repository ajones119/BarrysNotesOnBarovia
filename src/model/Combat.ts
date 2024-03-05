import { CombatMap, CombatToken } from "./CombatMap";

export type Combat = {
    docId?: string;
    campaignDocId?: string;
    combatCharacterIds?: string[];
    name?: string;
    currentTurnIndex?: number;
    map?: CombatMap;
    colorFilter?: string[],
}