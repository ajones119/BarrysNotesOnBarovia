import React, { useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import "../../App.css";
import CharactersList from "../../components/CharactersList/CharactersList";
import { getCharacters } from "../../service/CharacterService";

export const Characters = () => {
  const [characters, setCharacters] = React.useState();

  useEffect(() => {
    getCharacters(setCharacters);
  }, []);

  return (
    <div className="App">
      <div className="content">
        <h1> Characters </h1>
        <Container>
          <Row>
            <Col>
              <Button
                variant="success"
                href="/BarrysNotesOnBarovia/#/Characters/new-character"
              >
                Create a New Character
              </Button>
            </Col>
            <Row>
              <Col>
                <CharactersList characters={characters} />
              </Col>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Characters;
