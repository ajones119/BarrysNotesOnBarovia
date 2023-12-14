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
    hideGrid?: boolean,
    gridColor?: string,
    mapColor?: string,
    extraTokens?: Array<{
        id: string,
        disabled?: boolean,
        data: {
            image: string;
            position: {
                x: number,
                y: number,
            }
            length: number,
            width: number,
            name: string,
            color?: string,
            opacity?: number,
            rotation?: number,
            canRotate?: boolean,
            playerAdded?: boolean
        }
    }>
}