import { CombatCharacter } from "@model/CombatCharacter";
import { Avatar, Typography } from "@mui/material";
import BACKUP from "@images/barry-cartoon.png"
import React from "react";
import { BASE_CHARACTER_IMAGE_MAP } from "utils/getBaseCharacterGenericImage";
import { CharacterTypeLowercase } from "@model/BaseCharacter";

type CharacterTokenContentProps = {
    character: CombatCharacter;
    tokenSize?: number;
};

const TOKEN_SIZE_MULTIPLIERS = {
    small: 1,
    medium: 1,
    large: 2,
    huge: 3,
    gargantuan: 4,
    colossal: 6

};

const CharacterTokenContent = ({ character, tokenSize = 16 }: CharacterTokenContentProps) => {
    const characterType: CharacterTypeLowercase = (character?.type?.toLowerCase() || "unknown") as CharacterTypeLowercase;
    const defaultImage = BASE_CHARACTER_IMAGE_MAP[characterType] 
    const image = character?.imageURL || defaultImage;
    const size = TOKEN_SIZE_MULTIPLIERS[character?.size || "medium"] * tokenSize;

    return (
        <div>
            <Avatar
                src={image || BACKUP}
                alt="boo"
                sx={{width: size, height: size}}
            />
            <Typography>{character?.name}</Typography>
        </div>
    )
}

export default CharacterTokenContent;