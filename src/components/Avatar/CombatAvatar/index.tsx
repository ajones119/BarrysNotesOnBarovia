import React from "react";
import css from "../Avatar.module.scss"
import { Condition } from "@components/ConditionsSelect/ConditionsSelect";
import { CombatCharacter } from "@model/CombatCharacter";

type CombatAvatarProps = {
    src: CombatCharacter;
    alt?: string;
    size: number;
    style?: React.CSSProperties,
    className?: string;
    conditions?: Condition[];

}

const CombatAvatar = ({src, size, style, className, conditions, alt}: CombatAvatarProps) => {
    return <img
        src={"none"}
        className={`${css.avatar} ${className}`}
        style={{height: size, width: size, ...style}}
        alt={alt}
    />
}

export default CombatAvatar;