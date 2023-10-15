import React, { useEffect, useState } from "react";
import Drawer, { DrawerProps } from "..";
import { BASE_ABILITY_SCORES, BaseCharacter, CharacterSizes, CharacterType, SavingThrow } from "@model/BaseCharacter";
import css from "./CreateMonsterDrawer.module.scss"
import { Grid } from "@mui/material";
import { TextInput } from "@components/TextInput/TextInput";
import SizeSelect from "@components/Selects/SizeSelect";
import CharacterTypeSelect from "@components/Selects/CharatcerTypeSelect";
import TextEditor from "@components/TextEditor";
import { Typography } from "@components/Typography/Typography";
import SavingThrowSelect from "@components/Selects/SavingThrowSelect";
import SkillsSelect from "@components/Selects/SkillsSelect";
import { Button } from "@components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useCreateCustomMonster, useEditCustomMonster } from "@services/CustomMonstersService";
import { LoadingButton } from "@components/Button/LoadingButton";

declare interface CreateMonsterDrawerProps extends DrawerProps {
    editMonster?: BaseCharacter | null;
}

const CreateOrEditMonsterDrawer = ({isOpen, onClose = () => {}, editMonster}: CreateMonsterDrawerProps) => {
    const [monster, setMonster] = useState<BaseCharacter>({docId: "", name: "", abilityScores: BASE_ABILITY_SCORES});
    const { mutate: create, isLoading: createLoading } = useCreateCustomMonster(onClose);
    const { mutate: edit, isLoading: editLoading } = useEditCustomMonster(monster, onClose);

    const isLoading = editLoading || createLoading;

    useEffect(() => {
        setMonster(editMonster || {docId: "", name: "", abilityScores: BASE_ABILITY_SCORES})
    }, [isOpen])

    return (
        <Drawer
            side="bottom"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={css.monsterDrawer}>
                <Grid container justifyContent="end" spacing={2}>
                <Grid item>
                        <LoadingButton
                            isLoading={isLoading}
                            onClick={() => {
                                editMonster ? edit(monster) : create(monster)
                            }}
                        >Submit</LoadingButton>
                    </Grid>
                    <Grid item>
                        <Button onClick={onClose}><FontAwesomeIcon icon={faXmarkCircle}/></Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} rowGap={2}>
                    <Grid item xs={12} md={6}>
                        <TextInput value={monster?.name} onChange={(value) => setMonster({ ...monster, name: String(value)})} placeholder='Name' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SizeSelect value={monster.size} onChange={(value: CharacterSizes) => setMonster({ ...monster, size: value})} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CharacterTypeSelect value={monster.type} onChange={(value: CharacterType) => setMonster({ ...monster, type: value})} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextInput value={monster?.characterImageURL} onChange={(value) => setMonster({ ...monster, characterImageURL: String(value)})} placeholder='Image URL' />
                    </Grid>
                    
                    <Grid item xs={12} md={2}>
                        <TextInput value={monster?.averageHitPoints} onChange={(value) => setMonster({ ...monster, averageHitPoints: Number(value)})} placeholder='Average Hit Points' number />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <TextInput value={monster?.speed} onChange={(value) => setMonster({ ...monster, speed: Number(value)})} placeholder='Speed' number />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <TextInput value={monster?.armorClass} onChange={(value) => setMonster({ ...monster, armorClass: Number(value)})} placeholder='Armor Class' number />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <TextInput value={monster?.passivePerception} onChange={(value) => setMonster({ ...monster, passivePerception: Number(value)})} placeholder='Passive Percep' number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={monster?.abilityScores?.strength} onChange={(value) => {
                            const scores = {...monster?.abilityScores, strength: Number(value)}
                            setMonster({...monster, abilityScores: scores})
                        }} placeholder={`Strength (${Math.floor((monster?.abilityScores?.strength - 10)/2) >= 0 ? "+" : ""}${Math.floor((monster?.abilityScores?.strength - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={monster?.abilityScores?.dexterity} onChange={(value) => {
                            const scores = {...monster?.abilityScores, dexterity: Number(value)}
                            setMonster({...monster, abilityScores: scores})
                        }} placeholder={`Dexterity (${Math.floor((monster?.abilityScores?.dexterity - 10)/2) >= 0 ? "+" : ""}${Math.floor((monster?.abilityScores?.dexterity - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={monster?.abilityScores?.constitution} onChange={(value) => {
                            const scores = {...monster?.abilityScores, constitution: Number(value)}
                            setMonster({...monster, abilityScores: scores})
                        }} placeholder={`Constitution (${Math.floor((monster?.abilityScores?.constitution - 10)/2) >= 0 ? "+" : ""}${Math.floor((monster?.abilityScores?.constitution - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={monster?.abilityScores?.intelligence} onChange={(value) => {
                            const scores = {...monster?.abilityScores, intelligence: Number(value)}
                            setMonster({...monster, abilityScores: scores})
                        }} placeholder={`Intelligence (${Math.floor((monster?.abilityScores?.intelligence - 10)/2) >= 0 ? "+" : ""}${Math.floor((monster?.abilityScores?.intelligence - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={monster?.abilityScores?.wisdom} onChange={(value) => {
                            const scores = {...monster?.abilityScores, wisdom: Number(value)}
                            setMonster({...monster, abilityScores: scores})
                        }} placeholder={`Wisdom (${Math.floor((monster?.abilityScores?.wisdom - 10)/2) >= 0 ? "+" : ""}${Math.floor((monster?.abilityScores?.wisdom - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={monster?.abilityScores?.charisma} onChange={(value) => {
                            const scores = {...monster?.abilityScores, charisma: Number(value)}
                            setMonster({...monster, abilityScores: scores})
                        }} placeholder={`Charisma (${Math.floor((monster?.abilityScores?.charisma - 10)/2) >= 0 ? "+" : ""}${Math.floor((monster?.abilityScores?.charisma - 10)/2)})`} number />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <SavingThrowSelect value={monster.savingThrowProficiencies || []} onChange={(value: SavingThrow[]) => setMonster({ ...monster, savingThrowProficiencies: value})} />
                    </Grid>

                    <Grid item xs={4} md={1}>
                        <TextInput value={monster?.proficiencyBonus} onChange={(value) => setMonster({ ...monster, proficiencyBonus: Number(value)})} placeholder='Prof. Bonus' number />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <SkillsSelect value={monster.skillProficiencies || []} onChange={(value: SavingThrow[]) => setMonster({ ...monster, skillProficiencies: value})} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Description</Typography>
                        <TextEditor height={400} preview="edit" value={monster?.description || ""} onChange={(value) => setMonster({ ...monster, description: String(value)})} placeholder='Description' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Actions</Typography>
                        <TextEditor height={400} preview="edit" value={monster?.actions || ""} onChange={(value) => setMonster({ ...monster, actions: String(value)})} placeholder='Actions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Bonus Actions</Typography>
                        <TextEditor height={400} preview="edit" value={monster?.bonusActions || ""} onChange={(value) => setMonster({ ...monster, bonusActions: String(value)})} placeholder='Bonus Actions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Reactions</Typography>
                        <TextEditor height={400} preview="edit" value={monster?.reactions || ""} onChange={(value) => setMonster({ ...monster, reactions: String(value)})} placeholder='Reactions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Legendary Actions</Typography>
                        <TextEditor height={400} preview="edit" value={monster?.legendaryActions || ""} onChange={(value) => setMonster({ ...monster, legendaryActions: String(value)})} placeholder='Legendary Actions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Lair Actions</Typography>
                        <TextEditor height={400} preview="edit" value={monster?.lairActions || ""} onChange={(value) => setMonster({ ...monster, lairActions: String(value)})} placeholder='Lair Actions' />
                    </Grid>
                </Grid>
                
            </div>
           
        </Drawer>
    )

}

export default CreateOrEditMonsterDrawer;