import React, { useEffect, useState } from "react";
import Drawer, { DrawerProps } from "..";
import { BASE_ABILITY_SCORES, BaseCharacter, CharacterSizes, CharacterType, SavingThrow } from "@model/BaseCharacter";
import css from "./CreateOrEditBaseCharacterDrawer.module.scss"
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
import { LoadingButton } from "@components/Button/LoadingButton";

declare interface CreateOrEditBaseCharacterProps extends DrawerProps {
    editCharacter?: BaseCharacter | null;
    edit: (character: BaseCharacter) => void;
    create: (character: BaseCharacter) => void;
    isLoading?: boolean
}

const CreateOrEditBaseCharacterDrawer = ({isOpen, onClose = () => {}, editCharacter, edit, create, isLoading = false}: CreateOrEditBaseCharacterProps) => {
    const [character, setCharacter] = useState<BaseCharacter>({docId: "", name: "", abilityScores: BASE_ABILITY_SCORES});

    useEffect(() => {
        setCharacter(editCharacter || {docId: "", name: "", abilityScores: BASE_ABILITY_SCORES})
    }, [isOpen])

    return (
        <Drawer
            side="bottom"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={css.characterDrawer}>
                <Grid container justifyContent="end" spacing={2}>
                <Grid item>
                        <LoadingButton
                            isLoading={isLoading}
                            onClick={() => {
                                editCharacter ? edit(character) : create(character)
                            }}
                        >Submit</LoadingButton>
                    </Grid>
                    <Grid item>
                        <Button onClick={onClose}><FontAwesomeIcon icon={faXmarkCircle}/></Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} rowGap={2}>
                    <Grid item xs={12} md={6}>
                        <TextInput value={character?.name} onChange={(value) => setCharacter({ ...character, name: String(value)})} placeholder='Name' />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <SizeSelect value={character.size} onChange={(value: CharacterSizes) => setCharacter({ ...character, size: value})} />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <CharacterTypeSelect value={character.type} onChange={(value: CharacterType) => setCharacter({ ...character, type: value})} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextInput value={character?.characterImageURL} onChange={(value) => setCharacter({ ...character, characterImageURL: String(value)})} placeholder='Image URL' />
                    </Grid>
                    
                    <Grid item xs={12} md={2}>
                        <TextInput value={character?.averageHitPoints} onChange={(value) => setCharacter({ ...character, averageHitPoints: Number(value)})} placeholder='Average Hit Points' number />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <TextInput value={character?.speed} onChange={(value) => setCharacter({ ...character, speed: Number(value)})} placeholder='Speed' number />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <TextInput value={character?.armorClass} onChange={(value) => setCharacter({ ...character, armorClass: Number(value)})} placeholder='Armor Class' number />
                    </Grid>
                    <Grid item xs={4} md={2}>
                        <TextInput value={character?.passivePerception} onChange={(value) => setCharacter({ ...character, passivePerception: Number(value)})} placeholder='Passive Percep' number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={character?.abilityScores?.strength} onChange={(value) => {
                            const scores = {...character?.abilityScores, strength: Number(value)}
                            setCharacter({...character, abilityScores: scores})
                        }} placeholder={`Strength (${Math.floor((character?.abilityScores?.strength - 10)/2) >= 0 ? "+" : ""}${Math.floor((character?.abilityScores?.strength - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={character?.abilityScores?.dexterity} onChange={(value) => {
                            const scores = {...character?.abilityScores, dexterity: Number(value)}
                            setCharacter({...character, abilityScores: scores})
                        }} placeholder={`Dexterity (${Math.floor((character?.abilityScores?.dexterity - 10)/2) >= 0 ? "+" : ""}${Math.floor((character?.abilityScores?.dexterity - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={character?.abilityScores?.constitution} onChange={(value) => {
                            const scores = {...character?.abilityScores, constitution: Number(value)}
                            setCharacter({...character, abilityScores: scores})
                        }} placeholder={`Constitution (${Math.floor((character?.abilityScores?.constitution - 10)/2) >= 0 ? "+" : ""}${Math.floor((character?.abilityScores?.constitution - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={character?.abilityScores?.intelligence} onChange={(value) => {
                            const scores = {...character?.abilityScores, intelligence: Number(value)}
                            setCharacter({...character, abilityScores: scores})
                        }} placeholder={`Intelligence (${Math.floor((character?.abilityScores?.intelligence - 10)/2) >= 0 ? "+" : ""}${Math.floor((character?.abilityScores?.intelligence - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={character?.abilityScores?.wisdom} onChange={(value) => {
                            const scores = {...character?.abilityScores, wisdom: Number(value)}
                            setCharacter({...character, abilityScores: scores})
                        }} placeholder={`Wisdom (${Math.floor((character?.abilityScores?.wisdom - 10)/2) >= 0 ? "+" : ""}${Math.floor((character?.abilityScores?.wisdom - 10)/2)})`} number />
                    </Grid>
                    <Grid item xs={4} md={1}>
                        <TextInput value={character?.abilityScores?.charisma} onChange={(value) => {
                            const scores = {...character?.abilityScores, charisma: Number(value)}
                            setCharacter({...character, abilityScores: scores})
                        }} placeholder={`Charisma (${Math.floor((character?.abilityScores?.charisma - 10)/2) >= 0 ? "+" : ""}${Math.floor((character?.abilityScores?.charisma - 10)/2)})`} number />
                    </Grid>

                    <Grid item xs={12} md={2}>
                        <SavingThrowSelect value={character.savingThrowProficiencies || []} onChange={(value: SavingThrow[]) => setCharacter({ ...character, savingThrowProficiencies: value})} />
                    </Grid>

                    <Grid item xs={4} md={1}>
                        <TextInput value={character?.proficiencyBonus} onChange={(value) => setCharacter({ ...character, proficiencyBonus: Number(value)})} placeholder='Prof. Bonus' number />
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <SkillsSelect value={character.skillProficiencies || []} onChange={(value: SavingThrow[]) => setCharacter({ ...character, skillProficiencies: value})} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Description</Typography>
                        <TextEditor height={400} preview="edit" value={character?.description || ""} onChange={(value) => setCharacter({ ...character, description: String(value)})} placeholder='Description' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Actions</Typography>
                        <TextEditor height={400} preview="edit" value={character?.actions || ""} onChange={(value) => setCharacter({ ...character, actions: String(value)})} placeholder='Actions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Bonus Actions</Typography>
                        <TextEditor height={400} preview="edit" value={character?.bonusActions || ""} onChange={(value) => setCharacter({ ...character, bonusActions: String(value)})} placeholder='Bonus Actions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Reactions</Typography>
                        <TextEditor height={400} preview="edit" value={character?.reactions || ""} onChange={(value) => setCharacter({ ...character, reactions: String(value)})} placeholder='Reactions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Legendary Actions</Typography>
                        <TextEditor height={400} preview="edit" value={character?.legendaryActions || ""} onChange={(value) => setCharacter({ ...character, legendaryActions: String(value)})} placeholder='Legendary Actions' />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography color="primary">Lair Actions</Typography>
                        <TextEditor height={400} preview="edit" value={character?.lairActions || ""} onChange={(value) => setCharacter({ ...character, lairActions: String(value)})} placeholder='Lair Actions' />
                    </Grid>
                </Grid>
                
            </div>
           
        </Drawer>
    )

}

export default CreateOrEditBaseCharacterDrawer;