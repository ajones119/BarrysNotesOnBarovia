import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import TextArea from '../../TextArea/TextArea';

import css from "./CreateCampaignModal.module.scss"
import { Campaign, validateCampaign } from '@model/Campaign';
import { useAddCampaignButton } from '@services/CampaignService';
import { Validator } from '@model/Validator';
import { Button } from '@components/Button/Button';

declare interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
};

const DEFAULT_EMPTY_CAMPAIGN: Campaign = {title: ""};

const CreateCampaignModal = ({isOpen, onClose}: CreateCampaignModalProps) => {
    const [newCampaign, setNewCampaign] = useState<Campaign>(DEFAULT_EMPTY_CAMPAIGN);
    const [validator, setValidator] = useState<Validator>();
    
    const handleOnClose = () => {
        setNewCampaign(DEFAULT_EMPTY_CAMPAIGN)
        onClose();
    }

    const {mutate, isLoading} = useAddCampaignButton(
        handleOnClose
    );

    const { title, campaignImageURL, dungeonMaster, description } = newCampaign;

    const validate = () => {
        const valid = validateCampaign(newCampaign)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                <Button
                    color="success"
                    size="large"
                    isLoading={isLoading}
                    onClick={() => {
                        const valid = validate();
                        if (valid) {
                            mutate(newCampaign)
                        }
                    }}
                    >
                        Save Campaign
                    </Button>
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateCampaignModal}>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={!!validator?.name} value={title} onChange={value => setNewCampaign({ ...newCampaign, title: String(value),})} placeholder='Title' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput value={campaignImageURL} onChange={value => setNewCampaign({ ...newCampaign, campaignImageURL: String(value),})} placeholder='Campaign Image URL' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput value={dungeonMaster} onChange={value => setNewCampaign({ ...newCampaign, dungeonMaster: String(value),})} placeholder='Dungeon Master' />
                    </Grid>
                    <Grid item sm={12}>
                        <TextArea value={description || ""} onChange={(value) => setNewCampaign({ ...newCampaign, description: value,})} rows={5} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateCampaignModal;
