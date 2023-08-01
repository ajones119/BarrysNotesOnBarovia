import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid } from '@mui/material';
import { TextInput } from '../../TextInput/TextInput';
import TextArea from '../../TextArea/TextArea';
import css from "./CreateNPCModal.module.scss"
import { validateCharacter } from '../../../model/Character';
import { NPC } from '../../../model/NPC';
import { useAddNPCButton, useUpdateNPCButton } from '../../../service/NPCService';
import isEqual from 'react-fast-compare';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Button } from '../../Button/Button';
import SkillsInput from '../../SkillsInput';
import ActionsInput from '../../ActionsInput';

declare interface CreateNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignId: string
    npc?: NPC
};

const CreateNPCModal = ({isOpen, onClose, campaignId, npc = new NPC(null, {})}: CreateNPCModalProps) => {
    const [newNPC, setNewNPC] = useState(npc);
    const [expandedOpen, setExpandedOpen] = useState(false);
    const [validator, setValidator] = useState<any>();
    const saveCharacterButton = useAddNPCButton(newNPC, () => handleOnClose(), () => validate(), campaignId);
    const editButton = useUpdateNPCButton(
        newNPC,
        () => handleOnClose(), () => validate()
    );
    const { name, characterImageURL, backstory, abilityScores, skills, actions, bonusActions, otherActions, passivePerception, armorClass, health } = newNPC;

    const validate = () => {
        const valid = validateCharacter(newNPC)
        setValidator(valid)

        return !(Object.keys(valid).length > 0);
    }

    useDeepCompareEffect(() => {
        setNewNPC(npc)
    }, [npc, isOpen])

    const handleOnClose = () => {
        onClose();
    }

    return (
        <div key={`charModal-${npc?.docId || "new"}`}>
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[
                    newNPC.campaignDocId ? editButton : saveCharacterButton
                ]}>
                <Grid container spacing={2} rowSpacing={3} className={css.CreateNPCModal}>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.name} value={name} onChange={value => setNewNPC({ ...newNPC, name: value,})} placeholder='Name' />
                    </Grid>
                    <Grid item lg={6} sm={12}>
                        <TextInput error={validator?.characterImageURL} value={characterImageURL} onChange={value => setNewNPC({ ...newNPC, characterImageURL: value,})} placeholder='Character Image Url' />
                    </Grid>
                    <Grid item sm={12}>
                        <TextArea value={backstory} onChange={(value) => setNewNPC({ ...newNPC, backstory: value,})} rows={5} />
                    </Grid>
                    <Grid item sm={12}>
                        <Button onClick={() => setExpandedOpen(!expandedOpen)}>Expand</Button>
                    </Grid>
                    {expandedOpen && 
                        <>
                            <Grid item sm={2}>
                                <TextInput number value={abilityScores.strength} onChange={(value) => setNewNPC({...newNPC, abilityScores: {...abilityScores, strength: Number(value || 0)}})} placeholder='STR' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={abilityScores.dexterity} onChange={(value) => setNewNPC({...newNPC, abilityScores: {...abilityScores, dexterity: Number(value || 0)}})} placeholder='DEX' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={abilityScores.constitution} onChange={(value) => setNewNPC({...newNPC, abilityScores: {...abilityScores, constitution: Number(value || 0)}})} placeholder='CON' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={abilityScores.intelligence} onChange={(value) => setNewNPC({...newNPC, abilityScores: {...abilityScores, intelligence: Number(value || 0)}})} placeholder='INT' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={abilityScores.wisdom} onChange={(value) => setNewNPC({...newNPC, abilityScores: {...abilityScores, wisdom: Number(value || 0)}})} placeholder='WIS' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={abilityScores.charisma} onChange={(value) => setNewNPC({...newNPC, abilityScores: {...abilityScores, charisma: Number(value || 0)}})} placeholder='CHA' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={armorClass} onChange={(armorClass) => setNewNPC({...newNPC, armorClass})} placeholder='AC' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={passivePerception} onChange={(passivePerception) => setNewNPC({...newNPC, passivePerception})} placeholder='Passive Percep' />
                            </Grid>
                            <Grid item sm={2}>
                                <TextInput number value={health} onChange={(health) => setNewNPC({...newNPC, health})} placeholder='Health' />
                            </Grid>
                            <Grid item sm={6}>
                                <SkillsInput value={skills} onChange={skills => setNewNPC({...newNPC, skills})} />
                            </Grid>
                            <Grid item sm={6}>
                                <ActionsInput title="Action" value={actions} onChange={actions => setNewNPC({...newNPC, actions})} />
                            </Grid>
                            <Grid item sm={6}>
                                <ActionsInput title="Bonus Action" value={bonusActions} onChange={bonusActions => setNewNPC({...newNPC, bonusActions})} />
                            </Grid>
                            <Grid item sm={6}>
                                <ActionsInput title="Other Action" value={otherActions} onChange={otherActions => setNewNPC({...newNPC, otherActions})} />
                            </Grid>
                        </>
                    }
                </Grid>
            </Modal>
        </div>
    );
}

export default CreateNPCModal;