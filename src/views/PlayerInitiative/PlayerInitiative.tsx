import React, {useState} from "react"
import CharacterPicker from "../../components/CharacterPicker/CharacterPicker";
import { useCampaignCharacters } from "../../service/CharacterService";
import { useParams } from "react-router-dom";
import css from "./PlayerInitiative.module.scss"
import { Character } from "../../model/Character";
import { useCampaign } from "../../service/CampaignService";
import { Typography } from "../../components/Typography/Typography";
import { CharacterThumbCard } from "../../components/CharacterThumbCard/CharatcerThumbCard";
import STICK from "../../images/ismark-background.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMehBlank } from "@fortawesome/free-regular-svg-icons";
import { faFaceAngry, faFaceMeh } from "@fortawesome/free-solid-svg-icons";
import { useCombat } from "../../service/CombatService";

const PlayerInitiative = () => {
    const [character, setCharacter] = useState<Character | null>()
    const {CampaignId} = useParams();
    const {isLoading, characters} = useCampaignCharacters(CampaignId || "")
    const {campaign} = useCampaign(CampaignId || "")
    const {isLoading: isCombatLoading, combat} = useCombat(campaign?.currentCombatDocId || "1")
    console.log("COMBAT")
    console.log(combat)

    let yourTurnDisplay = <><FontAwesomeIcon icon={faFaceMehBlank} /><Typography size="xtraLarge">Not Your Turn</Typography></>;

    if (character?.docId === combat.combatCharacterArray[combat.currentTurnIndex]?.playerDocId) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceAngry} /><Typography size="xtraLarge">Your Turn</Typography></>;
    } else if (
        character?.docId === combat.combatCharacterArray[combat.currentTurnIndex + 1]?.playerDocId
        || ((combat.currentTurnIndex === combat.combatCharacterArray?.length - 1) && character?.docId === combat.combatCharacterArray[0].playerDocId)
        ) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceMeh} /><Typography size="xtraLarge">You're Next!</Typography></>;
    }


    return (
    <div className={css.playerInitiativeContainer}>
        <Typography>{(combat.currentTurnIndex === combat.combatCharacterArray?.length - 1) ? "true" : "false"}</Typography>
        <CharacterPicker onChange={(value) => {
            const getCharacter = characters ? characters.find((char) => char.docId === value) : null;
            setCharacter(getCharacter)
        }} characters={characters || []}/>
        {character && 
            <div className={css.characterContainer}>
                <Typography color="light" size="xtraLarge">{character.name}</Typography>
                    <img
                        src={character.characterImageURL}
                        className={css.imageContainer}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src=STICK;
                        }}
                        width={360}
                        alt="boo"
                    />
                <div>
                    <div className={css.turnIndicator}>{yourTurnDisplay}</div>
                </div>
            </div>
        }

    </div>);
}

export default PlayerInitiative;

/*
 {character?.docId === campaign.currentDocId && <div className={css.turnIndicator}><FontAwesomeIcon icon={faFaceAngry} /><Typography size="xtraLarge">Your Turn</Typography></div>}
                {character?.docId === campaign.nextDocId && <div className={css.turnIndicator}><FontAwesomeIcon icon={faFaceMeh} /><Typography size="xtraLarge">You're Next!</Typography></div>}
                {character?.docId !== campaign.nextDocId && character?.docId !== campaign.currentDocId && <div className={css.turnIndicator}><FontAwesomeIcon icon={faFaceMehBlank} /><Typography size="xtraLarge">Not Your Turn</Typography></div>}
*/