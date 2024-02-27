import { Validator } from "./Validator";

export type Note = {
    docId?: string,
    characterDocId?: string,
    campaignDocId?: string,
    date?: Date;
    content?: string;
    isGeneratedSummary?: boolean;
}

export const validateNote = (note: Note) => {
    let validator:Validator = {};
    if (!note?.content || note?.content.trim() === "") {
      validator.content = "Empty Content"
    }
  
    return validator;
}