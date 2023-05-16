import React, { useState } from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./NPCPicker.module.scss"
import { Typography } from '../Typography/Typography';
import { NPC } from '../../model/NPC';

declare interface NPCPickerProps {
    onChange: (value: any) => void,
    value?: string | null,
    width?: number,
    npcs?: NPC[],
}

const NPCPicker = ({ onChange, value, width = 300, npcs }: NPCPickerProps) => {

    return (
        <div className={css.NPCPicker} style={{width: `${width}px`}}>
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
                { npcs?.map((npc) => (
                    <MenuItem key={`picker-${npc.docId}`} value={npc.docId}>{npc.name}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default NPCPicker;