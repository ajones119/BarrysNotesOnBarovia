import React from 'react';
import css from"./TextInput.module.scss"

function isValueEmpty(value: any) {
    return value === "" || value === null;
}

declare interface TextInputProps {
    value?: string | number | null,
    onChange?: (input: string) => void
    placeholder?: string
    error?: boolean,
    className?: string,
    number?: boolean
}

export const TextInput = ({
    value = "",
    onChange,
    placeholder,
    error = false,
    className,
    number = false
}: TextInputProps) => {
    return(
        <div className={`${error && css.error}`}>
            <input
                type={number ? "number" : "text"}
                value={value === null ? "" : value}
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