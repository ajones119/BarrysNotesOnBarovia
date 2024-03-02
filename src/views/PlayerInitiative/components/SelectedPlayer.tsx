import React, { useState } from "react";
import css from "../PlayerInitiative.module.scss"
import { Typography } from "@components/Typography/Typography";
import STICK from "@images/stick1.png"
import { TextInput } from "@components/TextInput/TextInput";
import { Button } from "@components/Button/Button";
import { Combat } from "@model/Combat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceAngry, faFaceMehBlank, faFaceSurprise, faMinus, faMugHot, faPlus, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import ConditionSelect from "@components/ConditionsSelect/ConditionsSelect";
import { Spacer } from "@components/Spacer/Spacer";
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

type SelectedPlayerProps = {
    character: PlayerCharacter,
    combat: Combat,
    update: (combat: Combat) => void
}

const SelectedPlayer = ({character, combat, update}: SelectedPlayerProps) => {
    const [healthIncrement, setHealthIncrement] = useState<number>(1);
    const [isHealthCounterOpen, setIsHealthCounterOpen] = useState(false);

    const {combatCharacterArray = [], currentTurnIndex = 0} = combat;
    const index = combat?.combatCharacterArray?.findIndex(combatCharacter => combatCharacter.playerDocId === character?.docId)
    const {health = 0, maxHealth = 0, conditions = [], armorClass = 0, initiative} = combatCharacterArray[index] || {health: 0, maxHealth: 0, conditions: [], armorClass: 0, initiative: 0};

    const updateCharacter = (key: string, value: any) => {
        const newCombat = { ...combat }

        if (index !== null) {
            const newCharacter = {...newCombat.combatCharacterArray[index], [key]: value}
            newCombat.combatCharacterArray[index] = newCharacter;
        }

        update(newCombat)
    };

    const endTurn = () => {
        const {currentTurnIndex = 0} = combat;

        const nextTurn = currentTurnIndex >= combat.combatCharacterArray.length - 1 ? 0 : currentTurnIndex + 1

        update({ ...combat, currentTurnIndex: nextTurn })
    }

    let youreTurn = "not_next";

    if (character?.docId === combat?.combatCharacterArray[currentTurnIndex]?.playerDocId) {
        youreTurn = "active";
    } else if (
        character?.docId === combat?.combatCharacterArray[currentTurnIndex + 1]?.playerDocId
        || ((combat?.currentTurnIndex === combat?.combatCharacterArray?.length - 1) && character?.docId === combat?.combatCharacterArray[0].playerDocId)
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


    return (
        <div className={css.selectedPlayerContainer}>
            <div className={css.imageContainer}>
                <img
                    src={String(character.characterImageURL)}
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
                    <Typography color={ youreTurn === "next" ? "tertiary" : youreTurn === "active" ? "success" : "light"} size="xtraLarge" fontStyle="secondary">{character.name}</Typography>
                    { youreTurn === "active" &&
                        <Button animatedHover onClick={endTurn}>End My Turn</Button>
                    }
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Initiative</Typography>
                    <div className={css.input}>
                        <TextInput number value={initiative} onChange={(value) => updateCharacter("initiative", Number(value))} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Armor Class</Typography>
                    <div className={css.input}>
                        <TextInput number value={armorClass} onChange={(value) => updateCharacter("armorClass", Number(value))} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Max Health</Typography>
                    <div className={css.input}>
                        <TextInput number value={maxHealth} onChange={(value) => updateCharacter("maxHealth", Number(value))} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="large" fontStyle="secondary">Health</Typography>
                    <div className={css.input} ref={refs.setReference} {...getReferenceProps()}>
                        <TextInput number value={health} onChange={(value) => updateCharacter("health", Number(value))} />
                    </div>
                </div>
                <div className={css.inputSection}>
                    <Typography color="light" size="default" fontStyle="secondary">Conditions</Typography>
                    <div className={css.input} ref={refs.setReference}>
                        <ConditionSelect width={"150px"} outlined selectedValue={conditions} onChange={(conditions) => updateCharacter("conditions", conditions)}/>
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
                            <div className={css.minus} onClick={() => updateCharacter("health", health - healthIncrement || 0)}>
                                <FontAwesomeIcon icon={faMinus} />
                            </div>
                            <div className={css.plus} onClick={() => updateCharacter("health", health + healthIncrement || 0)}>
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

/*
 <div className={css.characterContainer}>
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
                <Typography color="light" size="xtraLarge">{character.name}</Typography>
                <div className={css.editCharacter}>
                    <div className={css.healthInput}>
                        <Typography color="light" size="default">Health: {health}/{maxHealth}</Typography>
                                
                        <div>
                            <div className={css.healthCounterContainer}>
                                <div className={css.counterButtons}>
                                    <div className={css.minus} onClick={() => {
                                        updateCharacter("health", 0);
                                        }}> <FontAwesomeIcon icon={faSkullCrossbones} /></div>
                                    <div className={css.minus} onClick={() => {
                                        const newHealth = Number(health || 0) - Number(currentHealthIncrement || 0);
                                        updateCharacter("health", newHealth);
                                    }}> <FontAwesomeIcon icon={faMinus} /></div>
                                    <div className={css.incrementInput}>
                                        <TextInput number value={currentHealthIncrement || 0} onChange={(value) => setCurrentHealthIncrement(Number(value))} />
                                    </div>
                                    <div className={css.plus} onClick={() => {
                                        const newHealth = Number(health || 0) + Number(currentHealthIncrement || 0);
                                        updateCharacter("health", newHealth);
                                    }}><FontAwesomeIcon icon={faPlus} /></div>
                                    <div className={css.plus} onClick={() => {
                                        updateCharacter("health", maxHealth);
                                    }}><FontAwesomeIcon icon={faMugHot} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <div className={css.conditionsSelector}>
                <Typography size="default" >Status Effects</Typography>
                <ConditionSelect outlined width="50%" selectedValue={conditions} onChange={(conditions) => updateCharacter("conditions", conditions)}/>
            </div>
            <Spacer height={16} />
            { character?.docId === combat.combatCharacterArray[currentTurnIndex]?.playerDocId && <div>
                <Button onClick={endTurn}>End My Turn</Button>
            </div>}
        </div>*/