import React, { useState } from 'react'
import { Character } from '../../model/Character';
import css from "./NotesList.module.scss";
import { Note } from '../../model/Note';
import { List, ListItem, ListItemText, Grid, ListItemAvatar, Avatar, ListItemIcon, Divider } from "@mui/material"
import BACKUP from "../../images/dm-seal.jpg"
import { useDeleteNoteButton } from '../../service/NotesService';

declare interface NotesListItemProps{
    note: Note
    characterImageURL?: string
    characterName ?: string
}

export const NotesListItem = ({ note, characterImageURL, characterName }: NotesListItemProps) => {
    const deletionButton = useDeleteNoteButton(note)

    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar
                        src={characterImageURL || BACKUP}
                        alt="boo"
                        sx={{width: 48, height: 48}}
                    />
                </ListItemAvatar>
                <ListItemText primary={note.content} secondary={`${characterName || "An Unknown Entity"} - ${note.date.toDate()}`} />
                <ListItemIcon>
                    <div style={{paddingLeft: "16px"}}>
                        {deletionButton}
                    </div>
                </ListItemIcon>
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}