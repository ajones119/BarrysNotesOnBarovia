import React, {useState} from 'react';
import css from "../SingleCampaign.module.scss"
import { useParams } from 'react-router-dom';
import { Grid } from "@mui/material";
import { CharacterThumbCard } from '@components/CharacterThumbCard/CharacterThumbCard';
import { Spacer } from '@components/Spacer/Spacer';
import { Typography } from '@components/Typography/Typography';
import { Button } from '@components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NPCCard from '@components/BaseCharacterThumbCard/Cards/NPCCard';
import NPCDrawer from '@components/Drawer/BaseCharacterDrawer/NPCDrawer';
import { BaseCharacter } from '@model/BaseCharacter';
import { PlayerCharacter } from '@model/PlayerCharacter';
import PlayerCharacterDrawer from '@components/Drawer/BaseCharacterDrawer/PlayerCharacterDrawer';

declare interface CampaignCharactersProps {
    characters: PlayerCharacter[],
    npcs: BaseCharacter[]
}

const CampaignCharacters = ({ characters, npcs }: CampaignCharactersProps) => {

    const params = useParams();
    const { CampaignId } = params;

    const [isAddNPCOpen, setIsAddNPCOpen] = useState(false);
    const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false);
    const [selectedCharacter, setSelectedCharacter] = useState<PlayerCharacter | null>(null);
    const [selectedNPC, setSelectedNPC] = useState<BaseCharacter | null>();

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
                <Grid item xs={12}>
                    <div className={css.sectionHeader}>
                        <Typography size="xtraLarge" underline>
                            Characters  
                        </Typography>
                        <Button color="dark" onClick={() => setIsAddCharacterOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                    </div>
                </Grid>
                {
                    characters?.map((character: PlayerCharacter) => (
                        <Grid item xs={12} md={6}>
                            <CharacterThumbCard onClick={(character: PlayerCharacter) => {
                                    setSelectedCharacter(character);
                                    setIsAddCharacterOpen(true)
                                }} character={character}/>
                        </Grid>
                    ))
                }
            </Grid>
            <Spacer height={24}/>
            <Grid container justifyContent="space-around" alignItems="center">
                <Grid item xs={12}>
                    <div className={css.sectionHeader}>
                        <Typography size="xtraLarge" underline>
                            Non-player Characters
                        </Typography>
                        <Button color="dark" onClick={() => setIsAddNPCOpen(true)}><FontAwesomeIcon icon={faPlus} /></Button>
                    </div>
                </Grid>
                { npcs?.map((npc: BaseCharacter) => (
                    <Grid item xs={12} md={4} lg={3}>
                        <NPCCard
                            baseCharacter={npc}
                            onClickEdit={() => {
                                setSelectedNPC(npc)
                                setIsAddNPCOpen(true);
                            }}
                        />
                    </Grid>
                ))}
            </Grid>
            <NPCDrawer
                editNPC={selectedNPC}
                isOpen={isAddNPCOpen}
                onClose={() => {
                    setIsAddNPCOpen(false);
                    setSelectedNPC(null)
                }}
                campaignDocId={CampaignId as string}
            />
            <PlayerCharacterDrawer
                isOpen={isAddCharacterOpen}
                editCharacter={selectedCharacter}
                campaignId={CampaignId}
                onClose={() => {
                    setSelectedCharacter(null)
                    setIsAddCharacterOpen(!isAddCharacterOpen)
                }}
            />
        </div>
    )
}

export default CampaignCharacters;