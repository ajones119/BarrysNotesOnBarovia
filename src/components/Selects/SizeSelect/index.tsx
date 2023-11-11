import React from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./SizeSelect.module.scss"
import { Typography } from '@components/Typography/Typography';

declare interface SizeSelectProps {
    onChange: (value: any) => void,
    value?: string | null,
}

const SIZES = [
    "None",
    "Tiny",
    "Small",
    "Medium",
    "Large",
    "Huge",
    "Gargantuan"
]

const SizeSelect = ({ onChange, value }: SizeSelectProps) => {

    return (
        <div className={css.sizeSelect}>
            <Typography className={css.header} size="caption">Size</Typography>
            <Select
                value={value}
                onChange={(event) => {
                    const size = event.target.value;
                    onChange(size)
                }}
                style={{width: "100%"}}
                className={css.select}
                label='Size'
                defaultValue={"None"}
                variant="standard"
            >
                { SIZES?.map((size) => (
                    <MenuItem key={`picker-${size}`} value={size}>{size}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default SizeSelect;