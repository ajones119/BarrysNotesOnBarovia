import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import TextArea from '../../TextArea/TextArea';

import css from "./CreateCampaignLocationModal.module.scss"
import { useAddCharacterButton } from '../../../service/CharacterService';
import { Campaign, validateCampaign } from '../../../model/Campaign';
import { useAddCampaignButton } from '../../../service/CampaignService';
import { useAddCampaignLocationButton } from '../../../service/CampaignLocationService';
import { CampaignLocation, validateLocation } from '../../../model/Location';

declare interface CreateCampaignLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string
    parentLocationIdOverride ?: string;
};

const CreateCampaignLocationModal = ({isOpen, onClose, campaignId, parentLocationIdOverride = ""}: CreateCampaignLocationModalProps) => {
    const [newCampaignLocation, setNewCampaignLocation] = useState(new CampaignLocation(null, campaignId, parentLocationIdOverride));
    const [validator, setValidator] = useState<any>();
    const saveCampaignLocationButton = useAddCampaignLocationButton(newCampaignLocation, () => handleOnClose(), () => validate());

    const {
        campaignDocId = "",
        name = "",
        description = "",
        npcs = [],
        parentLocationId = parentLocationIdOverride,
        childItemIds = [],
        locationImageURL = ""
    } = newCampaignLocation;

    const validate = () => {
        const valid = validateLocation(newCampaignLocation)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    const handleOnClose = () => {
            setNewCampaignLocation(new CampaignLocation(null, campaignId, parentLocationIdOverride))
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                saveCampaignLocationButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateCampaignLocationModal}>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.name} value={name} onChange={value => setNewCampaignLocation({ ...newCampaignLocation, name: value,})} placeholder='Name' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.player} value={locationImageURL} onChange={value => setNewCampaignLocation({ ...newCampaignLocation, locationImageURL: value,})} placeholder='Image URL' />
                    </Grid>
                    <Grid item sm={12}>
                        <TextArea value={description} onChange={(value) => setNewCampaignLocation({ ...newCampaignLocation, description: value,})} rows={5} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateCampaignLocationModal;