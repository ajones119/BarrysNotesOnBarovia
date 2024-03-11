
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
    cover?: boolean;
    gridOffsetX?: number;
    gridOffsetY?: number;
    mapScale?: number;
    autoGrid?: boolean;
    gridLineWidth?: number;
    lines?: string;
    fogOfWar: string
}

export type CombatToken = {
    docId?: string,
    combatMapDocId?: string,
    baseTokenId?: string
    disabled?: boolean,
    data: {
        image: string | File;
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
        playerAdded?: boolean,
    },
}

export type CustomToken = {
    docId?: string,
    image?: string | File;
    height: number,
    width: number,
    name: string,
    canChangeColor?: boolean,
    opacity?: number,
}