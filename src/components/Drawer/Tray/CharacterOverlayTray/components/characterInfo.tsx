import { useCharacter, useEditPlayerCharacter } from "@services/CharacterService";
import css from "../CharacterOverlayTray.module.scss"
import React from "react";
import { TextInput } from "@components/TextInput/TextInput";
import ConditionSelect from "@components/ConditionsSelect/ConditionsSelect";
import Spinner from "@components/Spinner";

type characterInfoTabProps = {
    id: string,
}

const CharacterInfoTab = ({id}: characterInfoTabProps) => {
    const {character, isLoading} = useCharacter(id)
    const {mutate: editCharacter} = useEditPlayerCharacter(() => {});

    return isLoading ? <Spinner /> : (
        <div className={css.infoContainer}>
            <div className={css.textInputs}>
                <TextInput placeholder="Health" number value={character.health} onChange={(value) => editCharacter({docId: id, health: Number(value)})}  />
                <TextInput placeholder="Max Health" number value={character.maxHealth} onChange={(value) => editCharacter({docId: id, maxHealth: Number(value)})}  />
                <TextInput placeholder="Temp" number value={character.tempHealth} onChange={(value) => editCharacter({docId: id, tempHealth: Number(value)})}  />
            </div>
            <ConditionSelect selectedValue={character?.conditions || []} onChange={(value) => editCharacter({docId: id, conditions: value || []})} icons />
        </div>
    );
};

export default CharacterInfoTab;