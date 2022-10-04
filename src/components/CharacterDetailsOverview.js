import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import defaultBackground from "../images/stick1.png";
import { openNewTab } from "../service/SharedFunctions";

const style = { marginTop: "5px", marginBottom: "15px" };

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
        onClick={() => openNewTab(character.dndBeyondURL)}
        disabled={!(character && character.dndBeyondURL)}
        style={style}
      >
        DND BEYOND
      </Button>
      <Button
        variant="primary"
        href={
          "/BarrysNotesOnBarovia/#/Campaigns/" +
          (character ? character.campaignDocId : "")
        }
        disabled={character && character.campaignDocId !== "" ? false : true}
        style={style}
      >
        View Campaign
      </Button>
    </Container>
  );
};

export default CharacterDetailsOverview;
