import React, { useState } from "react";
import css from "../PlayerInitiative.module.scss"
import { Typography } from "@components/Typography/Typography";
import STICK from "@images/stick1.png"
import { TextInput } from "@components/TextInput/TextInput";
import { Button } from "@components/Button/Button";
import { Combat } from "@model/Combat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import ConditionSelect from "@components/ConditionsSelect/ConditionsSelect";
import { PlayerCharacter } from "@model/PlayerCharacter";
import {
    useFloating,
    useClick,
    useInteractions,
    offset,
    flip,
    shift,
    autoUpdate,
    useDismiss,
  } from "@floating-ui/react";
import { useParams, useSearchParams } from "react-router-dom";
import { useCampaignCharacters } from "@services/CharacterService";
import { useCampaign } from "@services/CampaignService";
import { mutateCombatCharacter, useCombat, useCombatCharacters, useEditCombat } from "@services/CombatService";
import { CombatCharacter } from "@model/CombatCharacter";
import Spinner from "@components/Spinner";
import { getNextTurnIndex } from "@views/DMInitiative/utils";
import useLocalCharacter from "@hooks/useLocalCharacter";

const SelectedPlayer = () => {
    const [healthIncrement, setHealthIncrement] = useState<number>(1);
    const [isHealthCounterOpen, setIsHealthCounterOpen] = useState(false);
    const {CampaignId: campaignId = ""} = useParams();
    const [searchParams] = useSearchParams();
    const {selectedCharacter: localCharacterId} = useLocalCharacter(campaignId)
    const selectedCharacterId = searchParams.get("characterId") || localCharacterId || "";
    const {characters} = useCampaignCharacters(campaignId || "")
    const {data: campaign} = useCampaign(campaignId || "")
    const {combat, isLoading: isCombatLoading} = useCombat(campaign?.currentCombatDocId || "1")
    const {combatCharacters = [], isLoading: isCharactersLoading} = useCombatCharacters(combat?.docId || "");
    const {mutate: editCombat} = useEditCombat(combat?.docId || "");

    const { currentTurnIndex = 0, colorFilter = []} = combat;
    const index = combatCharacters?.findIndex(combatCharacter => combatCharacter.playerDocId === selectedCharacterId)
    const {tempHealth = 0, health = 0, maxHealth = 0, conditions = [], armorClass = 0, initiative} = combatCharacters[index] || {health: 0, maxHealth: 0, conditions: [], armorClass: 0, initiative: 0};
    const character = characters.findLast(character => character.docId === selectedCharacterId)
    const combatCharacter = combatCharacters.findLast(character => character?.playerDocId === selectedCharacterId);
    const updateCharacter = (value: Partial<CombatCharacter>) => {
        if (combatCharacter) {
            mutateCombatCharacter(combatCharacter?.docId || "", value)
        }
    };

    const endTurn = () => {
        const nextTurn = getNextTurnIndex(currentTurnIndex, combatCharacters, colorFilter)
            editCombat({ currentTurnIndex: nextTurn })
    }

    let youreTurn = "not_next";

    if (selectedCharacterId === combatCharacters[currentTurnIndex]?.playerDocId) {
        youreTurn = "active";
    } else if (
        selectedCharacterId === combatCharacters[currentTurnIndex + 1]?.playerDocId
        || ((combat?.currentTurnIndex === combatCharacters?.length - 1) && selectedCharacterId === combatCharacters[0].playerDocId)
        ) {
            youreTurn = "next";
    }

    
  const { refs, floatingStyles, context } = useFloating({
    open: isHealthCounterOpen,
    onOpenChange: setIsHealthCounterOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  if (isCharactersLoading || isCombatLoading) {
    return <Spinner />
  }

    return (
        <div className={css.selectedPlayerContainer}>
            <div className={css.imageContainer}>
                <img
                    src={String(character?.characterImageURL)}
                    className={css.image}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=STICK;
                    }}
                    alt="boo"
                />
            </div>
            <div className={css.characterInfoContainer}>
                <div className={css.titleContainer}>
                    <Typography color={ youreTurn === "next" ? "tertiary" : youreTurn === "active" ? "success" : "light"} size="xtraLarge" fontStyle="secondary">{character?.name || ""}</Typography>
                    { youreTurn === "active" &&
                        <Button animatedHover onClick={endTurn}>End My Turn</Button>
                    }
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Initiative</Typography>
                    <div className={css.input}>
                        <TextInput number value={initiative} onChange={(value) => updateCharacter({initiative: Number(value)})} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Armor Class</Typography>
                    <div className={css.input}>
                        <TextInput number value={armorClass} onChange={(value) => updateCharacter({armorClass: Number(value)})} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Max Health</Typography>
                    <div className={css.input}>
                        <TextInput number value={maxHealth} onChange={(value) => updateCharacter({maxHealth: Number(value)})} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="large" fontStyle="secondary">Health</Typography>
                    <div className={css.input} ref={refs.setReference} {...getReferenceProps()}>
                        <TextInput number value={health} onChange={(value) => updateCharacter({health: Number(value)})} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="large" fontStyle="secondary">Temp Health</Typography>
                    <div className={css.input}>
                        <TextInput number value={tempHealth} onChange={(value) => updateCharacter({tempHealth: Number(value)})} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Conditions</Typography>
                    <div className={css.input} ref={refs.setReference}>
                        <ConditionSelect icons width={"150px"} outlined selectedValue={conditions} onChange={(conditions) => updateCharacter({conditions: conditions || []})}/>
                    </div>
                </div>
                


            </div>
            <div className={css.buttonContainer}>

            </div>
            {isHealthCounterOpen && (
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                >
                    <div className={css.healthCounterContainer}>
                        <div className={css.incrementText}>
                            <TextInput
                                number
                                value={healthIncrement || 0}
                                onChange={(value) => setHealthIncrement(Number(value))}
                                placeholder="increment"
                            />
                        </div>
                        <div className={css.counterButtons}>
                            <div className={css.minus} onClick={() => updateCharacter({health: health - healthIncrement || 0})}>
                                <FontAwesomeIcon icon={faMinus} />
                            </div>
                            <div className={css.plus} onClick={() => updateCharacter({health: health + healthIncrement || 0})}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default SelectedPlayer;