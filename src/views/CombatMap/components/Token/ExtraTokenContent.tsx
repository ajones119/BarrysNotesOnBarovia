import { CombatCharacter } from "@model/CombatCharacter";
import { Avatar, Typography } from "@mui/material";
import BACKUP from "@images/barry-cartoon.png"
import React from "react";
import { BASE_CHARACTER_IMAGE_MAP } from "utils/getBaseCharacterGenericImage";
import { CharacterTypeLowercase } from "@model/BaseCharacter";

type ExtraTokenContentProps = {
    image: string;
    tokenSize?: number;
    height?: number;
    width?: number;
    cover?: boolean;
};

const TOKEN_SIZE_MULTIPLIERS = {
    small: 1,
    medium: 1,
    large: 2,
    huge: 3,
    gargantuan: 4,
    colossal: 6

};

const ExtraTokenContent = ({ image, tokenSize = 16, height = 2, width = 2, cover = false }: ExtraTokenContentProps) => {
    return (
        <div style={{width: tokenSize * width, height: tokenSize * height}}>
            <img
                src={image}
                width={tokenSize * width}
                height={tokenSize * height}
                style={{objectFit: cover ? "cover" : undefined}}
            />
        </div>
    )
}

export default ExtraTokenContent;