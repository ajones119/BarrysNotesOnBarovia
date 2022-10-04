import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ReactSwitch from "react-switch";
import { Note } from "../../model/Note";
import { NPC } from "../../model/NPC";
import { saveNewNote } from "../../service/NoteService";
import { saveNewNPC } from "../../service/NPCService";
import TextArea from "../FormInputs/TextArea";
import TextInput from "../FormInputs/TextInput";

const style = { marginTop: "5px", marginBottom: "5px" };

export const NewNpcForm = ({ campaign, handleModalSave }) => {
  const INVALID_CONTENT_TEXT = "Must be a valid Content";

  const [name, setName] = React.useState("");
  const [characterImageURL, setCharacterImageUrl] = React.useState("");
  const [backstory, setBackstory] = React.useState("");
  const [statBlockUrl, setStatBlockUrl] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const newNpc = new NPC(
      "",
      name,
      characterImageURL,
      backstory,
      campaign.docId,
      statBlockUrl
    );

    saveNewNPC(newNpc);
    handleModalSave();
    resetData();
  };

  const resetData = () => {
    setName("");
    setCharacterImageUrl("");
    setBackstory("");
    setStatBlockUrl("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextInput
          setTextFromParent={setName}
          title="NPC Name"
          invalidInputText={""}
          isValidText={true}
          value={name}
        />
        <TextInput
          setTextFromParent={setCharacterImageUrl}
          title="NPC Image URL"
          invalidInputText={""}
          isValidText={true}
          value={characterImageURL}
        />
        <TextInput
          setTextFromParent={setStatBlockUrl}
          title="NPCStat Block URL"
          invalidInputText={""}
          isValidText={true}
          value={statBlockUrl}
        />

        <TextArea
          setTextFromParent={setBackstory}
          title="Backstory"
          rows="5"
          cols="100"
          invalidInputText={""}
          isValidText={true}
          value={backstory}
        />
        <Button variant="success" type="submit" style={style}>
          Save NPC
        </Button>
      </form>
    </div>
  );
};

export default NewNpcForm;
