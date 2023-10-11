import React, {useState} from "react"
import CharacterPicker from "../../components/CharacterPicker/CharacterPicker";
import { useCampaignCharacters } from "../../service/CharacterService";
import { useParams } from "react-router-dom";
import css from "./PlayerInitiative.module.scss"
import { Character } from "@model/Character";
import { useCampaign } from "../../service/CampaignService";
import { Typography } from "../../components/Typography/Typography";
import { useCombat, useUpdateInitiative } from "../../service/CombatService";
import { Spacer } from "../../components/Spacer/Spacer";
import SelectedPlayer from "./components/SelectedPlayer";
import CharacterRow from "./components/CharacterRow";

const PlayerInitiative = () => {
    const [character, setCharacter] = useState<Character | null>()
    const {CampaignId} = useParams();
    const {characters} = useCampaignCharacters(CampaignId || "")
    const {campaign} = useCampaign(CampaignId || "")
    const {combat} = useCombat(campaign?.currentCombatDocId || "1")

    const update = useUpdateInitiative(combat)

    let nextPlayerDocId: string | null = null;

    nextPlayerDocId = combat.combatCharacterArray.find((char, index) => char?.playerDocId && index > combat.currentTurnIndex)?.playerDocId || null;
    nextPlayerDocId = nextPlayerDocId || combat.combatCharacterArray.find((char) => char?.playerDocId)?.playerDocId || null;

    const combatCharacterArray = combat?.combatCharacterArray?.filter(character => character?.shouldShow).sort((a, b) => {
        a = a?.name?.toLowerCase() || "";
        b = b?.name?.toLowerCase() || "";
        return a > b ? 1 : -1;
    })
    const PCs = combatCharacterArray?.filter(character => character?.playerDocId);
    const others = combatCharacterArray?.filter(character => !character?.playerDocId);

    return (
    <div className={css.playerInitiativeContainer}>
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
            <Typography>Players</Typography>
            {
                PCs?.map(character => {
                const healthBarAmount = (character.health/character.maxHealth)*100;
                const playerCharacterImageUrl = characters.find(campaignCharacter => campaignCharacter.docId === character.playerDocId)?.characterImageURL;
                return(
                    <CharacterRow
                        healthBarAmount={healthBarAmount}
                        playerCharacterImageUrl={playerCharacterImageUrl}
                        combatCharacter={character}
                        isCurrentTurn={combat?.combatCharacterArray[combat?.currentTurnIndex].playerDocId === character.playerDocId}
                        isNextTurn={character.playerDocId === nextPlayerDocId}

                    />
                )})
            }
        </div>
        <div className={css.healthBars}>
        <Typography>Enemies</Typography>
            {
                others?.map(character => {
                const healthBarAmount = (character.health/character.maxHealth)*100;
                return(
                    <CharacterRow
                        healthBarAmount={healthBarAmount}
                        combatCharacter={character}
                    />
                )})
            }
        </div>
        <Spacer height={24} />

    </div>);
}

export default PlayerInitiative;