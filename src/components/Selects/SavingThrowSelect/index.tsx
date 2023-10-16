import React from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./SavingThrow.module.scss"
import { Typography } from '@components/Typography/Typography';
import { SavingThrow } from '@model/BaseCharacter';

declare interface SavingThrowSelectProps {
    onChange: (value: any) => void,
    value?: SavingThrow[] | null,
}

const SAVING_THROWS = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Wisdom",
    "Intelligence",
    "Charisma",
]

const SavingThrowSelect = ({ onChange, value }: SavingThrowSelectProps) => {

    return (
        <div className={css.savingThrowSelect}>
            <Typography className={css.header} size="caption">Saving Throw Proficiencies</Typography>
            <Select
                multiple
                value={value}
                onChange={(event) => {
                    const savingThrow = event.target.value;
                    onChange(savingThrow)
                }}
                style={{width: "100%"}}
                className={css.select}
                label='Saving Throw'
                defaultValue={"None"}
                variant="standard"
            >
                { SAVING_THROWS?.map((save) => (
                    <MenuItem key={`picker-${save}`} value={save}>{save}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default SavingThrowSelect;