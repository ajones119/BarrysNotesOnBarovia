import React, { useState } from 'react';
import css from "../SingleCharacter.module.scss"
import { Grid } from "@mui/material";
import { Typography } from '@components/Typography/Typography';
import BACKUP from "@images/stick1.png";
import { Character } from '@model/Character';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenFancy } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components/Button/Button';
import CreateCharacterModal from '@components/Modal/CreateCharacterModal/CreateCharacterModal';

declare interface OverviewProps {
    character: Character;
};

const Overview = ({ character }: OverviewProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    return (
        <div>
            <div className={css.overview}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <Typography>
                            <Button color="secondary" onClick={() => setIsEditModalOpen(!isEditModalOpen)}><FontAwesomeIcon icon={faPenFancy} /></Button>
                            {" "}{character.name} - {character.className}
                        </Typography>
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
            <CreateCharacterModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} character={character} initialCampaignId={character.campaignDocId} />
        </div>
    );
}

export default Overview;