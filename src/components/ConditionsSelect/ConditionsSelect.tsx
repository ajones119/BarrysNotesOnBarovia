import { Chip, MenuItem, Select, Stack, styled } from "@mui/material";
import React from "react";
import css from "./ConditionsSelect.module.scss"
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { faBed, faBrain, faChildCombatant, faEarDeaf, faFaceFlushed, faFaceGrinHearts, faFaceTired, faFeather, faFire, faFireFlameCurved, faGem, faHandsHoldingChild, faMoon, faPersonFallingBurst, faPersonShelter, faPersonWalkingWithCane, faShoePrints, faSkullCrossbones, faUserSecret, faWheelchair, faXmark } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCircleXmark, faFaceAngry } from "@fortawesome/free-regular-svg-icons";
import useSetTheme from "@hooks/useSetTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ConditionSelectProps = {
    onChange: (value: string[] | null) => void,
    selectedValue?: string[] | null,
    width?: string,
    outlined?: boolean,
    icons?: boolean,
}

export type Condition = {
    label: string,
    value: string,
    icon: IconDefinition
}

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
        label: "Faerie Fired",
        value: "faerieFired",
        icon: faFireFlameCurved
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
        label: "Slowed",
        value: "slowed",
        icon: faShoePrints
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

const ConditionSelect = ({onChange, selectedValue, width = "200px", outlined = false, icons = false}: ConditionSelectProps) => {
    const {theme} = useSetTheme();
    return (<Select
        label="Conditions"
        multiple
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
                const condition = CONDITION_OPTIONS.find(option => option.value === value);
                const label = condition?.label || "";
                const icon = <FontAwesomeIcon icon={condition?.icon || faXmark} style={{color: theme.primary}} />
                return(
                    <Chip
                        variant="outlined"
                        style={{color: theme.primary, borderColor: theme.primary}}
                        key={value}
                        label={icons ? icon : label}
                        onDelete={() =>
                            onChange(
                                selectedValue?.filter((item) => item !== value) || []
                            )
                        }
                        deleteIcon={
                            <FontAwesomeIcon
                                icon={faXmark}
                                style={{color: theme.primary}}
                                onMouseDown={(event) => event.stopPropagation()}
                            />
                        }
                    />
                )})}
            </Stack>
        )}>
        { CONDITION_OPTIONS?.map((option) => (
            <MenuItem key={`picker-${option.label}`} value={option.value}>
                {option.label}
                {selectedValue?.includes(option.value) ? <CheckIcon color="info" /> : null}
            </MenuItem>
            ))
        }
    </Select>);
}

export default ConditionSelect;