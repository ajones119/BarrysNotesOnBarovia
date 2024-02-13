import React, { useState } from 'react'
import css from "./NotesList.module.scss";
import { Note } from '@model/Note';
import { Grid } from "@mui/material"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button/Button';
import CreateNoteModal from '../Modal/CreateNoteModal/CreateNoteModal';
import { NotesListItem } from './NoteListItem';
import { PlayerCharacter } from '@model/PlayerCharacter';
import FloatingButtonContainer from '@components/FloatingButtonContainer';
const getCharacterFromNote = (note: Note, characters: PlayerCharacter[]) => {
    const notedCharacter = characters.find(character => note.characterDocId === character.docId)

    return notedCharacter;
}

declare interface NotesListProps {
    characters: PlayerCharacter[],
    notes: Note[],
    campaignId: string
}

const NotesList = ({characters, notes, campaignId}: NotesListProps) => {
    const [isCreateModalOpen, setIsCreatemodalOpen] = useState(false);

    return (
        <>
        <FloatingButtonContainer>
            <Button animatedHover size='large' color="secondary" onClick={() => setIsCreatemodalOpen(true)}>Add Note{" "}<FontAwesomeIcon icon={faPlusCircle} /></Button>
        </FloatingButtonContainer>
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