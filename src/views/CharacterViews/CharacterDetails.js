import React, { useEffect } from "react";
import { Card, Nav, Tab } from "react-bootstrap";
import { Button, Row, Col, Container, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../../App.css";
import CharacterDetailsOverview from "../../components/CharacterDetailsOverview";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import NewNoteForm from "../../components/NewNoteForm/NewNoteForm";
import NotesList from "../../components/NotesList/NotesList";
import { getCampaignDetailsByDocId } from "../../service/CampaignService";
import {
  getCharacterDetailsByDocId,
  getCharactersByCampaignDocId,
} from "../../service/CharacterService";
import {
  getNotesByCampaignDocId,
  getNotesByCharacterDocId,
} from "../../service/NoteService";

const cardStyle = { marginTop: "20px" };
const buttonStyle = { marginTop: "5px", marginBottom: "5px" };

export const CharacterDetails = () => {
  const [character, setCharacterDetails] = React.useState();
  const [characters, setCharacters] = React.useState();
  const [campaign, setCampaignDetails] = React.useState();
  const [personalNotes, setPersonalNotes] = React.useState();
  const [campaignNotes, setCampaignNotes] = React.useState();
  const [newNoteOpen, setNewNoteOpen] = React.useState(false);
  const [newPersonalNoteOpen, setPersonalNewNoteOpen] = React.useState(false);
  const { Id: docId } = useParams();

  useEffect(() => {
    getCharacterDetailsByDocId(docId, setCharacterDetails);
  }, []);

  useEffect(() => {
    if (character && character.campaignDocId !== "") {
      getCampaignDetailsByDocId(character.campaignDocId, setCampaignDetails);
    }
  }, [character]);

  useEffect(() => {
    if (character) {
      getNotesByCharacterDocId(docId, setPersonalNotes);
    }
  }, [character, docId]);

  useEffect(() => {
    if (character) {
      getNotesByCampaignDocId(character.campaignDocId, setCampaignNotes);
    }
  }, [character, docId]);

  useEffect(() => {
    if (character) {
      getCharactersByCampaignDocId(character.campaignDocId, setCharacters);
    }
  }, [character, docId]);

  return (
    <div className="App">
      <div className="content">
        <Container>
          <Card style={cardStyle}>
            <Card.Header as="h3">{character ? character.name : ""}</Card.Header>
            <Tab.Container id="left-tabs-example" defaultActiveKey="basicInfo">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="basicInfo">Basic Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="personalNotes">
                        Personal Notes
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="campaignlNotes">
                        Campaign Notes
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="basicInfo">
                      <CharacterDetailsOverview character={character} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="personalNotes">
                      <Button
                        onClick={() => setPersonalNewNoteOpen(true)}
                        aria-controls="example-collapse-text"
                        aria-expanded={newNoteOpen}
                        style={buttonStyle}
                      >
                        {newNoteOpen ? "Close" : "Add a New Note"}
                      </Button>
                      <NotesList
                        notes={personalNotes}
                        characters={[character]}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="campaignlNotes">
                      <Button
                        onClick={() => setNewNoteOpen(!newNoteOpen)}
                        aria-controls="example-collapse-text"
                        aria-expanded={newNoteOpen}
                        style={buttonStyle}
                        disabled={
                          character && character.campaignDocId !== ""
                            ? false
                            : true
                        }
                      >
                        {newNoteOpen ? "Close" : "Add a New Note"}
                      </Button>
                      <NotesList
                        notes={campaignNotes}
                        characters={characters}
                      />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Card>
        </Container>
        <CreateModal
          title="New Personal Note"
          handleClose={() => setPersonalNewNoteOpen(false)}
          show={newPersonalNoteOpen}
          content={
            <NewNoteForm
              character={character}
              isPersonal
              handleModalSave={() => setPersonalNewNoteOpen(false)}
            />
          }
        />
        <CreateModal
          title="New Party Note"
          handleClose={() => setNewNoteOpen(false)}
          show={newNoteOpen}
          content={
            <NewNoteForm
              character={character}
              isCampaign
              handleModalSave={() => setNewNoteOpen(false)}
            />
          }
        />
      </div>
    </div>
  );
};

export default CharacterDetails;

//<NewNoteForm character={character} />
