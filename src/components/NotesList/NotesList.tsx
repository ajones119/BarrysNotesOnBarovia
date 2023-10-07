import React, { useState } from 'react'
import { Character } from '../../model/Character';
import css from "./NotesList.module.scss";
import { Note } from '../../model/Note';
import { Grid } from "@mui/material"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button/Button';
import CreateNoteModal from '../Modal/CreateNoteModal/CreateNoteModal';
import { NotesListItem } from './NoteListItem';
const getCharacterFromNote = (note: Note, characters: Character[]) => {
    const notedCharacter = characters.find(character => note.characterDocId === character.docId)

    return notedCharacter;
}

declare interface NotesListProps {
    characters: Character[],
    notes: Note[],
    campaignId: string
}

const NotesList = ({characters, notes, campaignId}: NotesListProps) => {
    const [isCreateModalOpen, setIsCreatemodalOpen] = useState(false);

    return (
        <>
        <div className={css.addNoteButton}>
            <Button size='large' color="secondary" onClick={() => setIsCreatemodalOpen(true)}>Add Note{" "}<FontAwesomeIcon icon={faPlusCircle} /></Button>
        </div>
        <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12}>
            
            <div className={css.notesList}>
                {
                    notes?.map((note: Note) => { 

                        const character = getCharacterFromNote(note, characters);
                        
                        return(
                        <NotesListItem characterImageURL={character?.characterImageURL} characterName={character?.name} note={note} />
                    )})
                }
            </div>
            </Grid>
        </Grid>
        <CreateNoteModal characters={characters} campaignId={campaignId} isOpen={isCreateModalOpen} onClose={() => setIsCreatemodalOpen(false)} />
        </>
    );
}

export default NotesList;