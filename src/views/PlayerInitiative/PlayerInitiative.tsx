import React, {useState} from "react"
import CharacterPicker from "../../components/CharacterPicker/CharacterPicker";
import { useCampaignCharacters } from "../../service/CharacterService";
import { useParams } from "react-router-dom";
import css from "./PlayerInitiative.module.scss"
import { Character } from "../../model/Character";
import { useCampaign } from "../../service/CampaignService";
import { Typography } from "../../components/Typography/Typography";
import STICK from "../../images/ismark-background.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceMehBlank } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faFaceAngry, faFaceDizzy, faFaceFrown, faFaceFrownOpen, faFaceGrimace, faFaceGrin, faFaceLaughBeam, faFaceMeh, faFaceSadCry, faSkull } from "@fortawesome/free-solid-svg-icons";
import { useCombat, useUpdateInitiative } from "../../service/CombatService";
import { LinearProgress } from "@mui/material"
import { Button } from "../../components/Button/Button";
import { Spacer } from "../../components/Spacer/Spacer";

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

    const getHealthIcon = (percent: number) => {
        if (percent > 90) return faFaceLaughBeam
        else if (percent > 80) return faFaceGrin
        else if (percent > 40) return faFaceAngry
        else if (percent > 30) return faFaceGrimace
        else if (percent > 20) return faFaceFrownOpen
        else if (percent > 10) return faFaceSadCry
        else if (percent > 0) return faFaceDizzy
        else return faSkull
    }

    const combatCharacterArray = combat?.combatCharacterArray?.filter(character => !character?.shouldHide).sort(() => Math.random() - 0.5)
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
        {(character ) && 
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
            </div>
        }
        <Spacer height={24} />
        <div className={css.healthBars}>
            <Typography>Players</Typography>
            {
                PCs?.map(character => {
                const healthBarAmount = (character.health/character.maxHealth)*100;
                return(
                    <div className={css.healthBar}>
                        <div className={css.nameRow}>
                            {combat?.combatCharacterArray[combat?.currentTurnIndex].playerDocId === character.playerDocId && <FontAwesomeIcon icon={faArrowRight} />}
                            <FontAwesomeIcon icon={getHealthIcon(healthBarAmount)} />
                            <Typography style={{color: character.color || "white"}}>{character?.name || "Unknown"}</Typography>
                        </div>
                        {character?.shouldShowHealthBar && <LinearProgress variant={healthBarAmount < 101 ? "determinate" : "indeterminate"} value={healthBarAmount} color={getHealthBarColor(healthBarAmount)} />}
                        <Spacer height={8} />
                    </div>
                )})
            }
        </div>
        <div className={css.healthBars}>
        <Typography>Enemies</Typography>
            {
                others?.map(character => {
                const healthBarAmount = (character.health/character.maxHealth)*100;
                return(
                    <div className={css.healthBar}>
                        <div className={css.nameRow}><FontAwesomeIcon icon={getHealthIcon(healthBarAmount)} /><Typography style={{color: character.color || "white"}}>{character?.name || "Unknown"}</Typography></div>
                        {character?.shouldShowHealthBar && <LinearProgress variant={healthBarAmount < 101 ? "determinate" : "indeterminate"} value={healthBarAmount} color={getHealthBarColor(healthBarAmount)} />}
                        <Spacer height={8} />
                    </div>
                )})
            }
        </div>
        <Spacer height={24} />

    </div>);
}

export default PlayerInitiative;