import React, {useState} from 'react';
import css from "../SingleCampaign.module.scss"
import { useParams } from 'react-router-dom';
import { Grid } from "@mui/material";
import { Character } from '@model/Character';
import { CharacterThumbCard } from '@components/CharacterThumbCard/CharatcerThumbCard';
import { Spacer } from '@components/Spacer/Spacer';
import { NPC } from '@model/NPC';
import NPCThumbCard from '@components/NPCThumbCard/NPCThumbCard';
import { Typography } from '@components/Typography/Typography';
import { Button } from '@components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateNPCModal from '@components/Modal/CreateNPCModal/CreateNPCModal';
import CreateCharacterModal from '@components/Modal/CreateCharacterModal/CreateCharacterModal';

declare interface CampaignCharactersProps {
    characters: Character[],
    npcs: NPC[]
}

const CampaignCharacters = ({ characters, npcs }: CampaignCharactersProps) => {
    const params = useParams();
    const { CampaignId } = params;

    const [isAddNPCOpen, setIsAddNPCOpen] = useState(false)
    const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false)

    npcs = npcs?.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return (
        <div className={css.CampaignCharacters}>
            <Grid container justifyContent="space-around" alignItems="center" rowSpacing={2}>
                <Grid item xs={12}><Typography>Characters{" "} <Button color="dark" onClick={() => setIsAddCharacterOpen(true)}><FontAwesomeIcon icon={faPlus} /></Button></Typography></Grid>
                {
                    characters?.map((character: Character) => (
                        <Grid item xs={12} md={6}>
                            <CharacterThumbCard character={character}/>
                        </Grid>
                    ))
                }
            </Grid>
            <Spacer height={24}/>
            <Grid container justifyContent="space-around" alignItems="center">
                <Grid item xs={12}><Typography>Non-player Characters{" "} <Button color="dark" onClick={() => setIsAddNPCOpen(true)}><FontAwesomeIcon icon={faPlus} /></Button></Typography></Grid>
                { npcs?.map((npc: NPC) => (
                    <Grid item xs={12} md={4} lg={3}>
                        <NPCThumbCard npc={npc} />
                    </Grid>
                ))}
            </Grid>
            <CreateNPCModal isOpen={isAddNPCOpen} onClose={() => setIsAddNPCOpen(false)} campaignId={CampaignId as string} />
            <CreateCharacterModal initialCampaignId={CampaignId} isOpen={isAddCharacterOpen} onClose={() => setIsAddCharacterOpen(false)} />
        </div>
    )
}

export default CampaignCharacters;