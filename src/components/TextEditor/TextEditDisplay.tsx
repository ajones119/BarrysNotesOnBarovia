import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import "./editor.css"
import css from "./TextEditor.module.scss"
declare interface TextEditorDisplayProps {
    value: string;
    light?: boolean;
}

const TextEditorDisplay = ({value, light = false}: TextEditorDisplayProps) => {
    return (
        <div data-color-mode={light ? "light" : "dark"}>
            <div className={css.editor}>
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    );
}

export default TextEditorDisplay;