import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import css from "./CreateCombatModal.module.scss"
import { Combat } from '@model/Combat';
import { useAddCombatButton } from '@services/CombatService';
import { TextInput } from '../../TextInput/TextInput';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { CombatCharacter } from '@model/CombatCharacter';
import { ButtonStatuses, LoadingButton } from '@components/Button/LoadingButton';

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

const {mutate, isLoading, isError, isSuccess} = useAddCombatButton(handleOnClose);


    useDeepCompareEffect(() => {
        setCombat({campaignDocId: campaignId, combatCharacterArray: characters.map((character, index) => ({...character, uniqueId: index}))})
    }, [characters])

    return (
        <div>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    <LoadingButton
                        color="success"
                        size="large"
                        isLoading={isLoading}
                        status={isError ? ButtonStatuses.Error : isSuccess ? ButtonStatuses.Success : ButtonStatuses.Idle}
                        onClick={() => {
                            if (combat?.name) {
                                mutate(combat)
                            } else {
                                setValidator({name: "required"})
                            }
                        }}
                    >Save Encounter</LoadingButton>
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