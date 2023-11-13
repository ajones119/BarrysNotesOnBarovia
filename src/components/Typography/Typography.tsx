import React from 'react';
import css from "./Typography.module.scss"

declare interface TypographyProps {
    children: React.ReactNode;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default"
    size?: "default" | "caption" | "small" | "large" | "xtraLarge"
    weight?: "default" | "bolder" | "bold"
    underline?: boolean,
    className?: string,
    style?: any
}

export const Typography = ({
    color = "light",
    children,
    size = 'default',
    weight = 'default',
    underline = false,
    className = "",
    style = {}
}: TypographyProps) => {
    return (
        <div style={style} className={`${css.typography} ${css[color]} ${css[size]} ${css[weight]} ${underline ? css.underline : ""} ${className}`}>{children}</div>
    );
}