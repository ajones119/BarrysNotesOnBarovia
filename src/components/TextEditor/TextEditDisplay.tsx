import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import "./editor.css"

declare interface TextEditorDisplayProps {
    value: string;
    light?: boolean;
}

const TextEditorDisplay = ({value, light = false}: TextEditorDisplayProps) => {
    return (
        <div data-color-mode={light ? "light" : "dark"}>
            <div className="test">
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    );
}

export default TextEditorDisplay;