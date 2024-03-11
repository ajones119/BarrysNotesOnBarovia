import { BaseCharacter } from "./BaseCharacter";

export interface PlayerCharacter extends BaseCharacter {
    player?: string,
    className?: string,
    level?: number,
    maxHealth?: number;
    dndBeyondURL?: string;
    initiativeBonus?: number;
    race?: string;
    disabled?: boolean;
    health?: number;
    tempHealth?: number;
    conditions?: string[]
}