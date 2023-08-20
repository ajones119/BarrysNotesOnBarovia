import React, { useState } from "react";
import css from "./InitiativeTracker.module.scss"
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { Character } from "../../../../../model/Character";
import { useList } from "../../../../../hooks/useList";
import { Button } from "../../../../../components/Button/Button";
import { Campaign } from "../../../../../model/Campaign";
import CreateCombatModal from "../../../../../components/Modal/CreateCombatModal/CreateCombatModal";
import { CombatCharacter } from "../../../../../model/CombatCharacter";
import { useCampaignCombats } from "../../../../../service/CombatService";
import { Typography } from "../../../../../components/Typography/Typography";
import { useNavigate } from "react-router-dom";
import { CombatEntryRow } from "./CombatEntryRow";

type CombatsProps = {
    campaign: Campaign,
    characters: Character[]
}

const Combats = ({ campaign, characters }: CombatsProps) => {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const {combats, isLoading} = useCampaignCombats(campaign.docId)

    const formattedCharacters = characters.map(character => ({
        name: character.name,
        initiativeBonus: character?.initiativeBonus,
        armorClass: character?.armorClass,
        playerDocId: character.docId
    } as CombatCharacter))

    return (
        <div className={css.initiativeTrackerContainer}>
            <Button onClick={() => {setCreateModalOpen(true)}}>Create Encounter</Button>
            <TableContainer style={{width: "400px", margin: "0 auto"}}>
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell><Typography>Name</Typography></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            {
                combats?.map(combat => 
                    <CombatEntryRow combat={combat} />
                )
            }
            </TableContainer>
            <CreateCombatModal characters={formattedCharacters} isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)} campaignId={campaign.docId} />
        </div>
    )
}

export default Combats