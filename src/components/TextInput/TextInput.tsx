import React, { useEffect, useRef, useState } from 'react';
import css from"./TextInput.module.scss"
import { animated, useSpring, useTransition } from '@react-spring/web'

function isValueEmpty(value: any) {
    return value === "" || value === null;
}

declare interface TextInputProps {
    value?: string | number,
    onChange?: (input: string | number) => void
    placeholder?: string
    error?: string | boolean,
    className?: string,
    number?: boolean
    disabled?: boolean;
    max?: number,
    step?: string,
}

export const TextInput = ({
    value = "",
    onChange,
    placeholder,
    error = false,
    className,
    number = false,
    disabled = false,
    max,
    step
}: TextInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const hasNoValue = (value: string | number | null) => (value === "" || value === null)

    const spring = useSpring({
            y: hasNoValue(value) ? -24 : 0,
            scale: hasNoValue(value) ? 1 : 0.8,
    })

    const handleChange = (value: string | number) => {
        onChange && onChange(value);
    }

    return(
        <div onClick={() => inputRef.current?.focus()} className={`${error && css.error}`}>
            <input
                ref={inputRef}
                type={number ? "number" : "text"}
                value={value || ""}
                onChange={e => handleChange(e.target.value || "")}
                className={`${css.textInput} ${className} ${error && css.errorTextInput} ${isValueEmpty(value) && css.inactive}`}
                style={{width: '100%'}}
                disabled={disabled}
                onScroll={(e) => e.preventDefault()}
                max={max}
                step={step}
            />
            <animated.div style={{...spring}} className={`${css.placeholder}`}>
                {placeholder}
            </animated.div>
        </div>
    )
}