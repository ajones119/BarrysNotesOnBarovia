import React from 'react';
import css from "./TextEditor.module.scss"
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import "./editor.css";

declare interface TextEditorProps {
    onChange: (value: string) => void;
    value: string;
    placeholder?: string;
    preview?: "edit" | "live" | "preview";
    height: number;
    hideToolbar?: boolean
}

const TextEditor = ({value, onChange, placeholder = "Please enter Markdown text", preview = "live", height = 200, hideToolbar = false}: TextEditorProps) => {
    return (
        <MDEditor
          data-color-mode='dark'
          value={value}
          onChange={(value) => value ? onChange(value) : onChange("")}
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          textareaProps={{
            placeholder: placeholder
          }}
          preview={preview}
          height={height}
          className={css.editor}
          hideToolbar={hideToolbar}
          
          
        />
    );
}

export default TextEditor;