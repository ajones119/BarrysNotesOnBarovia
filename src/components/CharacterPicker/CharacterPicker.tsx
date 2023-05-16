import React, { useState } from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./CharacterPicker.module.scss"
import { Typography } from '../Typography/Typography';
import { NPC } from '../../model/NPC';
import { Character } from '../../model/Character';

declare interface CharacterPickerProps {
    onChange: (value: any) => void,
    value?: string | null,
    width?: number,
    characters?: Character[],
}

const CharacterPicker = ({ onChange, value, width = 300, characters }: CharacterPickerProps) => {
    return (
        <div className={css.CharacterPicker} style={{width: `${width}px`}}>
            <Typography className={css.header} size="caption">NPCs</Typography>
            <Select
                value={value}
                onChange={(event) => {
                    const npc = event.target.value;
                    onChange(npc)
                }}
                className={css.picker}
                style={{width: `${width}px`}}
                label='NPCs'
                defaultValue={"None"}
                variant="standard"
            >
                { characters?.map((npc) => (
                    <MenuItem key={`picker-${npc.docId}`} value={npc.docId}>{npc.name}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default CharacterPicker;