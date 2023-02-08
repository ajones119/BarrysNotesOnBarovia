import { useState } from "react";
import {
  Card,
  Container,
  Button,
  Collapse,
  ButtonGroup,
} from "react-bootstrap";
import defaultBackground from "../../images/stick1.png";
import { CreateModal } from "../CreateModal/CreateModal";
import NewCharacterForm from "../NewCharacterForm/NewCharacterForm";
import { useNavigate } from "react-router-dom";

const style = {
  paddingBottom: "20px",
  display: "block",
  marginRight: "auto",
  marginLeft: "auto",
};

const textStyle = {
  color: "black",
};

const getColor = (className: string) => {
  let returnString = "#ffffff";
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

export const CharactersListEntry = ({ character }: any) => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div style={style}>
      <Container>
        <Button variant="outline-dark" onClick={() => setOpen(!open)}>
          <Card
            style={{
              width: "100%",
              backgroundColor: `${getColor(character.className)}`,
            }}
          >
            <Card.Img
              variant="top"
              src={character.characterImageURL}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultBackground;
              }}
            />
            <Card.Body>
              <Card.Title style={textStyle}>{character.name}</Card.Title>
            </Card.Body>
            <Collapse in={open}>
              <div>
                <Card body style={textStyle}>
                  <ButtonGroup>
                    <Button variant="warning" onClick={handleShow}>
                      Edit the Basics
                    </Button>
                    <Button
                      variant="primary"
                      onClick={ () => navigate(
                        "/Characters/" + character.docId
                        )
                      }
                    >
                      View Details
                    </Button>
                  </ButtonGroup>
                </Card>
              </div>
            </Collapse>
          </Card>
        </Button>
      </Container>
      <CreateModal
        title="Edit Character"
        handleClose={handleClose}
        show={show}
        content={
          <NewCharacterForm
            docId={character.docId}
            forEdit
            handleModalSave={handleClose}
          />
        }
      />
    </div>
  );
};

export default CharactersListEntry;
