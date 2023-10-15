import React from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./CharacterTypeSelect.module.scss"
import { Typography } from '@components/Typography/Typography';
import { CharacterType } from '@model/BaseCharacter';

declare interface CharacterTypeSelectProps {
    onChange: (value: any) => void,
    value?: string | null,
}

const CHARACTER_TYPES = ["None", "Aberration" , "Animal" , "Beast" , "Construct" , "Dragon" , "Elemental" , "Fey" , "Giant" , "Humanoid" , "Magical Beast" , "Monstrosity" , "Ooze" , "Plant" , "Undead" , "Unknown"]

const CharacterTypeSelect = ({ onChange, value }: CharacterTypeSelectProps) => {

    return (
        <div className={css.characterTypeSelect}>
            <Typography className={css.header} size="caption">Character Type</Typography>
            <Select
                value={value}
                onChange={(event) => {
                    const type = event.target.value;
                    onChange(type || "")
                }}
                style={{width: "100%"}}
                className={css.select}
                label='Size'
                defaultValue={"None"}
                variant="standard"
            >
                { CHARACTER_TYPES?.map((type) => (
                    <MenuItem key={`picker-${type}`} value={type}>{type}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default CharacterTypeSelect;