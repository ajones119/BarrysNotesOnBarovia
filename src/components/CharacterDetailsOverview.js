import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import defaultBackground from "../images/stick1.png";

export const CharacterDetailsOverview = ({ character }) => {
  return (
    <Container>
      <Card.Img
        variant="top"
        src={character ? character.characterImageURL : ""}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = defaultBackground;
        }}
      />
      <Card.Text>
        {character
          ? character.backstory
          : "Dont know much about it... seems cool though"}
      </Card.Text>
      <Card.Text>
        played By {character ? character.player : "An Elder God"}
      </Card.Text>
      <Button
        variant="danger"
        href={character ? character.dndBeyondURL : ""}
        disabled={!(character && character.dndBeyondURL)}
      >
        DND BEYOND
      </Button>
    </Container>
  );
};

export default CharacterDetailsOverview;
