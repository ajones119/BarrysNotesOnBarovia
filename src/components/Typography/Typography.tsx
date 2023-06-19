import React from 'react';
import css from "./Typography.module.scss"

declare interface TypographyProps {
    children: React.ReactNode;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default"
    size?: "default" | "caption" | "small" | "large" | "xtraLarge"
    weight?: "default" | "bolder" | "bold"

    className?: string,
    style?: any
}

export const Typography = ({ color = "light", children, size = 'default', weight = 'default', className = "", style = {} }: TypographyProps) => {
    return (
        <div style={style} className={`${css.typography} ${css[color]} ${css[size]} ${css[weight]}  ${className}`}>{children}</div>
    );
}