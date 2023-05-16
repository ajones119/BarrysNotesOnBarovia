import React from 'react';
import css from "./Typography.module.scss"

declare interface TypographyProps {
    children: React.ReactNode;
    color?: "success" | "light" | "dark" | "error" | "primary" | "default"
    size?: "default" | "caption"
    className?: string,
    style?: any
}

export const Typography = ({ color = "light", children, size = 'default', className = "", style = {} }: TypographyProps) => {
    return (
        <div style={style} className={`${css.typography} ${css[color]} ${css[size]} ${className}`}>{children}</div>
    );
}