import { faBrain, faPersonWalkingWithCane } from "@fortawesome/free-solid-svg-icons";
import { CombatCharacter } from "../../model/CombatCharacter";
import { CONDITION_OPTIONS } from "../DMInitiative/components/ConditionSelect";

export const getIconList = (character: CombatCharacter) => {
    const icons = [];

    const { conditions = [] } = character;

    if (character?.isConcentrating) {
        icons.push({icon: faBrain, label: "Concentration"})
    }

    CONDITION_OPTIONS.forEach(({value, icon, label}) => conditions.includes(value) && icons.push({icon, label}) )

    return icons;
}