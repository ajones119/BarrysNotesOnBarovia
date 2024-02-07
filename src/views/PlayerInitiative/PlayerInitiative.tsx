import React, {useState} from "react"
import CharacterPicker from "@components/CharacterPicker/CharacterPicker";
import { useCampaignCharacters } from "@services/CharacterService";
import { useParams } from "react-router-dom";
import css from "./PlayerInitiative.module.scss"
import { useCampaign } from "@services/CampaignService";
import { Typography } from "@components/Typography/Typography";
import { useCombat, useUpdateInitiative } from "@services/CombatService";
import { Spacer } from "@components/Spacer/Spacer";
import SelectedPlayer from "./components/SelectedPlayer";
import CharacterRow from "./components/CharacterRow";
import { PlayerCharacter } from "@model/PlayerCharacter";
import { CombatCharacter } from "@model/CombatCharacter";
import Tabs, { Tab } from "@components/Tabs/Tabs";
import CombatMap from "@views/CombatMap";

const PlayerInitiative = () => {
    const [character, setCharacter] = useState<PlayerCharacter | null>()
    const [tab, setTab] = useState("initiative");
    const {campaignId} = useParams();
    const {characters} = useCampaignCharacters(campaignId || "")
    const {data: campaign} = useCampaign(campaignId || "")
    const {combat} = useCombat(campaign?.currentCombatDocId || "1")
    const {currentTurnIndex = 0, combatCharacterArray = [] } = combat;

    const update = useUpdateInitiative(combat);

    let nextPlayerDocId: string | null = null;

    nextPlayerDocId = combatCharacterArray.find((char: CombatCharacter, index: number) => char?.playerDocId && index > currentTurnIndex)?.playerDocId || null;
    nextPlayerDocId = nextPlayerDocId || combatCharacterArray.find((char: CombatCharacter) => char?.playerDocId)?.playerDocId || null;

    const canShowCombatCharacterArray = combat?.combatCharacterArray?.filter((character: CombatCharacter) => character?.shouldShow)
    const PCs = canShowCombatCharacterArray?.filter((character: CombatCharacter) => character?.playerDocId);
    const allies = canShowCombatCharacterArray?.filter((character: CombatCharacter) => !character?.playerDocId && character?.isAlly);
    const enemies = canShowCombatCharacterArray?.filter((character: CombatCharacter) => !character?.playerDocId && !character?.isAlly).sort((a: CombatCharacter, b: CombatCharacter) => {
        let aName = a?.name?.toLowerCase() || "";
        let bName = b?.name?.toLowerCase() || "";
        return aName > bName ? 1 : -1;
    });

    const initiativeTab = (
        <div>
             <CharacterPicker onChange={(value) => {
                if (value === "__none__") {
                    setCharacter(null)
                } else {
                    const getCharacter = characters ? characters.find((char) => char.docId === value) : null;
                    setCharacter(getCharacter)
                }
            }} characters={characters || []}/>
            {(character) && 
                <SelectedPlayer update={update} combat={combat} character={character} />
            }
            <Spacer height={24} />
            <div className={css.healthBars}>
                    <Typography size="xtraLarge" weight="bolder">Players</Typography>
                {
                    PCs?.map((character : CombatCharacter) => {
                        const {playerDocId, maxHealth = 0, health = 0} = character;
                    const healthBarAmount = (health/maxHealth)*100;
                    const playerCharacterImageUrl = characters.find(campaignCharacter => campaignCharacter.docId === playerDocId)?.characterImageURL;
                    return(
                        <CharacterRow
                            healthBarAmount={healthBarAmount}
                            rowImageURL={playerCharacterImageUrl}
                            combatCharacter={character}
                            isCurrentTurn={combat?.combatCharacterArray[currentTurnIndex].playerDocId === playerDocId}
                            isNextTurn={character.playerDocId === nextPlayerDocId}
                            
                        />
                    )})
                }
            </div>
            { allies?.length > 0 && 
                <div className={css.healthBars}>
                    <Typography size="xtraLarge" weight="bolder">Allies</Typography>
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
            <div className={css.healthBars}>
                <Typography size="xtraLarge" weight="bolder">Enemies</Typography>
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

    return (
        <div className={css.playerInitiativeContainer}>
            <Tabs
                currentTab={tab}
                onChange={(tab) => setTab(tab)}
                tabs={pageTabs}
            />
            <Spacer height={24} />

        </div>
        );
}

export default PlayerInitiative;