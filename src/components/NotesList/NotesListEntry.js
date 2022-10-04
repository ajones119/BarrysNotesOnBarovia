import { Button, ListGroup } from "react-bootstrap";
import { MdDeleteForever } from "react-icons/md";
import { deleteNote } from "../../service/NoteService";

const getColor = (className) => {
  let returnString = "#000000";
  if (className === "Artificer") {
    returnString = "#05ffea";
  } else if (className === "Barbarian") {
    returnString = "#ff0d0d";
  } else if (className === "Bard") {
    returnString = "#eeff00";
  } else if (className === "Blood Hunter") {
    returnString = "#780000";
  } else if (className === "Cleric") {
    returnString = "#ffffff";
  } else if (className === "Druid") {
    returnString = "#2f991f";
  } else if (className === "Fighter") {
    returnString = "#cf6f08";
  } else if (className === "Monk") {
    returnString = "#3386f2";
  } else if (className === "Monk") {
    returnString = "#3386f2";
  } else if (className === "Paladin") {
    returnString = "#8c8f8f";
  } else if (className === "Ranger") {
    returnString = "#016310";
  } else if (className === "Rogue") {
    returnString = "#3b3d3b";
  } else if (className === "Sorcerer") {
    returnString = "#8f0152";
  } else if (className === "Warlock") {
    returnString = "#790080";
  } else if (className === "Wizard") {
    returnString = "#110080";
  }

  return returnString;
};

export const NotesListEntry = ({ note, auxName, charClassName }) => {
  const handleDeleteNote = () => {
    deleteNote(note.docId);
  };

  return (
    <div>
      <ListGroup.Item
        style={{
          borderColor: "#110080",
          borderWidth: "3px",
          borderRadius: "5px",
          marginBottom: "3px",
          borderColor: `${getColor(charClassName)}`,
        }}
      >
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
