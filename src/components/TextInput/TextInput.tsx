import React from 'react';
import css from"./TextInput.module.scss"

function isValueEmpty(value: any) {
    return value === "" || value === null;
}

declare interface TextInputProps {
    value: string
    onChange?: (input: string) => void
    placeholder?: string
    error?: boolean,
    className?: string
}

export const TextInput = ({
    value = "",
    onChange,
    placeholder,
    error = false,
    className
}: TextInputProps) => {
    return(
        <div className={`${error && css.error}`}>
            <input
                type="text"
                value={value}
                onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                placeholder={placeholder}
                className={`${css.textInput} ${className} ${error && css.errorTextInput} ${isValueEmpty(value) && css.inactive}`}
                style={{width: '100%'}}
            />
            <div className={`${css.placeholder} ${isValueEmpty(value) ? css.placeholderInactive : css.placeholderActive}`}>
                {placeholder}
            </div>
        </div>
    )
}