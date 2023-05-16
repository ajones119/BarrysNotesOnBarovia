import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import CampaignPicker from '../../CampaignPicker/CampaignPicker';
import ClassPicker from '../../ClassPicker/ClassPicker';
import TextArea from '../../TextArea/TextArea';
import { Button } from '../../Button/Button';
import { ButtonStatuses, LoadingButton } from '../../Button/LoadingButton';

import css from "./CreateCharacterModal.module.scss"
import { Character, validateCharacter } from '../../../model/Character';
import { useAddCharacterButton } from '../../../service/CharacterService';

declare interface CreateCharacterModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCampaignId?: string
};

const CreateCharacterModal = ({isOpen, onClose, initialCampaignId}: CreateCharacterModalProps) => {
    const [newCharacter, setNewCharacter] = useState(new Character(null, "", initialCampaignId));
    const [validator, setValidator] = useState<any>();
    const [campaign, setCampaign] = useState();
    const saveCharacterButton = useAddCharacterButton(newCharacter, () => handleOnClose(), () => validate());

    const { name, player, characterImageURL, backstory, className, dndBeyondURL } = newCharacter;

    const validate = () => {
        const valid = validateCharacter(newCharacter)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    const handleOnClose = () => {
            setNewCharacter(new Character(null, ""))
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                saveCharacterButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateCharacterModal}>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.name} value={name} onChange={value => setNewCharacter({ ...newCharacter, name: value,})} placeholder='Name' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.player} value={player} onChange={value => setNewCharacter({ ...newCharacter, player: value,})} placeholder='Player' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.characterImageURL} value={characterImageURL} onChange={value => setNewCharacter({ ...newCharacter, characterImageURL: value,})} placeholder='Character Image Url' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.dndBeyondURL} value={dndBeyondURL} onChange={value => setNewCharacter({ ...newCharacter, dndBeyondURL: value,})} placeholder='DnD Beyond Url' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <CampaignPicker initialCampaignId={initialCampaignId} value={campaign} onChange={(campaign) => { setNewCharacter({ ...newCharacter, campaignDocId: campaign.docId}); setCampaign(campaign)}} />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <ClassPicker value={className} onChange={(value) => setNewCharacter({ ...newCharacter, className: value,})} />
                    </Grid>
                    <Grid item sm={12}>
                        <TextArea value={backstory} onChange={(value) => setNewCharacter({ ...newCharacter, backstory: value,})} rows={5} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateCharacterModal;