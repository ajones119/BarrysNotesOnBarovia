import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import CampaignPicker from '../../CampaignPicker/CampaignPicker';
import ClassPicker from '../../ClassPicker/ClassPicker';
import TextArea from '../../TextArea/TextArea';

import css from "./CreateCharacterModal.module.scss"
import { Character, validateCharacter } from '../../../model/Character';
import { useAddCharacterButton, useUpdateCharacterButton } from '../../../service/CharacterService';
import useDeepCompareEffect from 'use-deep-compare-effect';

declare interface CreateCharacterModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCampaignId?: string,
    character?: Character
    
};

const CreateCharacterModal = ({isOpen, onClose, initialCampaignId, character = new Character(null, "", initialCampaignId)}: CreateCharacterModalProps) => {
    const [newCharacter, setNewCharacter] = useState<Character>(character);
    const [validator, setValidator] = useState<any>();
    const [campaign, setCampaign] = useState();
    const saveCharacterButton = useAddCharacterButton(newCharacter, () => handleOnClose(), () => validate());
    const updateCharacterButton = useUpdateCharacterButton(newCharacter, () => handleOnClose(), () => validate());
    const { name, player, characterImageURL, backstory, className, dndBeyondURL, passivePerception, initiativeBonus, armorClass, maxHealth } = newCharacter;

    const validate = () => {
        const valid = validateCharacter(newCharacter)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    useDeepCompareEffect(() => {
        setNewCharacter(character)
    }, [character, isOpen])

    const handleOnClose = () => {
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                character.docId ? updateCharacterButton : saveCharacterButton
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
                    <Grid item lg={4} sm={12}>
                        <CampaignPicker initialCampaignId={initialCampaignId} value={campaign} onChange={(campaign) => { setNewCharacter({ ...newCharacter, campaignDocId: campaign.docId}); setCampaign(campaign)}} />
                    </Grid>
                    <Grid item lg={4} sm={12}>
                        <ClassPicker value={className} onChange={(value) => setNewCharacter({ ...newCharacter, className: value,})} />
                    </Grid>
                    <Grid item lg={1} sm={6}>
                        <TextInput number value={initiativeBonus} onChange={(value) => setNewCharacter({...newCharacter, initiativeBonus: Number(value)})} placeholder='Initiative Bonus' />
                    </Grid>
                    <Grid item lg={1} sm={6}>
                        <TextInput number value={passivePerception} onChange={(value) => setNewCharacter({...newCharacter, passivePerception: Number(value || 0)})} placeholder='Passive Percep.' />
                    </Grid>
                    <Grid item lg={1} sm={6}>
                        <TextInput number value={armorClass} onChange={(value) => setNewCharacter({...newCharacter, armorClass: Number(value || 0)})} placeholder='AC' />
                    </Grid>
                    <Grid item lg={1} sm={6}>
                        <TextInput number value={maxHealth} onChange={(value) => setNewCharacter({...newCharacter, maxHealth: Number(value || 0)})} placeholder='Max Health' />
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