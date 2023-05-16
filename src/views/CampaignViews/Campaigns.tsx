import React, { useEffect } from "react";
import { useState } from "react";
import { Grid } from "@mui/material"
import { TextInput } from "../../components/TextInput/TextInput";
import { useCampaigns } from "../../service/CampaignService";
import { CampaignThumbCard } from "../../components/CampaignThumbCard/CampaignThumbCard";
import css from "./Campaigns.module.scss"
import { Button } from "../../components/Button/Button";
import { Spacer } from "../../components/Spacer/Spacer";
import CreateCampaignModal from "../../components/Modal/CreateCampaignModal/CreateCampaignModal";

export const Campaigns = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const {campaigns, isLoading} = useCampaigns();

  return (
    <div className={css.campaigns}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <div className={css.addButton}>
            <Button size="large" color="dark" onClick={() => setIsCreateModalOpen(true)}>Add Campaign</Button>
          </div>
        </Grid>
      </Grid>
      <Spacer height={24} />
      <Grid container justifyContent="space-evenly" spacing={2} alignItems="center">
      {campaigns?.map((campaign) => (
        <Grid item xs={12} lg={6} key={campaign.docId}>
          <CampaignThumbCard campaign={campaign} />
        </Grid>
      ))}
      </Grid>
      <CreateCampaignModal onClose={() => setIsCreateModalOpen(false)} isOpen={isCreateModalOpen} />
    </div>
  );
};

export default Campaigns;
