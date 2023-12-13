import React from 'react';
import { Select, MenuItem, styled } from "@mui/material"
import css from "./ColorPicker.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

export const COLORS_MAP = {
    Black: "#000000",
    Blue: "#190dfc",
    Green: "#07d600",
    Lime: "#95ff00",
    Orange: "#f74c02",
    Pink: "#eb4492",
    Red: "#ff0800",
    Sky: "#63b9ff",
    White: "#ffffff",
    Yellow: "#ffbb00",
    Gray: "#828282",
    Brown: "#7B3F00"
}

export const COLORS = [
    {
        label: "Black",
        value: "#000000"
    },
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
    {
        label: "Gray",
        value: "#828282"
    },
    {
        label: "Brown",
        value: "#7B3F00"
    },
];

declare interface ColorPickerProps {
    onChange: (value: string) => void,
    value?: string | null,
    width?: number,
    outlined?: boolean,
}

const CustomizedSelect = styled(Select)`
  color: #fffffff;
  border-color: #fffffff;

  :hover {
    color: #fffffff;
  }
`;

const ColorPicker = ({ onChange, value, width = 150, outlined }: ColorPickerProps) => {
    return (
        <div className={css.colorPicker} style={{width: `${width}px`}}>
            <CustomizedSelect
                value={value}
                onChange={(event) => {
                    const chosenColor = event.target.value as string;
                    onChange(chosenColor)
                }}
                className={css.picker}
                style={{width: `${width}px`, borderStyle: outlined ? "solid" : undefined}}
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