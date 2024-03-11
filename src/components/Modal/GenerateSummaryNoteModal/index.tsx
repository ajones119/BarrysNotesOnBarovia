import React, {useEffect, useState} from 'react';
import { Modal } from '../Modal';
import { Grid, Typography } from '@mui/material';
import css from "./GenerateSummaryNotesModal.module.scss"
import { useAddNote, useGenerateSummaryNote } from '@services/NotesService';
import { Note } from '@model/Note';
import TextEditor from '../../TextEditor';
import { PlayerCharacter } from '@model/PlayerCharacter';
import { Button } from '@components/Button/Button';
import DatePicker from "react-datepicker";
import Spinner from '@components/Spinner';
import { useCampaign } from '@services/CampaignService';
import { isSameDay } from 'date-fns';


declare interface GenerateSummaryNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string,
    characters: PlayerCharacter[]
    notes: Note[],
};

const DEFAULT_NOTE = {date: new Date(), isGeneratedNoteSummary: true}

const GenerateSummaryNoteModal = ({isOpen, onClose, campaignId, characters, notes}: GenerateSummaryNoteModalProps) => {
    const date = new Date()
    const defaultNote: Note = {...DEFAULT_NOTE, campaignDocId: campaignId, date}
    const {data: campaign} = useCampaign(campaignId);
    const [newNote, setNewNote] = useState<Note>(defaultNote);
    const {mutate: generate, isLoading: isGenerating} = useGenerateSummaryNote((note: string) => setNewNote({ ...newNote, content: note}));

    const handleOnClose = () => {
        onClose();
    }

    const {mutate, isLoading} = useAddNote(handleOnClose);

    const {
        content,
    } = newNote;

    useEffect(() => {
        setNewNote({...newNote, date: new Date(), content: ""})
        if (isOpen) {
            //generate(notes)
        }

    }, [isOpen])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    <Button
                        color="success"
                        size="large"
                        isLoading={isLoading}
                        onClick={() => {
                                mutate(newNote)
                        }}
                >Save Note</Button>
                ]}>
                <div className={css.GenerateSummaryNoteModal}>
                <div className={css.editor}> {
                    isGenerating ? <Spinner />:
                    <TextEditor value={content || ""} onChange={(value) => setNewNote({ ...newNote, content: value,})} preview="edit" height={250} />
                }

                </div>    
                <Button onClick={() => {
                    const lastDate = notes[0]?.date || new Date();
                    const sendNotes = notes.filter(note => isSameDay(note?.date || new Date(), lastDate));
                    // do more research here
                    generate({notes: sendNotes, campaign})}
                }><Typography>Generate</Typography></Button>
                </div>
            </Modal>
        </div>
    );
}

export default GenerateSummaryNoteModal;
