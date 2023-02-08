import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Campaign } from "../../model/Campaign";
import { Character } from "../../model/Character";
import { getCampaigns, saveNewCampaign } from "../../service/CampaignService";
import {
  getCharacterDetailsByDocId,
  saveNewCharacter,
  updateCharacter,
} from "../../service/CharacterService";
import TextArea from "../FormInputs/TextArea";
import TextInput from "../FormInputs/TextInput";
import { validateTextInputIsNotEmpty } from "../FormInputs/Validators";
import MainClassSelector from "./MainClassSelector";

const selectStyle = { marginTop: "20px" };

export const getOptions = (campaigns) =>
  campaigns.map((campaign) => {
    return <option value={campaign.docId}>{campaign.title}</option>;
  });

export const NewCharacterForm = ({
  forEdit = false,
  docId,
  handleModalSave,
}) => {
  const INVALID_CHARACTER_NAME_TEXT = "Must be a valid Character Name";
  const INVALID_PLAYER_TEXT = "Must be a valid Player Name";

  const [campaigns, setCampaigns] = React.useState();
  const [characterName, setCharacterName] = React.useState("");
  const [ischaracterNameValid, setIsCharacterNameValid] = React.useState(true);
  const [player, setPlayer] = React.useState("");
  const [isPlayerValid, setIsPlayerValid] = React.useState(true);
  const [characterImageURL, setCharacterImageURL] = React.useState("");
  const [dndBeyondURL, setDndBeyondURL] = React.useState("");
  const [backstory, setBackstory] = React.useState("");
  const [character, setCharacter] = React.useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (docId && forEdit) {
      getCharacterDetailsByDocId(docId, setCharacter);
    }
  }, [docId]);

  useEffect(() => {
    if (character.docId && forEdit) {
      setCharacterName(character.name);
      setPlayer(character.player);
      setCharacterImageURL(character.characterImageURL);
      setDndBeyondURL(character.dndBeyondURL);
      setBackstory(character.backstory);
    }
  }, [character]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const campaignDocId = document.getElementById("campaignDocId").value;
    const mainClass = document.getElementById("mainClass").value;
    //const valid = validateNewCampaignForm();

    if (true) {
      let newCharacter = new Character(
        docId ? docId : "",
        characterName,
        characterImageURL,
        player,
        backstory,
        mainClass,
        campaignDocId,
        dndBeyondURL
      );
      if (docId && forEdit) {
        updateCharacter(newCharacter).then(() => {
          navigate("/Characters/");
        });
      } else {
        saveNewCharacter(newCharacter).then(() => {
          navigate("/Characters/");
        });
      }
      handleModalSave();
    }
  };

  useEffect(() => {
    getCampaigns(setCampaigns);
  }, []);

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Row>
          <Col>
            <TextInput
              setTextFromParent={setCharacterName}
              title="Character Name"
              invalidInputText={INVALID_CHARACTER_NAME_TEXT}
              isValidText={ischaracterNameValid}
              defaultValue={character ? character.name : ""}
              value={characterName}
            />
          </Col>
          <Col>
            <TextInput
              setTextFromParent={setCharacterImageURL}
              title="Character ImageURL"
              invalidInputText=""
              isValidText={true}
              defaultValue={character ? character.characterImageURL : ""}
              value={characterImageURL}
            />
          </Col>
          <Col>
            <TextInput
              setTextFromParent={setPlayer}
              title="Player"
              invalidInputText={INVALID_PLAYER_TEXT}
              isValidText={isPlayerValid}
              defaultValue={character ? character.player : ""}
              value={player}
            />
          </Col>
          <Col>
            <TextInput
              setTextFromParent={setDndBeyondURL}
              title="DnD Beyond Link"
              invalidInputText={""}
              isValidText={true}
              defaultValue={character ? character.dndBeyondURL : ""}
              value={dndBeyondURL}
            />
          </Col>
        </Row>
        <Row style={selectStyle}>
          <Col>
            <h4>Campaign</h4>
            <select id="campaignDocId">
              <option value=""></option>
              {campaigns && getOptions(campaigns)}
            </select>
          </Col>
          <Col>
            <MainClassSelector />
          </Col>
        </Row>
        <Row>
          <TextArea
            setTextFromParent={setBackstory}
            title="Backstory"
            rows="5"
            cols="100"
            invalidInputText=""
            isValidText={true}
            defaultValue={character ? character.backstory : ""}
            value={backstory}
          />
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="submit" style={selectStyle}>
              Save Character
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default NewCharacterForm;
