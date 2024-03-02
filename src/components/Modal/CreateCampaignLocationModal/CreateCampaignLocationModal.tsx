import React, {useEffect, useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import css from "./CreateCampaignLocationModal.module.scss"
import { useCreateCampaignLocation, useEditLocation } from '@services/CampaignLocationService';
import { CampaignLocation } from '@model/Location';
import TextEditor from '../../TextEditor';
import { Button } from '@components/Button/Button';
import FileInput from '@components/FileInput';

declare interface CreateCampaignLocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId?: string
    parentLocationIdOverride ?: string;
    editLocation?: CampaignLocation
};

const CreateCampaignLocationModal = ({isOpen, onClose, campaignId, parentLocationIdOverride = "", editLocation}: CreateCampaignLocationModalProps) => {
    const defaultLocation = { 
        campaignDocId: campaignId,
        parentLocationId: parentLocationIdOverride,
        name: "",
        description: "",
        locationImageURL: ""
    }
    const [newCampaignLocation, setNewCampaignLocation] = useState(editLocation || defaultLocation);

    const {
        name = "",
        description = "",
    } = newCampaignLocation;

    const handleOnClose = () => {
        onClose();
        setNewCampaignLocation(editLocation ? editLocation : defaultLocation)
    }

    useEffect(() => {
        setNewCampaignLocation(editLocation || defaultLocation)
    }, [editLocation?.docId])

    const {mutate: create} = useCreateCampaignLocation(handleOnClose);
    const {mutate: edit} = useEditLocation(handleOnClose);

    const mutate = editLocation ? edit : create;


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
                        <TextInput value={name} onChange={value => setNewCampaignLocation({ ...newCampaignLocation, name: String(value),})} placeholder='Name' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <FileInput
                            value={typeof newCampaignLocation?.locationImageURL === "string" ? newCampaignLocation?.locationImageURL : newCampaignLocation?.locationImageURL?.name}
                            onChange={value => setNewCampaignLocation({ ...newCampaignLocation, locationImageURL: value || "",})}
                            title='Image URL'
                        />
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