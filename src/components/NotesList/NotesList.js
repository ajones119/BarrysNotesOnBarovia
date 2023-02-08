import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import ReactSwitch from "react-switch";
import { Character } from "../../model/Character";
import { CreateModal } from "../CreateModal/CreateModal";
import NewNoteForm from "../NewNoteForm/NewNoteForm";
import NotesListEntry from "./NotesListEntry";

const getCharacterNameForNote = (note, characters = []) => {
  let charName = "anonymous";
  characters.forEach((character) => {
    if (character.docId === note.characterDocId) {
      charName = character.name;
    } else if (note.isDungeonMaster) {
      charName = "Dungeon Master";
    }
  });
  return charName;
};

const getCharacterForNote = (note, characters = []) => {
  let f_character = new Character();
  characters.forEach((character) => {
    if (character.docId === note.characterDocId) {
      f_character = character;
    }
  });
  return f_character;
};

export const NotesList = ({ isDungeonMaster = false, campaign, notes = [], characters = [] }) => {
  const [reverseOrder, setReverseOrder] = React.useState(false);
  const [newNoteOpen, setNewNoteOpen] = React.useState(false);

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <Button
            variant="success"
            onClick={() => {
              setNewNoteOpen(true);
            }}
          >
            Add Note <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <p style={{ color: "white" }}>Reverse Order</p>
          <ReactSwitch
            checked={reverseOrder}
            onChange={() => {
              setReverseOrder(!reverseOrder);
            }}
          />
        </Grid>
      </Grid>
      <List
        sx={{
          width: "100%",
          maxWidth: "100%",
          bgcolor: "background.paper",
        }}
      >
        {reverseOrder
          ? notes
              .slice(0)
              .reverse()
              .map((note) => (
                <Col>
                  <NotesListEntry
                    note={note}
                    character={getCharacterForNote(note, characters)}
                  />
                </Col>
              ))
          : notes.map((note) => (
              <Col>
                <NotesListEntry
                  note={note}
                  character={getCharacterForNote(note, characters)}
                />
              </Col>
            ))}
      </List>
      <CreateModal
        title="New Note"
        handleClose={() => {
          setNewNoteOpen(false);
        }}
        show={newNoteOpen}
        content={
          <NewNoteForm
            isDungeonMaster={isDungeonMaster}
            isCampaign={!isDungeonMaster}
            handleModalSave={() => {
              setNewNoteOpen(false);
            }}
            campaign={campaign}
          />
        }
      />
    </div>
  );
};

export default NotesList;
