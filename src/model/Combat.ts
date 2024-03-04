import { CombatToken } from "./CombatMap";

export type Combat = {
    docId?: string;
    campaignDocId?: string;
    combatCharacterIds?: string[];
    name?: string;
    currentTurnIndex?: number;
    map?: CombatMap;
    colorFilter?: string[],
}

export type CombatMap = {
    docId?: string;
    rows?: number,
    columns?: number,
    tokenSize?: number,
    mapImage?: string | File,
    hideGrid?: boolean,
    gridColor?: string,
    mapColor?: string,
    extraTokens?: Array<CombatToken>
}