import { Chip, MenuItem, Select, Stack, styled } from "@mui/material";
import React from "react";
import css from "../DMInitiative.module.scss"
import CancelIcon from "@mui/icons-material/Cancel";
import { faBed, faChildCombatant, faEarDeaf, faFaceFlushed, faFaceGrinHearts, faFaceTired, faFire, faGem, faHandsHoldingChild, faMoon, faPersonFallingBurst, faPersonShelter, faPersonWalkingWithCane, faSkullCrossbones, faUserAstronaut, faUserSecret, faWheelchair } from "@fortawesome/free-solid-svg-icons";

type ConditionSelectProps = {
    onChange: (value: string[] | null) => void,
    selectedValue?: string[] | null,
    width?: number,
}

const CustomizedSelect = styled(Select)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export const CONDITION_OPTIONS = [
    {
        label: "Blinded",
        value: "blinded",
        icon: faPersonWalkingWithCane,
    },
    {
        label: "Burning",
        value: "burning",
        icon: faFire,
    },
    {
        label: "Charmed",
        value: "charmed",
        icon: faFaceGrinHearts
    },
    {
        label: "Deafened",
        value: "deafened",
        icon: faEarDeaf
    },
    {
        label: "Frightened",
        value: "frightened",
        icon: faChildCombatant
    },
    {
        label: "Grappled",
        value: "grappled",
        icon: faHandsHoldingChild
    },
    {
        label: "Incapacitated",
        value: "incapacitated",
        icon: faBed
    },
    {
        label: "Invisible",
        value: "invisible",
        icon: faUserSecret
    },
    {
        label: "Paralyzed",
        value: "paralyzed",
        icon: faWheelchair
    },
    {
        label: "Petrified",
        value: "petrified",
        icon: faGem
    },
    {
        label: "Poisoned",
        value: "poisoned",
        icon: faSkullCrossbones
    },
    {
        label: "Prone",
        value: "prone",
        icon: faPersonFallingBurst
    },
    {
        label: "Restrained",
        value: "restrained",
        icon: faPersonShelter
    },
    {
        label: "Stunned",
        value: "stunned",
        icon: faFaceFlushed
    },
    {
        label: "Unconscious",
        value: "unconscious",
        icon: faMoon
    },
    {
        label: "Exhausted",
        value: "exhausted",
        icon: faFaceTired
    },
]

const ConditionSelect = ({onChange, selectedValue, width = 100}: ConditionSelectProps) => {
    return (<CustomizedSelect
        multiple
        multiline
        value={selectedValue || []}
        onChange={({target: {value = []}}) => {
            console.log("VALUE", value)
            const chosen = value;
            
            onChange(chosen as any)
        }}
        className={css.picker}
        style={{width: `${width}px`}}
        variant="standard"
        renderValue={(selected: any) => (
            <Stack gap={1} direction="row" flexWrap="wrap">
              {selected.map((value: string) => {
                const label = CONDITION_OPTIONS.find(option => option.value === value)?.label || "";
                return(
                    <Chip
                        variant="outlined"
                        color="primary"
                        key={value}
                        label={label}
                        onDelete={() =>
                            onChange(
                                selectedValue?.filter((item) => item !== value) || []
                            )
                        }
                        deleteIcon={
                            <CancelIcon
                                onMouseDown={(event) => event.stopPropagation()}
                            />
                        }
                    />
                )})}
            </Stack>
          )}
        >
        { CONDITION_OPTIONS?.map((options) => (
            <MenuItem key={`picker-${options.label}`} value={options.value}>{options.label}</MenuItem>
            ))
        }
    </CustomizedSelect>);
}

export default ConditionSelect;