import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import css from "./CreateNoteModal.module.scss"
import { useAddNoteButton } from '@services/NotesService';
import { Note, validateNote } from '@model/Note';
import CharacterPicker from '../../CharacterPicker/CharacterPicker';
import { Character } from '@model/Character';
import TextEditor from '../../TextEditor';
import { Validator } from '@model/Validator';

declare interface CreateNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string,
    characters: Character[]
};

const DEFAULT_NOTE = {date: new Date()}

const CreateNoteModal = ({isOpen, onClose, campaignId, characters}: CreateNPCModalProps) => {
    const date = new Date()
    const defaultNote: Note = {...DEFAULT_NOTE, campaignDocId: campaignId, date}
    const [newNote, setNewNote] = useState<Note>(defaultNote);
    const [validator, setValidator] = useState<Validator>();
    const saveNoteButton = useAddNoteButton(newNote, () => handleOnClose(), () => validate());

    const {
        content,
    } = newNote;

    const validate = () => {
        const valid = validateNote(newNote)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    const handleOnClose = () => {
            setNewNote(defaultNote)
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    saveNoteButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateNoteModal}>
                    <Grid item sm={12}>
                        <TextEditor value={content || ""} onChange={(value) => setNewNote({ ...newNote, content: value,})} preview="edit" height={250} />
                    </Grid>
                    <Grid item sm={12}>
                        <CharacterPicker characters={characters} value={newNote.characterDocId} onChange={value => setNewNote({ ...newNote, characterDocId: value})} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateNoteModal;
