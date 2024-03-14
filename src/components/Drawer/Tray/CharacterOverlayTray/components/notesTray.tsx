import css from "../CharacterOverlayTray.module.scss"
import React, { useState } from "react";
import { useAddNote } from "@services/NotesService";
import { DEFAULT_NOTE } from "@components/Modal/CreateNoteModal/CreateNoteModal";
import { Note } from "@model/Note";
import TextEditor from "@components/TextEditor";
import { Button } from "@components/Button/Button";
import { Typography } from "@components/Typography/Typography";

type NotesTrayTabProps = {
    id: string,
    campaignId: string
}

const NotesTray = ({id, campaignId}: NotesTrayTabProps) => {
    const date = new Date()
    const defaultNote: Note = {...DEFAULT_NOTE, campaignDocId: campaignId, date, characterDocId: id || undefined}
    const [newNote, setNewNote] = useState<Note>(defaultNote);
    const {mutate: addNote, isLoading} = useAddNote(() => {setNewNote(defaultNote)});

    return (
        <div className={css.notesContainer}>
            <TextEditor height={125} hideToolbar value={newNote.content || ""} onChange={(value) => setNewNote({ ...newNote, content: value,})} preview="edit" />
            <Button isLoading={isLoading} color="success" onClick={() => newNote.content && addNote(newNote)}><Typography>Save</Typography></Button>
        </div>
    );
};

export default NotesTray;