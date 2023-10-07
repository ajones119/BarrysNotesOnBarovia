import React, {useState} from 'react';
import { Modal } from '../Modal';
import { Grid, List, ListItem } from '@mui/material';
import css from "./ShowNPCModal.module.scss"
import { validateCharacter } from '../../../model/Character';
import { NPC } from '../../../model/NPC';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { Typography } from '../../Typography/Typography';
import { CharacterAction, SkillProficiency } from '../../../model/BaseCharacter';

declare interface ShowNPCModalProps {
    isOpen: boolean;
    onClose: () => void;
    npc?: NPC
};

const ShowNPCModal = ({isOpen, onClose, npc = new NPC(null, {})}: ShowNPCModalProps) => {
    const [newNPC, setNewNPC] = useState(npc);
    const [, setValidator] = useState<any>();
    const { name, abilityScores, skills, actions, bonusActions, otherActions, passivePerception, armorClass, health, savingThrows, speed } = newNPC;

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
            <Modal isOpen={isOpen} onClose={handleOnClose} extraButtons={[]}>
                <Grid container spacing={2} rowSpacing={3} className={css.ShowNPCModal} alignItems="center">
                    <Grid item xs={12}>
                        <Typography>{name}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>STR: {abilityScores.strength}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>DEX: {abilityScores.dexterity}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>CON: {abilityScores.constitution}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>INT: {abilityScores.intelligence}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>WIS: {abilityScores.wisdom}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>CHA: {abilityScores.charisma}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>Passive Percep: {passivePerception}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>Armor Class: {armorClass}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>Health: {health}</Typography>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Typography>Speed: {speed}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography weight="bold" size="xtraLarge" className={css.sectionHeader}>Skills</Typography>
                        <List>
                            { skills.map((skill: SkillProficiency) => (<ListItem><Typography>{skill.name}: +{skill.bonus}</Typography></ListItem>)) }
                        </List>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography weight="bold" size="xtraLarge" className={css.sectionHeader}>Saving Throws</Typography>
                        <List>
                            { savingThrows.map((savingThrow: SkillProficiency) => (<ListItem><Typography>{savingThrow.name}: +{savingThrow.bonus}</Typography></ListItem>)) }
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography weight="bold" size="xtraLarge" className={css.sectionHeader}>Actions</Typography>
                        <List>
                            { actions.map((action: CharacterAction) => (<ListItem divider><Typography>{action.name}</Typography><Typography>-{action.description}</Typography></ListItem>)) }
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography weight="bold" size="xtraLarge" className={css.sectionHeader}>Bonus Actions</Typography>
                        <List>
                            { bonusActions.map((action: CharacterAction) => (<ListItem><Typography>{action.name}</Typography><Typography>-{action.description}</Typography></ListItem>)) }
                        </List>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography weight="bold" size="xtraLarge" className={css.sectionHeader}>OtherActions</Typography>
                        <List>
                            { otherActions.map((action: CharacterAction) => (<ListItem><Typography>{action.name}</Typography><Typography>-{action.description}</Typography></ListItem>)) }
                        </List>
                    </Grid>
                </Grid>
            </Modal>
        </div>
    );
}

export default ShowNPCModal;