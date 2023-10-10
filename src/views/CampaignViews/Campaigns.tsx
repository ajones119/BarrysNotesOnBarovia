import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material"
import { useCampaigns } from "../../service/CampaignService";
import { CampaignThumbCard } from "../../components/CampaignThumbCard/CampaignThumbCard";
import css from "./Campaigns.module.scss"
import { Button } from "../../components/Button/Button";
import { Spacer } from "../../components/Spacer/Spacer";
import CreateCampaignModal from "../../components/Modal/CreateCampaignModal/CreateCampaignModal";
import { useWindowWidth } from "@react-hook/window-size";
import Boop from "../../components/AnimationComponentWrappers/Boop";
import { Typography } from "../../components/Typography/Typography";

const getCardWidth = (width: number) => {
  if (width > 1300) {
    return 600;
  } else if (width > 1100) {
    return 500
  } else if (width > 800) {
  return 350
  } else {
    return width - 24;
  }
}

export const Campaigns = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {campaigns} = useCampaigns();
  const width = useWindowWidth();

  const cardWidth = getCardWidth(width);

  return (
    <div className={css.campaigns}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <div className={css.addButton} style={{width: `${cardWidth-24}px`}}>
            <Button size="large" color="dark" borderColor="primary" onClick={() => setIsCreateModalOpen(true)} animatedHover>Add Campaigns</Button>
          </div>
        </Grid>
      </Grid>
      <Spacer height={24} />
      <Grid container justifyContent="space-evenly" spacing={2} alignItems="center">
      {campaigns?.map((campaign) => (
        <Grid item xs={12} md={6} key={campaign.docId}>
          <CampaignThumbCard campaign={campaign} width={cardWidth} />
        </Grid>
      ))}
      </Grid>
      <CreateCampaignModal onClose={() => setIsCreateModalOpen(false)} isOpen={isCreateModalOpen} />
    </div>
  );
};

export default Campaigns;
