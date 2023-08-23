import React, { useState } from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./ColorPicker.module.scss"

const colors = [
    {
        label: "Blue",
        value: "#190dfc"
    },
    {
        label: "Green",
        value: "#07d600"
    },
    {
        label: "Lime",
        value: "#95ff00"
    },
    {
        label: "Orange",
        value: "#f74c02"
    },
    {
        label: "Pink",
        value: "#eb4492"
    },
    {
        label: "Red",
        value: "#ff0800"
    },
    {
        label: "Sky",
        value: "#63b9ff"
    },
    {
        label: "White",
        value: "#ffffff"
    },
    {
        label: "Yellow",
        value: "#ffbb00"
    },
];

declare interface ColorPickerProps {
    onChange: (value: any) => void,
    value?: string | null,
    width?: number,
    label?: string,
}

const ColorPicker = ({ onChange, value, width = 300, label }: ColorPickerProps) => {

    return (
        <div className={css.colorPicker} style={{width: `${width}px`}}>
            <Select
                value={value}
                onChange={(event) => {
                    const chosenColor = event.target.value;
                    onChange(chosenColor)
                }}
                className={css.picker}
                style={{width: `${width}px`}}
                label='color'
                defaultValue={"#ffffff"}
                variant="standard"
            >
                { colors?.map((color) => (
                    <MenuItem key={`picker-${color.label}`} value={color.value}>{color.label}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default ColorPicker;