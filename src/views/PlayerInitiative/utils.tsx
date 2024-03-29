import { faFaceAngry, faFaceDizzy, faFaceFrownOpen, faFaceGrimace, faFaceGrin, faFaceLaughBeam, faFaceSadCry, faSkull } from "@fortawesome/free-solid-svg-icons";
import { CombatCharacter } from "@model/CombatCharacter";
import { CONDITION_OPTIONS, Condition } from "@components/ConditionsSelect/ConditionsSelect";

export const getIconList = (character: CombatCharacter): Condition[] => {
    const icons: Condition[] = [];
    const { conditions = [] } = character;

    CONDITION_OPTIONS.forEach((condition) => conditions.includes(condition.value) && icons.push(condition) )

    return icons;
}

export const getHealthIcon = (percent: number) => {
    if (percent > 90) return faFaceLaughBeam
    else if (percent > 80) return faFaceGrin
    else if (percent > 40) return faFaceAngry
    else if (percent > 30) return faFaceGrimace
    else if (percent > 20) return faFaceFrownOpen
    else if (percent > 10) return faFaceSadCry
    else if (percent > 0) return faFaceDizzy
    else return faSkull
}