import React from 'react';
import css from "../SingleCharacter.module.scss"
import { Campaign } from '../../../../model/Campaign';
import { Grid } from "@mui/material";
import { Typography } from '../../../../components/Typography/Typography';
import BACKUP from "../../../../images/stick1.png";
import { Character } from '../../../../model/Character';

declare interface OverviewProps {
    character: Character;
};

const Overview = ({ character }: OverviewProps) => {
    return (
        <div className={css.overview}>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <Typography>{character.name} - {character.className}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={css.overviewImage}>
                        <img
                            src={character.characterImageURL}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            height={800}
                            alt="boo"
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{character.backstory}</Typography>
                </Grid>

            </Grid>
        </div>
    );
}

export default Overview;