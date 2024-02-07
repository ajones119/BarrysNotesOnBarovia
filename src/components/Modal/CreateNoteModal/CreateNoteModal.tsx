import React, {useEffect, useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import css from "./CreateNoteModal.module.scss"
import { useAddNote } from '@services/NotesService';
import { Note, validateNote } from '@model/Note';
import CharacterPicker from '../../CharacterPicker/CharacterPicker';
import TextEditor from '../../TextEditor';
import { PlayerCharacter } from '@model/PlayerCharacter';
import { ButtonStatuses, LoadingButton } from '@components/Button/LoadingButton';

declare interface CreateNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string,
    characters: PlayerCharacter[]
};

const DEFAULT_NOTE = {date: new Date()}

const CreateNoteModal = ({isOpen, onClose, campaignId, characters}: CreateNPCModalProps) => {
    const date = new Date()
    const defaultNote: Note = {...DEFAULT_NOTE, campaignDocId: campaignId, date}
    const [newNote, setNewNote] = useState<Note>(defaultNote);
    const handleOnClose = () => {
        onClose();
    }

    const {mutate, isLoading, isError, isSuccess} = useAddNote(handleOnClose);

    const {
        content,
    } = newNote;

    useEffect(() => {
        setNewNote({...newNote, date: new Date(), content: ""})
    }, [isOpen])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    <LoadingButton
                    color="success"
                    size="large"
                    isLoading={isLoading}
                    status={isError ? ButtonStatuses.Error : isSuccess ? ButtonStatuses.Success : ButtonStatuses.Idle}
                    onClick={() => {
                            mutate(newNote)
                    }}
                >Save Note</LoadingButton>
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
