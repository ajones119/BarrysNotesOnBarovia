import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { Character } from "../../model/Character";
import { Note } from "../../model/Note";
import { deleteNote } from "../../service/NoteService";
import DmSeal from "../../images/dm-seal.jpg"

const getColor = (className: string) => {
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

declare interface NotesListProps {
  note: Note,
  character: Character
}

export const NotesListEntry = ({ note, character }: NotesListProps) => {
  const handleDeleteNote = () => {
    deleteNote(note.docId);
  };

  return (
    <div id={note.docId}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={character.characterImageURL || DmSeal} alt={character.name || "DM"}  sx={{ width: 56, height: 56 }}/>
        </ListItemAvatar>
        <ListItemText primary={note.content} secondary={character.name || ""} style={{paddingLeft: '10px'}}/>
        <Button color="error" variant="contained" onClick={handleDeleteNote}>Delete</Button>
      </ListItem>
      <Divider variant="inset" component="li">
        {new Date(note.date.seconds * 1000).toDateString() + " "}
        {new Date(note.date.seconds * 1000).toLocaleTimeString()}
      </Divider>
    </div>
  );
};

export default NotesListEntry;
