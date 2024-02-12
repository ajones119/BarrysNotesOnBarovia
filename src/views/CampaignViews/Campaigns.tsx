import React from "react";
import { useState } from "react";
import { Grid } from "@mui/material"
import { useCampaigns } from "@services/CampaignService";
import { CampaignThumbCard } from "@components/CampaignThumbCard/CampaignThumbCard";
import css from "./Campaigns.module.scss"
import { Button } from "@components/Button/Button";
import { Spacer } from "@components/Spacer/Spacer";
import CreateCampaignModal from "@components/Modal/CreateCampaignModal/CreateCampaignModal";
import { useWindowWidth } from "@react-hook/window-size";
import Boop from "@components/AnimationComponentWrappers/Boop";
import { Typography } from "@components/Typography/Typography";
import FloatingButtonContainer from "@components/FloatingButtonContainer";
import useDeviceSizeHook from "@hooks/useDeviceSizeHook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
  const {isMobile} = useDeviceSizeHook();

  const cardWidth = getCardWidth(width);

  return (
    <div className={css.campaigns}>
      <FloatingButtonContainer>
        <Button animatedHover onClick={() => {setIsCreateModalOpen(true)}}>
          <Typography size="large" color="default">{
            isMobile
            ? <FontAwesomeIcon icon={faPlus} />
            : "Add Campaign +"
          }</Typography>
        </Button>
      </FloatingButtonContainer>
      <div className={css.campaignsContainer}>
        {campaigns?.map((campaign) => (
          <div className={css.campaignContainer} key={campaign.docId}>
            <CampaignThumbCard campaign={campaign} width={cardWidth} />
          </div>
        ))}
      </div>
      <CreateCampaignModal onClose={() => setIsCreateModalOpen(false)} isOpen={isCreateModalOpen} />
    </div>
  );
};

export default Campaigns;
