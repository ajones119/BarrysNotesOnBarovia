import { CombatCharacter } from "./CombatCharacter";

export type Combat = {
    docId?: string;
    campaignDocId?: string;
    combatCharacterArray: CombatCharacter[];
    name?: string;
    currentTurnIndex?: number;
    map?: CombatMap;
}

export type CombatMap = {
    rows?: number,
    columns?: number,
    tokenSize?: number,
    mapImage?: string,
    extraTokens?: Array<{
        id: string,
        data: {
            image: string;
            position: {
                x: number,
                y: number,
            }
            length: number,
            width: number,
            name: string,
            color?: string
        }
    }>
}