import React, { useEffect } from "react";
import { Collapse } from "react-bootstrap";
import { Button, Row, Col, Container, Tab, Nav, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../../App.css";
import CampaignDetailsOverview from "../../components/CampaignDetailsOverview";
import CharactersList from "../../components/CharactersList/CharactersList";
import InitiativeTracker from "../../components/InitiativeTracker/InitiativeTracker";
import NewNoteForm from "../../components/NewNoteForm/NewNoteForm";
import NewNpcForm from "../../components/NewNpcForm/NewNpcForm";
import NotesList from "../../components/NotesList/NotesList.js";
import NPCList from "../../components/NPCList/NPCList";

import { getCampaignDetailsByDocId } from "../../service/CampaignService";
import { getCharactersByCampaignDocId } from "../../service/CharacterService";
import { getNotesByCampaignDocId } from "../../service/NoteService";
import { getNPCsByCampaignDocId } from "../../service/NPCService";

const cardStyle = { marginTop: "20px" };
const buttonStyle = { marginTop: "5px", marginBottom: "5px" };

export const CampaignDetails = () => {
  const [campaign, setCampaignDetails] = React.useState();
  const [characters, setCharacters] = React.useState([]);
  const [npcs, setNpcs] = React.useState([]);
  const [notes, setNotes] = React.useState([]);
  const [newNoteOpen, setNewNoteOpen] = React.useState(false);
  const [newNPCOpen, setNewNPCOpen] = React.useState(false);
  const [dungeonMasterNotes, setDungeonMasterNotes] = React.useState([]);
  const [newDungeonMasterNoteOpen, setNewDungeonMasterNoteOpen] =
    React.useState(false);
  const { Id: docId } = useParams();

  useEffect(() => {
    getCampaignDetailsByDocId(docId, setCampaignDetails);
  }, []);

  useEffect(() => {
    if (campaign) {
      getCharactersByCampaignDocId(docId, setCharacters);
    }
  }, [campaign, docId]);

  useEffect(() => {
    if (campaign) {
      getNotesByCampaignDocId(docId, setNotes);
    }
  }, [campaign, docId]);

  useEffect(() => {
    if (campaign) {
      getNotesByCampaignDocId(docId, setDungeonMasterNotes, true);
    }
  }, [campaign, docId]);

  useEffect(() => {
    if (campaign) {
      getNPCsByCampaignDocId(docId, setNpcs);
    }
  }, [campaign, docId]);

  return (
    <div className="App">
      <div className="content">
        <Container>
          <Card style={cardStyle}>
            <Card.Header as="h3">{campaign ? campaign.title : ""}</Card.Header>
            <Tab.Container id="left-tabs-example" defaultActiveKey="overview">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="overview">Overview</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="character">Characters</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="npcs">NPCs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="notesFromDungeonMaster">
                        Notes From DM
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="notesFromParty">
                        Notes From Party
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="overview">
                      <CampaignDetailsOverview campaign={campaign} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="character">
                      <CharactersList characters={characters} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="npcs">
                      <Button
                        onClick={() => setNewNPCOpen(!newNPCOpen)}
                        aria-controls="example-collapse-text"
                        aria-expanded={newNPCOpen}
                        style={buttonStyle}
                      >
                        {newNPCOpen ? "Close" : "Add a New NPC"}
                      </Button>
                      <Collapse in={newNPCOpen}>
                        <div>
                          <NewNpcForm campaign={campaign} />
                        </div>
                      </Collapse>
                      <NPCList npcs={npcs} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="notesFromDungeonMaster">
                      <Button
                        onClick={() =>
                          setNewDungeonMasterNoteOpen(!newDungeonMasterNoteOpen)
                        }
                        aria-controls="example-collapse-text"
                        aria-expanded={newDungeonMasterNoteOpen}
                        style={buttonStyle}
                      >
                        {newDungeonMasterNoteOpen ? "Close" : "Add a New Note"}
                      </Button>
                      <Collapse in={newDungeonMasterNoteOpen}>
                        <div>
                          <NewNoteForm campaign={campaign} isDungeonMaster />
                        </div>
                      </Collapse>
                      <NotesList
                        notes={dungeonMasterNotes}
                        characters={characters}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="notesFromParty">
                      <Button
                        onClick={() => setNewNoteOpen(!newNoteOpen)}
                        aria-controls="example-collapse-text"
                        aria-expanded={newNoteOpen}
                        style={buttonStyle}
                      >
                        {newNoteOpen ? "Close" : "Add a New Note"}
                      </Button>
                      <Collapse in={newNoteOpen}>
                        <div>
                          <NewNoteForm campaign={campaign} isCampaign />
                        </div>
                      </Collapse>
                      <NotesList notes={notes} characters={characters} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="initiativeTracker">INCOMPLETE</Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default CampaignDetails;
