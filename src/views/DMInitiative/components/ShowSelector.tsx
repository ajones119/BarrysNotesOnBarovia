import { Chip, MenuItem, Select, styled } from "@mui/material";
import React from "react";
import css from "../DMInitiative.module.scss"

type ShowSelectorProps = {
    onChange: (value: any) => void,
    value?: string | null,
    width?: number,
}

const CustomizedSelect = styled(Select)`
  color: #20b2aa;

`;

const options = [
    {
        label: "All",
        value: "all"
    },
    {
        label: "Hide HP",
        value: "hideHP"
    },
    {
        label: "Hide",
        value: "hide"
    }
]

const ShowSelector = ({onChange, value, width}: ShowSelectorProps) => {
    return (<CustomizedSelect
        value={value}
        onChange={(event) => {
            const chosenShow = event.target.value;
            onChange(chosenShow)
        }}
        className={css.picker}
        style={{width: `${width}px`}}
        variant="standard"
        renderValue={(selected: any) => { 
            const label = options.find(option => option.value === value)?.label
            return(
                <Chip
                    variant="outlined"
                    color="primary"
                    key={value}
                    label={label}
                />
          )}}
        >
        { options?.map((options) => (
            <MenuItem key={`picker-${options.label}`} value={options.value}>{options.label}</MenuItem>
            ))
        }
    </CustomizedSelect>);
}

export default ShowSelector;