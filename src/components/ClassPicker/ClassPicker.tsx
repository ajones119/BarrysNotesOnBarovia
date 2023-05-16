import React, { useState } from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./ClassPicker.module.scss"
import { Typography } from '../Typography/Typography';

const classes = [
    "Artificer",
    "Barbarian",
    "Bard",
    "Blood Hunter",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
    "None"
];

declare interface ClassPickerProps {
    onChange: (value: any) => void,
    value?: string | null,
    width?: number,
    label?: string,
}

const ClassPicker = ({ onChange, value, width = 300, label }: ClassPickerProps) => {

    return (
        <div className={css.classPicker} style={{width: `${width}px`}}>
            <Typography className={css.header} size="caption">{label || "Class"}</Typography>
            <Select
                value={value}
                onChange={(event) => {
                    const chosenClass = event.target.value;
                    onChange(chosenClass)
                }}
                className={css.picker}
                style={{width: `${width}px`}}
                label='classes'
                defaultValue={"None"}
                variant="standard"
            >
                { classes?.map((className) => (
                    <MenuItem key={`picker-${className}`} value={className}>{className}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default ClassPicker;