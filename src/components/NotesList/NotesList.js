import React from "react";
import { ListGroup } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import ReactSwitch from "react-switch";
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

const getClassNameForNote = (note, characters = []) => {
  let className = "";
  characters.forEach((character) => {
    if (character.docId === note.characterDocId) {
      className = character.className;
    }
  });
  return className;
};

export const NotesList = ({ notes = [], characters = [] }) => {
  const [reverseOrder, setReverseOrder] = React.useState(false);
  return (
    <div>
      <Container>
        Reverse Order
        <ReactSwitch
          checked={reverseOrder}
          onChange={() => {
            setReverseOrder(!reverseOrder);
          }}
        />
        <ListGroup variant="flush">
          {reverseOrder
            ? notes
                .slice(0)
                .reverse()
                .map((note) => (
                  <Col>
                    <NotesListEntry
                      note={note}
                      auxName={
                        characters && notes
                          ? getCharacterNameForNote(note, characters)
                          : ""
                      }
                      charClassName={getClassNameForNote(note, characters)}
                    />
                  </Col>
                ))
            : notes.map((note) => (
                <Col>
                  <NotesListEntry
                    note={note}
                    auxName={
                      characters && notes
                        ? getCharacterNameForNote(note, characters)
                        : ""
                    }
                    charClassName={getClassNameForNote(note, characters)}
                  />
                </Col>
              ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default NotesList;
