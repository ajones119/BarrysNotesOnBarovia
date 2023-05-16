import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import CampaignPicker from '../../CampaignPicker/CampaignPicker';
import ClassPicker from '../../ClassPicker/ClassPicker';
import TextArea from '../../TextArea/TextArea';
import { Button } from '../../Button/Button';
import { ButtonStatuses, LoadingButton } from '../../Button/LoadingButton';

import css from "./CreateNoteModal.module.scss"
import { useAddNoteButton } from '../../../service/NotesService';
import { Note, validateNote } from '../../../model/Note';
import CharacterPicker from '../../CharacterPicker/CharacterPicker';
import { Character } from '../../../model/Character';

declare interface CreateNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string,
    characters: Character[]
};

const CreateNoteModal = ({isOpen, onClose, campaignId, characters}: CreateNPCModalProps) => {
    const [newNote, setNewNote] = useState(new Note(null, "", campaignId, new Date(), "", false, true, false));
    const [validator, setValidator] = useState<any>();
    const saveNoteButton = useAddNoteButton(newNote, () => handleOnClose(), () => validate());

    const {
        characterDocId,
        campaignDocId,
        date,
        content,
        isPersonal,
        isCampaign,
        isDungeonMaster
    } = newNote;

    const validate = () => {
        const valid = validateNote(newNote)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    const handleOnClose = () => {
            setNewNote(new Note(null, "", campaignId, new Date(), "", false, true, false))
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    saveNoteButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateNoteModal}>
                    <Grid item sm={12}>
                        <TextArea value={content} onChange={(value) => setNewNote({ ...newNote, content: value,})} rows={5} />
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