import React, { useState } from 'react';
import css from "../SingleCampaign.module.scss"
import { useParams } from 'react-router-dom';
import { Note } from '../../../../model/Note';
import { Character } from '../../../../model/Character';
import { List, ListItem, ListItemText, Grid, ListItemAvatar, Avatar, ListItemIcon, ToggleButton, ToggleButtonGroup } from "@mui/material"
import BACKUP from "../../../../images/dm-seal.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import NotesList from '../../../../components/NotesList/NotesList';
import { Typography } from '../../../../components/Typography/Typography';



declare interface CampaignNotesProps {
    notes: Note[]
    characters: Character[]
}

const CampaignNotes = ({ notes, characters }: CampaignNotesProps) => {
    const params = useParams();
    const { CampaignId } = params;
    const [dateFilter, setDateFilter] = useState("new")

    notes?.sort(function (a, b) {
        if (a.date < b.date) {
          return -1;
        }
        if (a.date > b.date) {
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