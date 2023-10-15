import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import CampaignPicker from '../../CampaignPicker/CampaignPicker';
import ClassPicker from '../../ClassPicker/ClassPicker';
import TextArea from '../../TextArea/TextArea';

import css from "./CreateCustomMonsterModal.module.scss"
import { Character, validateCharacter } from '@model/Character';
import { useAddCharacterButton, useUpdateCharacterButton } from '@services/CharacterService';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { BaseCharacter } from '@model/BaseCharacter';

declare interface CreateCustomMonsterModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialCampaignId?: string,
    monster?: BaseCharacter
    
};

const CreateCustomMonsterModal = ({isOpen, onClose, initialCampaignId, monster}: CreateCustomMonsterModalProps) => {
    const [localMonster, setLocalMonster] = useState<BaseCharacter | undefined>(monster)
    const [validator, setValidator] = useState<any>();
    const [campaign, setCampaign] = useState();

    const handleOnClose = () => {
            onClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose}>
                aaa
            </Modal>
        </div>
    );
}

export default CreateCustomMonsterModal;
