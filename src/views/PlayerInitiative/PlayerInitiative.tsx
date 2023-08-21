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
import { useCombat, useUpdateInitiative } from "../../service/CombatService";
import { LinearProgress } from "@mui/material"
import { Button } from "../../components/Button/Button";

const PlayerInitiative = () => {
    const [character, setCharacter] = useState<Character | null>()
    const {CampaignId} = useParams();
    const {isLoading, characters} = useCampaignCharacters(CampaignId || "")
    const {campaign} = useCampaign(CampaignId || "")
    const {isLoading: isCombatLoading, combat} = useCombat(campaign?.currentCombatDocId || "1")

    const update = useUpdateInitiative(combat)

    const endTurn = () => {
        const {currentTurnIndex} = combat;

        const nextTurn = currentTurnIndex >= combat.combatCharacterArray.length - 1 ? 0 : currentTurnIndex + 1

        update({ ...combat, currentTurnIndex: nextTurn })
    }

    let yourTurnDisplay = <><FontAwesomeIcon icon={faFaceMehBlank} /><Typography size="xtraLarge">Not Your Turn</Typography></>;

    if (character?.docId === combat.combatCharacterArray[combat.currentTurnIndex]?.playerDocId) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceAngry} /><Typography size="xtraLarge">Your Turn</Typography></>;
    } else if (
        character?.docId === combat.combatCharacterArray[combat.currentTurnIndex + 1]?.playerDocId
        || ((combat.currentTurnIndex === combat.combatCharacterArray?.length - 1) && character?.docId === combat.combatCharacterArray[0].playerDocId)
        ) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceMeh} /><Typography size="xtraLarge">You're Next!</Typography></>;
    }

    const getHealthBarColor = (percent: number) => {
        if (percent > 100) return "secondary"
        else if (percent > 50) return "success"
        else if (percent <= 20) return "error"
        else return "warning"
    }

    const combatCharacterArray = combat?.combatCharacterArray?.filter(character => !character?.shouldHide).sort(() => Math.random() - 0.5)

    return (
    <div className={css.playerInitiativeContainer}>
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
                { character?.docId === combat.combatCharacterArray[combat.currentTurnIndex]?.playerDocId && <div>
                    <Button onClick={endTurn}>End My Turn</Button>
                </div>}
                <div className={css.healthBars}>
                    {
                        combatCharacterArray?.map(character => {
                            console.log(character)
                        const healthBarAmount = character?.shouldShowHealthBar ? (character.health/character.maxHealth)*100 : 1000
                        return(
                            <div className={css.healthBar}>
                                <Typography>{character?.name}</Typography>
                                <LinearProgress variant={healthBarAmount < 101 ? "determinate" : "indeterminate"} value={healthBarAmount} color={getHealthBarColor(healthBarAmount)} />
                            </div>
                        )})
                    }
                </div>
            </div>
        }

    </div>);
}

export default PlayerInitiative;