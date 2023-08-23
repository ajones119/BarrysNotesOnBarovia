import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import TextArea from '../../TextArea/TextArea';
import css from "./CreateCombatModal.module.scss"
import { useAddNoteButton } from '../../../service/NotesService';
import { Note, validateNote } from '../../../model/Note';
import CharacterPicker from '../../CharacterPicker/CharacterPicker';
import { Character } from '../../../model/Character';
import { Combat, validateCombat } from '../../../model/Combat';
import { useAddCombatButton } from '../../../service/CombatService';
import { TextInput } from '../../TextInput/TextInput';

declare interface CreateNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string,
    characters: Array<any>
};

const CreateCombatModal = ({isOpen, onClose, campaignId, characters }: CreateNPCModalProps) => {
    const [combat, setCombat] = useState(new Combat(null, campaignId, characters));
    const [validator, setValidator] = useState<any>();
    const saveCombatButton = useAddCombatButton(combat, () => handleOnClose(), () => validate());

    const validate = () => {
        const valid = validateCombat(Combat)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    const handleOnClose = () => {
            setCombat(new Combat(null, campaignId, characters))
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    saveCombatButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateCombatModal}>
                    <Grid item sm={12}>
                        <TextInput error={validator?.name} placeholder="Name" value={combat.name} onChange={(value) => setCombat({ ...combat, name: value,})} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateCombatModal;