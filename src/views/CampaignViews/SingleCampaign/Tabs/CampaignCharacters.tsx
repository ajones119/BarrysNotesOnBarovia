import React, {useRef, useState} from 'react';
import css from "../SingleCampaign.module.scss"
import { useParams } from 'react-router-dom';
import { CharacterThumbCard } from '@components/CharacterThumbCard/CharacterThumbCard';
import { Typography } from '@components/Typography/Typography';
import { Button } from '@components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import NPCCard from '@components/BaseCharacterThumbCard/Cards/NPCCard';
import NPCDrawer from '@components/Drawer/BaseCharacterDrawer/NPCDrawer';
import { BaseCharacter } from '@model/BaseCharacter';
import { PlayerCharacter } from '@model/PlayerCharacter';
import PlayerCharacterDrawer from '@components/Drawer/BaseCharacterDrawer/PlayerCharacterDrawer';
import { useCampaignCharacters } from '@services/CharacterService';
import { useCampaignNPCs } from '@services/NPCService';
import FloatingButtonContainer from '@components/FloatingButtonContainer';
import { useHover } from 'usehooks-ts';
import { useSpring, animated } from '@react-spring/web';
import { TextInput } from '@components/TextInput/TextInput';

const CampaignCharacters = () => {
    const { CampaignId } = useParams();

    const [isAddNPCOpen, setIsAddNPCOpen] = useState(false);
    const [isAddCharacterOpen, setIsAddCharacterOpen] = useState(false);

    const [selectedCharacter, setSelectedCharacter] = useState<PlayerCharacter | null>(null);
    const [selectedNPC, setSelectedNPC] = useState<BaseCharacter | null>();

    const [search, setSearch] = useState("")

    const {characters} = useCampaignCharacters(CampaignId || "");
    const {NPCs = []} = useCampaignNPCs(CampaignId || "");
    const hoverRef = useRef(null);
    const isHovered = useHover(hoverRef)

    const springs = useSpring({
        translateY: isHovered ? -40 : 0,
        opacity: isHovered ? 1 : 0
    })

    let npcs = NPCs;

    if (search) {
        npcs = npcs.filter(npc => npc.name.toLowerCase().includes(search.toLowerCase()))
    }

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
        <div className={css.characters}>
            <FloatingButtonContainer>
                <div style={{display: "flex", columnGap: 16}}>
                    <div>
                        <TextInput placeholder='search...' value={search} onChange={(value) => setSearch(String(value))} />
                    </div>
                    <div ref={hoverRef}>
                        <div style={{position: "relative", marginBottom: -36, zIndex: 2}}>
                            <Button animatedHover color="dark" onClick={() => setIsAddNPCOpen(true)} disabled={!isHovered}>
                                <Typography color="light">Add NPC</Typography>
                            </Button>
                        </div>
                        <animated.div style={springs}>
                            <Button animatedHover color="dark" onClick={() => setIsAddCharacterOpen(true)} disabled={!isHovered}>
                                <Typography color="light">Add Character</Typography>
                            </Button>
                        </animated.div>
                    </div>
                </div>
            </FloatingButtonContainer>
            <div className={css.characterSection}>
                <div className={css.sectionHeaderRow}>
                    <div className={css.sectionHeader}>
                        <Typography size="xtraLarge" underline>
                            Characters  
                        </Typography>
                        </div>
                    </div>
                <div className={css.charactersContainer}>
                { characters?.map((character: BaseCharacter) => (
                    <CharacterThumbCard onClick={(character: PlayerCharacter) => {
                        setSelectedCharacter(character);
                        setIsAddCharacterOpen(true)
                    }} character={character}/>
                ))}
                </div>
            </div>
            
            <div className={css.characterSection}>
                <div className={css.sectionHeaderRow}>
                    <Typography size="xtraLarge" underline>
                        Non-player Characters
                    </Typography>
                </div>
                <div className={css.charactersContainer}>
                { npcs?.map((npc: BaseCharacter) => (
                    <NPCCard
                        baseCharacter={npc}
                        onClickEdit={() => {
                            setSelectedNPC(npc)
                            setIsAddNPCOpen(true);
                        }}
                    />
                ))}
                </div>
            </div>
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
                selectedCharacter={selectedCharacter}
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

/*

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

 */