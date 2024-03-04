import React from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./CharacterPicker.module.scss"
import { Typography } from '../Typography/Typography';
import { PlayerCharacter } from '@model/PlayerCharacter';
import Avatar from '@components/Avatar';

declare interface CharacterPickerProps {
    onChange: (value: any) => void,
    value?: string | null,
    width?: number,
    characters?: PlayerCharacter[],
    avatars?: boolean,
}

const CharacterPicker = ({ onChange, value, width = 300, characters, avatars = false }: CharacterPickerProps) => {

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
            {!avatars && <Typography className={css.header} size="caption">Character</Typography>}
            <Select
                value={value}
                onChange={(event) => {
                    const npc = event.target.value;
                    onChange(npc)
                }}
                className={css.picker}
                style={{width: `${width}px`}}
                label={avatars ? undefined : 'Character'}
                defaultValue={"__none__"}
                variant="standard"
                renderValue={avatars ? (selected: any) => {
                    const character = characters?.find(char => char?.docId === selected);
                    const src = character?.characterImageURL ? String(character?.characterImageURL) : null;
                    return src ? (
                        <Avatar src={src} size={24} />
                    ) : null;
                } : undefined}>
                { characters?.map((npc) => (
                    <MenuItem key={`picker-${npc.docId}`} value={npc.docId}>{npc.name}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default CharacterPicker;
