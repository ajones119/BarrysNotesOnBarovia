import React from 'react';
import css from "./TextArea.module.scss"

declare interface TextAreaProps {
    onChange: (value: string) => void;
    value: string;
    rows: number
}

const TextArea = ({value, onChange, rows}: TextAreaProps) => {
    return(
        <div className={css.textArea}>
            <textarea 
                value={value}
                onChange={(event) => onChange(event.target.value)}
                rows={rows}
                className={css.area}
            />
        </div>
    )
}

export default TextArea;