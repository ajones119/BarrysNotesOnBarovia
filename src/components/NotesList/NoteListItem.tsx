import React from 'react'
import css from "./NotesList.module.scss";
import { Note } from '@model/Note';
import { Avatar } from "@mui/material"
import BACKUP from "@images/dm-seal.jpg"
import { useDeleteNote } from '@services/NotesService';
import { Typography } from '../Typography/Typography';
import Markdown from 'react-markdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonStatuses, LoadingButton } from '@components/Button/LoadingButton';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


declare interface NotesListItemProps{
    note: Note
    characterImageURL?: string
    characterName?: string
}

export const NotesListItem = ({ note, characterImageURL, characterName }: NotesListItemProps) => {
    const {mutate, isLoading} = useDeleteNote(note?.docId || "")

    return (
        <div className={css.note}>
            <div className={css.noteColumnContainer}>
                <div className={css.avatar}>
                <Avatar
                    src={characterImageURL || BACKUP}
                    alt="boo"
                    sx={{width: 48, height: 48}}
                />
                </div>
            </div>
            <div className={css.noteTextContainer}>
                <Typography color="light" ><Markdown>{note.content}</Markdown></Typography>
                <div>
                    <Typography color="light" size="caption" >{characterName || "An Unknown Entity"} - {`${note?.date}`}</Typography>
                </div>
            </div>
            <div className={css.noteColumnContainer}>
                <LoadingButton color="error" size="large" isLoading={isLoading} status={ButtonStatuses.Idle} onClick={mutate}><FontAwesomeIcon icon={faTrash} /></LoadingButton>
            </div>
        </div>
    )
}
