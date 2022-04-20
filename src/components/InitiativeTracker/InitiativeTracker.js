import React, { useEffect } from "react";
import { Button, Container, Row, Table } from "react-bootstrap";
import { InitiativeCharacter } from "../../model/InitiativeCharacter";
import AddInitiativeCharacterDropdown from "./AddInitiativeCharacterDropdown";
import CounterWithInput from "./CounterWithInput";

const style = { color: "red" };

export const InitiativeTracker = ({ characters }) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [initiativeCharacters, setInitiativeCharacters] = React.useState([]);
  const [hasInitialized, setHasInitialized] = React.useState(false);

  useEffect(() => {
    if (!hasInitialized && characters) {
      characters.forEach((character) => {
        let tempInitiativeCharacter = new InitiativeCharacter(
          character.name,
          0,
          0,
          0,
          0,
          [],
          character.characterImageURL
        );
        initiativeCharacters.push(tempInitiativeCharacter);
      });
    }
  }, [characters]);

  return (
    <Container>
      <Button
        variant="success"
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        ADD
      </Button>
      <AddInitiativeCharacterDropdown
        isDropdownOpen={isDropdownOpen}
        initiativeCharacters={initiativeCharacters}
        setIsDropdownOpen={setIsDropdownOpen}
      />
      <Row>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>
                Initiative
                <Button
                  onClick={() => {
                    setInitiativeCharacters(
                      initiativeCharacters.sort((a, b) =>
                        a.initiative > b.initiative ? 1 : -1
                      )
                    );
                  }}
                >
                  Sort
                </Button>
              </th>
              <th>Name</th>
              <th>HP</th>
              <th>AC</th>
            </tr>
          </thead>
          <tbody>
            {initiativeCharacters
              .sort((a, b) => (a.initiative > b.initiative ? 1 : -1))
              .map((initiativeCharacter, index) => (
                <tr>
                  <td>
                    <CounterWithInput
                      value={initiativeCharacter.initiative}
                      original
                      index={index}
                      setValueArray={setInitiativeCharacters}
                    />
                  </td>
                  <td>{initiativeCharacter.name}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default InitiativeTracker;
