import React from "react";
import { useNavigate } from "react-router-dom";
import defaultBackground from "../../images/homeBackground.jpg";
import { Campaign } from "../../model/Campaign";
import "./CampaignList.css"


declare interface CampaignListEntryProps {
  campaign: Campaign
}

export const CampaignListEntry = ({ campaign }: CampaignListEntryProps) => {
  const navigate = useNavigate();

  return (
    <div className="campaign-list-entry" onClick={() => {navigate(`/Campaigns/${campaign.docId}`)}}>
      <img src={campaign.campaignImageURL} alt={defaultBackground} height={400} width={600} />
      <h2>{ campaign.title }</h2>
    </div>
  );
};

export default CampaignListEntry;

//href={"/#/Campaigns/" + campaign.docId}
