
export type CombatMap = {
    docId?: string;
    campaignDocId?: string;
    combatDocId?: string;
    combatMapCharacterArray: CombatMapCharacter[];
    map?: CombatMapSettings;
}

type CombatMapCharacter = {
    position: {
        x: number,
        y: number
    }
    turnIndex: number,
    playerDocId?: string,
    npcDocId?: string,
    enemyId?: string
    uniqueId?: number;
}

type CombatMapSettings = {
    rows?: number,
    columns?: number,
    tokenSize?: number,
    mapImage?: string | File,
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