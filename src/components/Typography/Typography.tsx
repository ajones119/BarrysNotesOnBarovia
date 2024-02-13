import React from 'react';
import css from "./Typography.module.scss"

declare interface TypographyProps {
    children: React.ReactNode;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default" | "tertiary"
    size?: "default" | "caption" | "small" | "large" | "xtraLarge" | "xx-large"
    weight?: "default" | "bolder" | "bold"
    fontStyle?: "default" | "rough" | "block" | "secondary" | "primary"
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
    fontStyle="default",
    style = {}
}: TypographyProps) => {
    return (
        <div style={style} className={`
            ${css.typography}
            ${css[color]}
            ${css[size]}
            ${css[weight]}
            ${css[fontStyle]}
            ${underline ? css.underline : ""}
            ${className}
        `}>{children}</div>
    );
}