import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import TextArea from '../../TextArea/TextArea';
import css from "./CreateNPCModal.module.scss"
import { validateCharacter } from '../../../model/Character';
import { NPC } from '../../../model/NPC';
import { useAddNPCButton } from '../../../service/NPCService';

declare interface CreateNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string
};

const CreateNPCModal = ({isOpen, onClose, campaignId}: CreateNPCModalProps) => {
    const [newNPC, setNewNPC] = useState(new NPC(null, ""));
    const [validator, setValidator] = useState<any>();
    const saveCharacterButton = useAddNPCButton(newNPC, () => handleOnClose(), () => validate(), campaignId);

    const { name, characterImageURL, backstory } = newNPC;

    const validate = () => {
        const valid = validateCharacter(newNPC)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    const handleOnClose = () => {
            setNewNPC(new NPC(null, ""))
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    saveCharacterButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateNPCModal}>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.name} value={name} onChange={value => setNewNPC({ ...newNPC, name: value,})} placeholder='Name' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.characterImageURL} value={characterImageURL} onChange={value => setNewNPC({ ...newNPC, characterImageURL: value,})} placeholder='Character Image Url' />
                    </Grid>
                    <Grid item sm={12}>
                        <TextArea value={backstory} onChange={(value) => setNewNPC({ ...newNPC, backstory: value,})} rows={5} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateNPCModal;