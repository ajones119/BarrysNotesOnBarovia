import { Chip, MenuItem, Select, Stack, styled } from "@mui/material";
import React from "react";
import css from "./ConditionsSelect.module.scss"
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { faBed, faBrain, faChildCombatant, faEarDeaf, faFaceFlushed, faFaceGrinHearts, faFaceTired, faFeather, faFire, faGem, faHandsHoldingChild, faMoon, faPersonFallingBurst, faPersonShelter, faPersonWalkingWithCane, faSkullCrossbones, faUserSecret, faWheelchair } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faFaceAngry } from "@fortawesome/free-regular-svg-icons";

type ConditionSelectProps = {
    onChange: (value: string[] | null) => void,
    selectedValue?: string[] | null,
    width?: string,
    outlined?: boolean,
}

export type Condition = {
    label: string,
    value: string,
    icon: IconDefinition
}

const CustomizedSelect = styled(Select)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }
`;

export const CONDITION_OPTIONS: Condition[] = [
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
        label: "Concentration",
        value: "concentration",
        icon: faBrain
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
        label: "Flying",
        value: "flying",
        icon: faFeather
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
        label: "Rage",
        value: "rage",
        icon: faFaceAngry
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

const ConditionSelect = ({onChange, selectedValue, width = "200px", outlined = false}: ConditionSelectProps) => {
    return (<CustomizedSelect
        label="Conditions"
        multiple
        multiline
        value={selectedValue || []}
        onChange={({target: {value = []}}) => {
            const chosen = value;
            
            onChange(chosen as any)
        }}
        className={css.picker}
        style={{width: `${width}`, borderStyle: outlined ? "solid" : undefined}}
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
        { CONDITION_OPTIONS?.map((option) => (
            <MenuItem key={`picker-${option.label}`} value={option.value}>
                {option.label}
                {selectedValue?.includes(option.value) ? <CheckIcon color="info" /> : null}
            </MenuItem>
            ))
        }
    </CustomizedSelect>);
}

export default ConditionSelect;