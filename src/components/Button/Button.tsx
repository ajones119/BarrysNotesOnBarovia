import React from 'react';
import css from "./Button.module.scss"
import Boop from '../AnimationComponentWrappers/Boop';

export declare interface ButtonProps {
    onClick?: () => void
    children: React.ReactNode;
    disabled?: boolean;
    animatedHover?: boolean;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default" | "secondary";
    borderColor?: "success" | "light" | "dark" | "error" | "primary" | "default" | "secondary";
    size?: "small" | "default" | "large";
    hollow?: boolean;
    round?: boolean;
}

export const Button = ({ onClick, children, disabled = false, animatedHover = false, borderColor = "default", hollow = false, color = "default", size = "default" }: ButtonProps) => {

    return (
        <Boop rotation={1} disabled={!animatedHover || disabled}>
            <button onClick={onClick} className={`${css.button} ${animatedHover && css.animatedHover} ${css[color]} ${css[`borderColor-${borderColor}`]}  ${css[size]} ${hollow && css.hollow}`} disabled={disabled}>
                {children}
            </button>
        </Boop>
    );
};