import React from 'react';
import { Select, MenuItem, styled } from "@mui/material"
import css from "./ColorPicker.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const COLORS = [
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

const CustomizedSelect = styled(Select)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

const ColorPicker = ({ onChange, value, width = 150, label }: ColorPickerProps) => {
    return (
        <div className={css.colorPicker} style={{width: `${width}px`}}>
            <CustomizedSelect
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
                inputProps={{
                    classes: {
                        icon: css.icon,
                    },
                }}
            >
                { COLORS?.map((color) => (
                    <MenuItem key={`picker-${color.label}`} value={color.value}><FontAwesomeIcon icon={faCircle} style={{color: color.value || "white"}} /></MenuItem>
                    ))
                }
            </CustomizedSelect>
        </div>
    );
}

export default ColorPicker;