import React from "react"
import CharacterPicker from "@components/CharacterPicker/CharacterPicker";
import { useCampaignCharacters } from "@services/CharacterService";
import { useParams, useSearchParams } from "react-router-dom";
import css from "./PlayerInitiative.module.scss"
import { useCampaign } from "@services/CampaignService";
import { Typography } from "@components/Typography/Typography";
import { useCombat, useCombatCharacters } from "@services/CombatService";
import { Spacer } from "@components/Spacer/Spacer";
import SelectedPlayer from "./components/SelectedPlayer";
import CharacterRow from "./components/CharacterRow";
import { CombatCharacter } from "@model/CombatCharacter";
import Tabs, { Tab } from "@components/Tabs/Tabs";
import CombatMap from "@views/CombatMap";
import Spinner from "@components/Spinner";
import FloatingButtonContainer from "@components/FloatingButtonContainer";
import { Button } from "@components/Button/Button";

const PlayerInitiative = () => {
    const {CampaignId: campaignId} = useParams();
    const [searchParams, setSearchParams] = useSearchParams()
    const {characters} = useCampaignCharacters(campaignId || "")
    const {data: campaign} = useCampaign(campaignId || "")
    const {combat, isLoading: isCombatLoading} = useCombat(campaign?.currentCombatDocId || "1")
    const {combatCharacters = [], isLoading: isCharactersLoading} = useCombatCharacters(combat?.docId || "");

    const {currentTurnIndex = 0 } = combat;

    const character = searchParams.get("characterId") && characters?.find(char => char.docId === searchParams.get("characterId")) || null

    let nextPlayerDocId: string | null = null;

    nextPlayerDocId = combatCharacters.find((char: CombatCharacter, index: number) => char?.playerDocId && index > currentTurnIndex)?.playerDocId || null;
    nextPlayerDocId = nextPlayerDocId || combatCharacters.find((char: CombatCharacter) => char?.playerDocId)?.playerDocId || null;

    const canShowCombatCharacterArray = combatCharacters?.filter((character: CombatCharacter) => character?.shouldShow)
    const PCs = canShowCombatCharacterArray?.filter((character: CombatCharacter) => character?.playerDocId);
    const allies = canShowCombatCharacterArray?.filter((character: CombatCharacter) => !character?.playerDocId && character?.isAlly);
    const enemies = canShowCombatCharacterArray?.filter((character: CombatCharacter) => !character?.playerDocId && !character?.isAlly).sort((a: CombatCharacter, b: CombatCharacter) => {
        let aName = a?.name?.toLowerCase() || "";
        let bName = b?.name?.toLowerCase() || "";
        return aName > bName ? 1 : -1;
    });

    const initiativeTab = (
        <div>
            <FloatingButtonContainer>
                <div className={css.toggleButtonsContainer}>
                    <CharacterPicker width={200} value={character?.docId} onChange={(value) => {
                if (value === "__none__") {
                    setSearchParams(searchParams => {
                        searchParams.set("characterId", "");
                        return searchParams;
                    })
                } else {
                    const getCharacter = characters ? characters.find((char) => char.docId === value) : null;
                    setSearchParams(searchParams => {
                        searchParams.set("characterId", getCharacter?.docId || "");
                        return searchParams;
                    })
                }
            }} characters={characters || []}/>
                <div>
                    <Button animatedHover onClick={() => setSearchParams(searchParams => {
                        searchParams.set("tab", "map");
                        return searchParams;
                    })

                    }>
                        <Typography>Map</Typography>
                    </Button>
                </div>
                </div>
            </FloatingButtonContainer>
            
            {(character) && 
                <SelectedPlayer />
            }
            <Spacer height={24} />
            <div className={css.healthBars}>
                    <Typography size="xtraLarge" weight="bold" fontStyle="secondary">Players</Typography>
                {
                    PCs?.map((character : CombatCharacter) => {
                        const {playerDocId, maxHealth = 0, health = 0} = character;
                    const healthBarAmount = (health/maxHealth)*100;
                    const playerCharacterImageUrl = characters.find(campaignCharacter => campaignCharacter.docId === playerDocId)?.characterImageURL;
                    return(
                        <CharacterRow
                            healthBarAmount={healthBarAmount}
                            rowImageURL={String(playerCharacterImageUrl)}
                            combatCharacter={character}
                            isCurrentTurn={combatCharacters[currentTurnIndex].playerDocId === playerDocId}
                            isNextTurn={character.playerDocId === nextPlayerDocId}
                            
                        />
                    )})
                }
            </div>
            { allies?.length > 0 && 
                <div className={css.healthBars}>
                    <Typography size="xtraLarge" weight="bold" fontStyle="secondary">Allies</Typography>
                    {
                        allies?.map((character: CombatCharacter) => {
                            const { maxHealth = 0, health = 0} = character
                        const healthBarAmount = (health/maxHealth)*100;
                        return(
                            <CharacterRow
                                rowImageURL={character?.imageURL}
                                healthBarAmount={healthBarAmount}
                                combatCharacter={character}
                            />
                        )})
                    }
                </div>
            }
            { enemies?.length > 0 &&
                <div className={css.healthBars}>
                    <Typography size="xtraLarge" weight="bold" fontStyle="secondary">Enemies</Typography>
                    {
                        enemies?.map((character: CombatCharacter) => {
                            const { maxHealth = 0, health = 0} = character
                        const healthBarAmount = (health/maxHealth)*100;
                        return(
                            <CharacterRow
                                rowImageURL={character?.imageURL}
                                healthBarAmount={healthBarAmount}
                                combatCharacter={character}
                            />
                        )})
                    }
                </div>
            }
        </div>
    );

    const mapTab = (
        <CombatMap combatIdOverride={campaign?.currentCombatDocId} isPlayer />
    );

    const pageTabs: Array<Tab> = [
        {
            key: "initiative",
            name: <Typography>Initiative</Typography>,
            content: initiativeTab
        },
        {
            key: "map",
            name: <Typography>Map</Typography>,
            content: mapTab
        }
    ];

    if (isCombatLoading || isCharactersLoading) {
        return <Spinner />
    }

    return (
        <div className={css.playerInitiativeContainer}>
            <Tabs
                currentTab={searchParams.get("tab") || "initiative"}
                tabs={pageTabs}
                disableTabMenu
            />
            <Spacer height={24} />

        </div>
        );
}

export default PlayerInitiative;