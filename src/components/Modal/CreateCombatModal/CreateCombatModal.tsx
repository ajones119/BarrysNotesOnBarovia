import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import css from "./CreateCombatModal.module.scss"
import { Combat } from '@model/Combat';
import { useAddCombatButton } from '@services/CombatService';
import { TextInput } from '../../TextInput/TextInput';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { CombatCharacter } from '@model/CombatCharacter';
import { Button } from '@components/Button/Button';

declare interface CreateNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string,
    characters: Array<CombatCharacter>
};

const CreateCombatModal = ({isOpen, onClose, campaignId, characters = [] }: CreateNPCModalProps) => {
    const [combat, setCombat] = useState<Combat>({campaignDocId: campaignId, combatCharacterArray: characters});
    const [validator, setValidator] = useState<any>();

    const handleOnClose = () => {
        setCombat({campaignDocId: campaignId, combatCharacterArray: characters.map((character, index) => ({...character, uniqueId: index}))})
        onClose();
    }

const {mutate, isLoading} = useAddCombatButton(handleOnClose);


    useDeepCompareEffect(() => {
        setCombat({campaignDocId: campaignId, combatCharacterArray: characters.map((character, index) => ({...character, uniqueId: index}))})
    }, [characters])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    <Button
                        color="success"
                        size="large"
                        isLoading={isLoading}
                        onClick={() => {
                            if (combat?.name) {
                                mutate(combat)
                            } else {
                                setValidator({name: "required"})
                            }
                        }}
                    >Save Encounter</Button>
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateCombatModal}>
                    <Grid item sm={12}>
                        <TextInput error={validator?.name} placeholder="Name" value={combat.name} onChange={(value) => setCombat({ ...combat, name: String(value),})} />
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateCombatModal;