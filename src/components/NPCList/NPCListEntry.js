import { useState } from "react";
import {
  Card,
  Container,
  Button,
  Collapse,
  ButtonGroup,
} from "react-bootstrap";
import defaultBackground from "../../images/stick1.png";
import { deleteNPC } from "../../service/NPCService";
import { openNewTab } from "../../service/SharedFunctions";

const style = {
  paddingBottom: "20px",
  display: "block",
  marginRight: "auto",
  marginLeft: "auto",
};

const textStyle = {
  color: "black",
};

export const NPCListEntry = ({ npc }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={style}>
      <Container>
        <Button variant="outline-dark" onClick={() => setOpen(!open)}>
          <Card style={{ width: "100%" }}>
            <Card.Img
              variant="top"
              src={npc.characterImageURL}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultBackground;
              }}
            />
            <Card.Body>
              <Card.Title style={textStyle}>{npc.name}</Card.Title>
            </Card.Body>
            <Collapse in={open}>
              <div>
                <Card body style={textStyle}>
                  <ButtonGroup>
                    <Button
                      variant="success"
                      onClick={() => openNewTab(npc.statBlockURL)}
                      disabled={!npc.statBlockURL || npc.statBlockURL === ""}
                    >
                      Statblock
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => deleteNPC(npc.docId)}
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                  <Card.Body>
                    <p>{npc.backstory}</p>
                  </Card.Body>
                </Card>
              </div>
            </Collapse>
          </Card>
        </Button>
      </Container>
    </div>
  );
};

export default NPCListEntry;
