import { ListGroup } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
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

export const NotesList = ({ notes = [], characters = [] }) => {
  return (
    <div>
      <Container>
        <ListGroup variant="flush">
          {notes.map((note) => (
            <Col>
              <NotesListEntry
                note={note}
                auxName={
                  characters && notes
                    ? getCharacterNameForNote(note, characters)
                    : ""
                }
              />
            </Col>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default NotesList;
