import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import TextArea from '../../TextArea/TextArea';

import css from "./CreateCampaignModal.module.scss"
import { useAddCharacterButton } from '../../../service/CharacterService';
import { Campaign, validateCampaign } from '../../../model/Campaign';
import { useAddCampaignButton } from '../../../service/CampaignService';

declare interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
};

const CreateCampaignModal = ({isOpen, onClose}: CreateCampaignModalProps) => {
    const [newCampaign, setNewCampaign] = useState(new Campaign(null, ""));
    const [validator, setValidator] = useState<any>();
    const [campaign, setCampaign] = useState();
    const saveCampaignButton = useAddCampaignButton(newCampaign, () => handleOnClose(), () => validate());

    const { title, campaignImageURL, dungeonMaster, description } = newCampaign;

    const validate = () => {
        const valid = validateCampaign(newCampaign)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    const handleOnClose = () => {
            setNewCampaign(new Campaign(null, ""))
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                saveCampaignButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateCampaignModal}>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.name} value={title} onChange={value => setNewCampaign({ ...newCampaign, title: value,})} placeholder='Title' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.player} value={campaignImageURL} onChange={value => setNewCampaign({ ...newCampaign, campaignImageURL: value,})} placeholder='Campaign Image URL' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.dungeonMaster} value={dungeonMaster} onChange={value => setNewCampaign({ ...newCampaign, dungeonMaster: value,})} placeholder='Dungeon Master' />
                    </Grid>
                    <Grid item sm={12}>
                        <TextArea value={description} onChange={(value) => setNewCampaign({ ...newCampaign, description: value,})} rows={5} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateCampaignModal;