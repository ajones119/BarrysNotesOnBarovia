import React from 'react';
import css from "./Button.module.scss"

declare interface ButtonProps {
    onClick: () => void
    children: React.ReactNode;
    disabled?: boolean;
    neon?: boolean;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default" | "secondary";
    size?: "small" | "default" | "large";
}

export const Button = ({ onClick, children, disabled = false, neon = false, color = "default", size = "default" }: ButtonProps) => {
    return (
        <button onClick={onClick} className={`${css.button} ${neon && css.neon} ${css[color]} ${css[size]} `} disabled={disabled}>
            {children}
        </button>
    );
};