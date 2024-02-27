import React, { useState } from 'react'
import css from "./NotesList.module.scss";
import { Note } from '@model/Note';
import { Grid } from "@mui/material"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faNoteSticky, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Button/Button';
import CreateNoteModal from '../Modal/CreateNoteModal/CreateNoteModal';
import { NotesListItem } from './NoteListItem';
import { PlayerCharacter } from '@model/PlayerCharacter';
import FloatingButtonContainer from '@components/FloatingButtonContainer';
import GenerateSummaryNoteModal from '@components/Modal/GenerateSummaryNoteModal';
import { format, isSameDay, parseISO } from 'date-fns';
import { Typography } from '@components/Typography/Typography';
const getCharacterFromNote = (note: Note, characters: PlayerCharacter[]) => {
    const notedCharacter = characters.find(character => note.characterDocId === character.docId)

    return notedCharacter;
}

declare interface NotesListProps {
    characters: PlayerCharacter[],
    notes: Note[],
    campaignId: string
}

const NotesList = ({characters, notes = [], campaignId}: NotesListProps) => {
    const [isCreateModalOpen, setIsCreatemodalOpen] = useState(false);
    const [isGenerateSummaryModalOpen, setIsGenerateSummaryModalOpen] = useState(false);

    let notesByDate: any = {};

    notes?.forEach((note: Note) => {
        const dateString = format(note?.date || new Date(), "yyyy-MM-dd")

        if (notesByDate[dateString] && notesByDate[dateString]?.length > 0) {
            notesByDate[dateString].push(note)
        } else {
            notesByDate[dateString] = [note]
        }
    });

    let seedNotes = notes.filter(note => note?.date && isSameDay(note?.date, new Date()));

    console.log(seedNotes)

    if (seedNotes.length < 1 && notes.length > 1) {
        const mostRecentNote = notes?.toSorted(function (a, b) {
            if ((a?.date || 0) < (b?.date || 0)) {
              return -1;
            }
            if ((a?.date || 0) > (b?.date || 0)) {
              return 1;
            }
            return 0;
        });
        seedNotes = [];
        seedNotes.push(mostRecentNote[0])
    }

    return (
        <>
        <FloatingButtonContainer>
            <Button animatedHover size='large' color="secondary" onClick={() => setIsCreatemodalOpen(true)}><Typography size="large">Add Note{" "}<FontAwesomeIcon icon={faPlusCircle} /></Typography></Button>
            <Button animatedHover size='large' color="secondary" onClick={() => setIsGenerateSummaryModalOpen(true)}><Typography>Generate Recap{" "}<FontAwesomeIcon icon={faList} /></Typography></Button>

        </FloatingButtonContainer>
            <div className={css.notesList}>
                {
                    Object.keys(notesByDate).map(key => {
                        return (
                            <div>
                                <div>
                                    <Typography size="large">{format(parseISO(key), "MMM, dd, yyyy")}</Typography>
                                </div>
                                {
                                    notesByDate[key]?.map((note: Note) => { 
                                        const character = getCharacterFromNote(note, characters);
                                        return(
                                            <NotesListItem characterImageURL={character?.characterImageURL} characterName={character?.name} note={note} />
                                        )})
                                }
                            </div>
                        );
                    })
                }
            </div>
        <CreateNoteModal seedNotes={seedNotes} characters={characters} campaignId={campaignId} isOpen={isCreateModalOpen} onClose={() => setIsCreatemodalOpen(false)} />
        <GenerateSummaryNoteModal characters={characters} campaignId={campaignId} isOpen={isGenerateSummaryModalOpen} notes={notes.filter(note => !note?.isGeneratedSummary)} onClose={() => setIsGenerateSummaryModalOpen(false)} />

        </>
    );
}

export default NotesList;