import React from "react";
import { Button, Col, Collapse, Container, Row } from "react-bootstrap";
import { InitiativeCharacter } from "../../model/InitiativeCharacter";
import TextInput from "../FormInputs/TextInput";

const style = { marginTop: "10px", marginBottom: "10px" };

export const AddInitiativeCharacterDropdown = ({
  isDropdownOpen,
  initiativeCharacters,
  setIsDropdownOpen,
}) => {
  const [name, setName] = React.useState("");
  const [initiative, setInitiative] = React.useState("");
  const [maxHp, setMaxHp] = React.useState(0);
  const [armorClass, setArmorClass] = React.useState("");
  const [conditions, setConditions] = React.useState([]);
  const [imageUrl, setImageUrl] = React.useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    const newCharacter = new InitiativeCharacter(
      name,
      initiative,
      maxHp,
      maxHp,
      armorClass,
      conditions,
      imageUrl
    );

    initiativeCharacters.push(newCharacter);

    setName("");
    setInitiative("");
    setMaxHp(0);
    setArmorClass("");
    setConditions([]);
    setImageUrl("");

    setIsDropdownOpen(false);
  };

  return (
    <Collapse in={isDropdownOpen}>
      <Container>
        <form style={style}>
          <Row>
            <Col>
              <TextInput
                setTextFromParent={setName}
                title="Name"
                invalidInputText={""}
                isValidText={true}
                size={30}
              />
            </Col>
            <Col>
              <TextInput
                setTextFromParent={setInitiative}
                title="Initiative"
                invalidInputText={""}
                isValidText={true}
                size={5}
              />
            </Col>
            <Col>
              <TextInput
                setTextFromParent={setMaxHp}
                title="Max HP"
                invalidInputText={""}
                isValidText={true}
                size={5}
              />
            </Col>
          </Row>
          <Button
            variant="success"
            type="submit"
            style={style}
            onClick={handleAdd}
          >
            Add Character
          </Button>
        </form>
      </Container>
    </Collapse>
  );
};

export default AddInitiativeCharacterDropdown;
