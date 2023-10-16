import React from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./SkillsSelect.module.scss"
import { Typography } from '@components/Typography/Typography';

declare interface SkillsSelectProps {
    onChange: (value: any) => void,
    value?: string[] | null,
}

const SKILLS = [
    "Acrobatics", "Animal Handling", "Arcana", "Deception", "History", "Insight",
    "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance",
    "Religion", "Sleight of Hand", "Stealth", "Survival"
]

const SkillsSelect = ({ onChange, value }: SkillsSelectProps) => {

    return (
        <div className={css.skillsSelect}>
            <Typography className={css.header} size="caption">Skill Proficiencies</Typography>
            <Select
                multiple
                value={value}
                onChange={(event) => {
                    const skill = event.target.value;
                    onChange(skill)
                }}
                style={{width: "100%"}}
                className={css.select}
                label='Saving Throw'
                defaultValue={"None"}
                variant="standard"
            >
                { SKILLS?.map((skill) => (
                    <MenuItem key={`picker-${skill}`} value={skill}>{skill}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default SkillsSelect;