import React, {useEffect, useState} from "react"
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
import { faArrowRight, faExclamationCircle, faFaceAngry, faFaceDizzy, faFaceFrown, faFaceFrownOpen, faFaceGrimace, faFaceGrin, faFaceLaughBeam, faFaceMeh, faFaceSadCry, faFaceSurprise, faSkull } from "@fortawesome/free-solid-svg-icons";
import { useCombat, useUpdateInitiative } from "../../service/CombatService";
import { Avatar, LinearProgress, Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material"
import { Button } from "../../components/Button/Button";
import { Spacer } from "../../components/Spacer/Spacer";
import { TextInput } from "../../components/TextInput/TextInput";
import { getIconList } from "./utils";
import BACKUP from "../../images/barry-cartoon.png"

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
    },
  }));

const PlayerInitiative = () => {
    const [character, setCharacter] = useState<Character | null>()
    const [currentHealth, setCurrentHealth] = useState<number | null>()
    const {CampaignId} = useParams();
    const {isLoading, characters} = useCampaignCharacters(CampaignId || "")
    const {campaign} = useCampaign(CampaignId || "")
    const {isLoading: isCombatLoading, combat} = useCombat(campaign?.currentCombatDocId || "1")

    useEffect(() => {
        if (character) {
            const health = combatCharacterArray.find(combatCharacter => combatCharacter.playerDocId === character.docId)?.health;
            console.log("HEALTH", health)
            setCurrentHealth(health);
        } else {
            setCurrentHealth(null);
        }
    }, [character?.docId])

    const update = useUpdateInitiative(combat)

    const endTurn = () => {
        const {currentTurnIndex} = combat;

        const nextTurn = currentTurnIndex >= combat.combatCharacterArray.length - 1 ? 0 : currentTurnIndex + 1

        update({ ...combat, currentTurnIndex: nextTurn })
    }

    const updateHealth = () => {
        const newCombat = { ...combat }
        const index = combat.combatCharacterArray.findIndex(combatCharacter => combatCharacter.playerDocId === character?.docId)

        if (index !== null) {
            newCombat.combatCharacterArray[index].health = currentHealth;
        }

        update(newCombat)
    };

    let yourTurnDisplay = <><FontAwesomeIcon icon={faFaceMehBlank} /><Typography size="xtraLarge">Not Your Turn</Typography></>;

    if (character?.docId === combat.combatCharacterArray[combat.currentTurnIndex]?.playerDocId) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceAngry} /><Typography size="xtraLarge">Your Turn</Typography></>;
    } else if (
        character?.docId === combat.combatCharacterArray[combat.currentTurnIndex + 1]?.playerDocId
        || ((combat.currentTurnIndex === combat.combatCharacterArray?.length - 1) && character?.docId === combat.combatCharacterArray[0].playerDocId)
        ) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceSurprise} /><Typography size="xtraLarge">You're Next!</Typography></>;
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
                <div className={css.healthInput}>
                    <TextInput value={currentHealth} onChange={value => setCurrentHealth(Number(value))} number />
                    <Button onClick={updateHealth}>Save</Button>
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
                const playerCharacterImageUrl = characters.find(campaignCharacter => campaignCharacter.docId === character.playerDocId)?.characterImageURL;
                return(
                    <div className={css.healthBar}>
                        <div className={css.nameRowContainer}>
                            <FontAwesomeIcon className={`
                                ${combat?.combatCharacterArray[combat?.currentTurnIndex].playerDocId === character.playerDocId
                                    && css.show}
                                ${character.playerDocId === nextPlayerDocId && css.showWarning}
                                ${css.nextRowIcon}
                                `}
                                icon={nextPlayerDocId === character.playerDocId ? faExclamationCircle : faArrowRight} 
                            />
                            <div className={css.nameRow}>
                            <Avatar
                                src={playerCharacterImageUrl || BACKUP}
                                alt="boo"
                                sx={{width: 32, height: 32}}
                            />
                                <Typography style={{color: character.color || "white"}}>{character?.name || "Unknown"}</Typography>
                                <FontAwesomeIcon icon={getHealthIcon(healthBarAmount)} />
                                { getIconList(character).map(value => <BootstrapTooltip placement="top" arrow title={value?.label}><FontAwesomeIcon icon={value?.icon} /></BootstrapTooltip>) }
                            </div>
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
                        <div className={css.nameRowContainer}>
                            <div />
                            <div className={css.nameRow}>
                                <FontAwesomeIcon icon={getHealthIcon(healthBarAmount)} />
                                <Typography style={{color: character.color || "white"}}>{character?.name || "Unknown"}</Typography>
                                { getIconList(character).map(value => <BootstrapTooltip placement="top" arrow title={value?.label}><FontAwesomeIcon icon={value?.icon} /></BootstrapTooltip>) }
                            </div>
                        </div>
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