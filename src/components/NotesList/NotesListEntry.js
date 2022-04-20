import { Button, ListGroup } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { deleteNote } from "../../service/NoteService";

export const NotesListEntry = ({ note, auxName }) => {
  const handleDeleteNote = () => {
    deleteNote(note.docId);
  };

  return (
    <div>
      <ListGroup.Item>
        <p>{note.content}</p>
        <p>
          {auxName + " - "}
          {new Date(note.date.seconds * 1000).toDateString() + " "}
          {new Date(note.date.seconds * 1000).toLocaleTimeString()}
        </p>
        <Button variant="outline-danger" onClick={handleDeleteNote}>
          <MdDeleteForever />
        </Button>
      </ListGroup.Item>
    </div>
  );
};

export default NotesListEntry;
