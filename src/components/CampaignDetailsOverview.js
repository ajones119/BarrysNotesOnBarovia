import React from "react";
import { Container, Card } from "react-bootstrap";
import defaultBackground from "../images/homeBackground.jpg";

export const CampaignDetailsOverview = ({ campaign }) => {
  return (
    <Container>
      <Card.Img
        variant="top"
        src={campaign ? campaign.campaignImageURL : ""}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = defaultBackground;
        }}
      />
      <Card.Text>
        {campaign
          ? campaign.description
          : "Dont know much about it... seems cool though"}
      </Card.Text>
      <Card.Text>
        DM'd By {campaign ? campaign.dungeonMaster : "An Elder God"}
      </Card.Text>
    </Container>
  );
};

export default CampaignDetailsOverview;
