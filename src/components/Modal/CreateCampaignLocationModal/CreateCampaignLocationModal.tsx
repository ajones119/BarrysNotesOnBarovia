import React, {useEffect, useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import css from "./CreateCampaignLocationModal.module.scss"
import { SetCampaignLocation, useCreateCampaignLocation } from '@services/CampaignLocationService';
import { CampaignLocation } from '@model/Location';
import TextEditor from '../../TextEditor';
import { Button } from '@components/Button/Button';

declare interface CreateCampaignLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId?: string
    parentLocationIdOverride ?: string;
    editLocation?: CampaignLocation
};

const CreateCampaignLocationModal = ({isOpen, onClose, campaignId, parentLocationIdOverride = "", editLocation}: CreateCampaignLocationModalProps) => {
    const [newCampaignLocation, setNewCampaignLocation] = useState(editLocation || { campaignDocId: campaignId, parentLocationId: parentLocationIdOverride });
    const [validator, setValidator] = useState<any>();

    const {
        name = "",
        description = "",
        locationImageURL = ""
    } = newCampaignLocation;

    const handleOnClose = () => {
        onClose();
        setNewCampaignLocation(editLocation ? editLocation : { campaignDocId: campaignId, parentLocationId: parentLocationIdOverride })
    }

    useEffect(() => {
        setNewCampaignLocation(editLocation || { campaignDocId: campaignId, parentLocationId: parentLocationIdOverride })
    }, [editLocation?.docId])

    const mutate = editLocation ? SetCampaignLocation(newCampaignLocation, handleOnClose) : useCreateCampaignLocation(handleOnClose)


    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                <Button size="large" isLoading={false} color="success" onClick={() => mutate(newCampaignLocation)}>Save Location</Button>
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateCampaignLocationModal}>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.name} value={name} onChange={value => setNewCampaignLocation({ ...newCampaignLocation, name: String(value),})} placeholder='Name' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.player} value={locationImageURL} onChange={value => setNewCampaignLocation({ ...newCampaignLocation, locationImageURL: String(value),})} placeholder='Image URL' />
                    </Grid>
                    <Grid item sm={12}>
                        <TextEditor value={description} onChange={(value) => setNewCampaignLocation({ ...newCampaignLocation, description: value,})} preview="edit" height={250} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateCampaignLocationModal;