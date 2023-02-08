import { useState, useEffect } from "react";
import {
  Card,
  Container,
  Button,
  Collapse,
  ButtonGroup,
} from "react-bootstrap";
import defaultBackground from "../../images/stick1.png";
import { NPC } from "../../model/NPC";
import { deleteNPC } from "../../service/NPCService";
import { openNewTab } from "../../service/SharedFunctions";

import "./NPCList.css";

const style = {
  paddingBottom: "20px",
  display: "block",
  marginRight: "auto",
  marginLeft: "auto",
};

const textStyle = {
  color: "black",
};

declare interface NPCListEntryProps {
  npc: NPC
  width: number
}

export const NPCListEntry = ({ npc, width=500 } : NPCListEntryProps) => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const textElement = document.getElementById(`${npc.docId}backstory`);
    const imageElement = document.getElementById(`${npc.docId}Image`);

    if (textElement && imageElement) {
      let height = imageElement?.offsetHeight;

      if (height) {
        textElement.style.paddingBottom = `${height/4}px`;
      }
    }
  },[npc, clicked])

  return (
    <div className={`npc-list-entry ${clicked ? "clicked" : ""}`} onClick={() => setClicked(!clicked)} id={npc.docId} >
      <img id={`${npc.docId}Image`} src={npc.characterImageURL ? npc.characterImageURL : defaultBackground} alt="npc background"/>
        <h4>
          {npc.name}{" "}
          <div className={`${clicked ? "delete-button" : "delete-button-hidden"}`}>
            <Button
              variant="danger"
              onClick={() => deleteNPC(npc.docId)}
            >
              Delete
            </Button>
          </div>
        </h4>
      <p id={`${npc.docId}backstory`}>
        {npc.backstory}
      </p>
    </div>
  );
};

export default NPCListEntry;
