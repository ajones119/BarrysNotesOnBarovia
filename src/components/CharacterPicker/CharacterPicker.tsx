import React from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./CharacterPicker.module.scss"
import { Typography } from '../Typography/Typography';
import { PlayerCharacter } from '@model/PlayerCharacter';

declare interface CharacterPickerProps {
    onChange: (value: any) => void,
    value?: string | null,
    width?: number,
    characters?: PlayerCharacter[],
}

const CharacterPicker = ({ onChange, value, width = 300, characters }: CharacterPickerProps) => {

    characters = characters?.filter((character) => character.docId !== "__none__")

    characters?.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
    });

    characters?.push({ docId: "__none__", name: "None"})


    return (
        <div className={css.CharacterPicker} style={{width: `${width}px`}}>
            <Typography className={css.header} size="caption">Character</Typography>
            <Select
                value={value}
                onChange={(event) => {
                    const npc = event.target.value;
                    onChange(npc)
                }}
                className={css.picker}
                style={{width: `${width}px`}}
                label='Character'
                defaultValue={"__none__"}
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
