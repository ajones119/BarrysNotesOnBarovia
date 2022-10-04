import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import "../../App.css";
import CharactersList from "../../components/CharactersList/CharactersList";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import NewCharacterForm from "../../components/NewCharacterForm/NewCharacterForm";
import { getCharacters } from "../../service/CharacterService";

export const Characters = () => {
  const [characters, setCharacters] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
              <Button variant="success" onClick={handleShow}>
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
        <CreateModal
          title="Create Campaign"
          handleClose={handleClose}
          show={show}
          content={<NewCharacterForm handleModalSave={handleClose} />}
        />
      </div>
    </div>
  );
};

export default Characters;
