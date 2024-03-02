import React, { useRef } from "react";
import css from "./FileInput.module.scss"
import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/Button/Button";

type FileInputProps = {
    value?: string | null,
    onChange: (file: File | null) => void
    title: string
}

const FileInput = ({value, onChange, title}: FileInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    let displayValue = value || "Select a file"

    if (displayValue.length > 30) {
        displayValue = displayValue.substring(0, 30) + '...'
    }

    return (
        <div className={css.fileInputWrapper}>
            <label>
                <Button onClick={() => inputRef?.current?.click()} color="light">{title}</Button>
                <Typography color="light" size="caption">{displayValue}</Typography>
            <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                onChange={(event) => event?.target?.files ? onChange(event?.target?.files[0]) : onChange(null)}
                className={css.fileInput}
                ref={inputRef}
            />
            </label>
        </div>
    );
}

export default FileInput;