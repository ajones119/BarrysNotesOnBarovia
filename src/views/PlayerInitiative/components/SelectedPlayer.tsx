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

type SelectedPlayerProps = {
    character: PlayerCharacter,
    combat: Combat,
    update: (combat: Combat) => void
}

const SelectedPlayer = ({character, combat, update}: SelectedPlayerProps) => {
    const [currentHealthIncrement, setCurrentHealthIncrement] = useState<number | null>(1);

    const {combatCharacterArray = [], currentTurnIndex = 0} = combat;
    const index = combat.combatCharacterArray.findIndex(combatCharacter => combatCharacter.playerDocId === character?.docId)
    const {health = 0, maxHealth = 0, conditions = []} = combatCharacterArray[index] || {health: 0, maxHealth: 0, conditions: []};

    const updateCharacter = (key: string, value: any) => {
        const newCombat = { ...combat }

        if (index !== null) {
            const newCharacter = {...newCombat.combatCharacterArray[index], [key]: value}
            newCombat.combatCharacterArray[index] = newCharacter;
        }

        update(newCombat)
    };

    const endTurn = () => {
        const {combatCharacterArray = [], currentTurnIndex = 0} = combat;

        const nextTurn = currentTurnIndex >= combat.combatCharacterArray.length - 1 ? 0 : currentTurnIndex + 1

        update({ ...combat, currentTurnIndex: nextTurn })
    }

    let yourTurnDisplay = <><FontAwesomeIcon icon={faFaceMehBlank} /><Typography size="xtraLarge">Not Your Turn</Typography></>;

    if (character?.docId === combat.combatCharacterArray[currentTurnIndex]?.playerDocId) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceAngry} /><Typography size="xtraLarge">Your Turn</Typography></>;
    } else if (
        character?.docId === combat.combatCharacterArray[currentTurnIndex + 1]?.playerDocId
        || ((combat.currentTurnIndex === combat.combatCharacterArray?.length - 1) && character?.docId === combat.combatCharacterArray[0].playerDocId)
        ) {
        yourTurnDisplay = <><FontAwesomeIcon icon={faFaceSurprise} /><Typography size="xtraLarge">You're Next!</Typography></>;
    }


    return (
        <div>
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
                <ConditionSelect width="50%" selectedValue={conditions} onChange={(conditions) => updateCharacter("conditions", conditions)}/>
            </div>
            <Spacer height={16} />
            { character?.docId === combat.combatCharacterArray[currentTurnIndex]?.playerDocId && <div>
                <Button onClick={endTurn}>End My Turn</Button>
            </div>}
        </div>
        </div>
    )
};

export default SelectedPlayer;