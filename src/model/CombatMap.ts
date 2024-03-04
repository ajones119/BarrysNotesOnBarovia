
export type CombatMap = {
    docId?: string;
    campaignDocId?: string;
    combatDocId?: string;
    rows?: number,
    columns?: number,
    tokenSize?: number,
    mapImage?: string | File,
    hideGrid?: boolean,
    gridColor?: string,
    mapColor?: string,
    extraTokens?: Array<CombatToken>
}

export type CombatToken = {
    docId?: string,
    combatMapDocId?: string,
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
}