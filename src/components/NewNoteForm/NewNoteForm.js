import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactSwitch from "react-switch";
import { Note } from "../../model/Note";
import { saveNewNote } from "../../service/NoteService";
import TextArea from "../FormInputs/TextArea";
import TextInput from "../FormInputs/TextInput";

export const NewNoteForm = ({
  character,
  campaign,
  collapse,
  isDungeonMaster,
  isPersonal,
  isCampaign,
}) => {
  const INVALID_CONTENT_TEXT = "Must be a valid Content";

  const [content, setContent] = React.useState();
  const [isContentValid, setIsContentValid] = React.useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const isDungeonMasterNote = isDungeonMaster ? true : false;
    const isPersonalNote = isPersonal ? true : false;
    const isCampaignNote = isCampaign ? true : false;
    //const valid = validateNewCampaignForm();

    if (true) {
      let newNote;
      if (character) {
        newNote = new Note(
          "",
          content,
          character.docId,
          character.campaignDocId,
          date,
          isPersonalNote,
          isCampaignNote,
          isDungeonMasterNote
        );
      } else if (campaign) {
        newNote = new Note(
          "",
          content,
          "",
          campaign.docId,
          date,
          isPersonalNote,
          isCampaignNote,
          isDungeonMasterNote
        );
      }
      saveNewNote(newNote);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextArea
          setTextFromParent={setContent}
          title="Content"
          rows="5"
          cols="100"
          invalidInputText={INVALID_CONTENT_TEXT}
          isValidText={true}
        />
        <Button variant="success" type="submit">
          Save Note
        </Button>
      </form>
    </div>
  );
};

export default NewNoteForm;
