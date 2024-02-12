import React, { useState } from 'react';
import css from "../SingleCampaign.module.scss"
import { useParams } from 'react-router-dom';
import { Grid, ToggleButton, ToggleButtonGroup } from "@mui/material"
import NotesList from '@components/NotesList/NotesList';
import { Typography } from '@components/Typography/Typography';
import { useCampaignCharacters } from '@services/CharacterService';
import { useCampaignNotes } from '@services/NotesService';

const CampaignNotes = () => {
    const params = useParams();
    const { CampaignId } = params;
    const {characters} = useCampaignCharacters(CampaignId || "");
    const {notes: NotesData} = useCampaignNotes(CampaignId || "");
    let notes = NotesData;

    const [dateFilter, setDateFilter] = useState("new")

    notes?.sort(function (a, b) {
        if ((a?.date || 0) < (b?.date || 0)) {
          return -1;
        }
        if ((a?.date || 0) > (b?.date || 0)) {
          return 1;
        }
        return 0;
    });

    if (dateFilter === "new") {
        notes = notes.reverse();
    }

    return (
        <div className={css.CampaignNotes} style={{width: "100%"}}>
            <Grid container justifyContent="space-evenly">
                <Grid item>
                    <ToggleButtonGroup
                        exclusive
                        value={dateFilter}
                        onChange={(_event, value) => setDateFilter(value)}
                        color="info"
                    >
                        <ToggleButton value="old"><Typography color="light">Old to New</Typography></ToggleButton>
                        <ToggleButton value="new"><Typography>New to Old</Typography></ToggleButton>
                    </ToggleButtonGroup>
                </Grid>
            </Grid>
            <NotesList characters={characters} notes={notes} campaignId={CampaignId as string}/>
        </div>
    );
}

export default CampaignNotes;