import React from "react";
import { Container, Card } from "react-bootstrap";
import { Campaign } from "../../model/Campaign";
import defaultBackground from "../../images/homeBackground.jpg";
import "./CampaignDetailsOverview.css"

declare interface CampaignDetailsOverviewProps {
  campaign: Campaign
}

export const CampaignDetailsOverview = ({ campaign }: CampaignDetailsOverviewProps) => {
  return (
    <div className='campaign-details-overview'>
      <img id="campaign-image" src={ campaign.campaignImageURL } alt={defaultBackground} />
      <h1>{ campaign.title }</h1>
      <p>{campaign
          ? campaign.description
          : "Dont know much about it... seems cool though"
      }</p>
      <p>
         DM'd By {campaign ? campaign.dungeonMaster : "An Elder God"}
      </p>
    </div>
  );
};

export default CampaignDetailsOverview;

/*

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

*/
