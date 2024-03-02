import React from "react";
import css from "./Avatar.module.scss"
import { Condition } from "@components/ConditionsSelect/ConditionsSelect";

type AvatarProps = {
    src: string;
    alt?: string;
    size: number;
    style?: React.CSSProperties,
    className?: string;
    conditions?: Condition[];

}

const Avatar = ({src, size, style, className, conditions, alt}: AvatarProps) => {
    return <img
        src={src}
        className={`${css.avatar} ${className}`}
        style={{height: size, width: size, ...style}}
        alt={alt}
    />
}

export default Avatar;