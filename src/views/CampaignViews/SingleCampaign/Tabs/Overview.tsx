import React from 'react';
import css from "../SingleCampaign.module.scss"
import { Campaign } from '@model/Campaign';
import { Grid } from "@mui/material";
import { Typography } from '@components/Typography/Typography';
import BACKUP from "@images/homeBackground.jpg";
import { getCombatMapRoute } from '@views/DMInitiative/utils';
import { Button } from '@components/Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useCampaign } from '@services/CampaignService';

const Overview = () => {
    const { CampaignId } = useParams();
    const { data: campaign } = useCampaign(CampaignId as string);
    const navigate = useNavigate();

    console.log("CAMPAIGN", CampaignId, campaign)
    return (
        <div className={css.overview}>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <Typography weight='bold' size='xtraLarge' underline>{campaign.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div >
                        <img
                            className={css.overviewImage}
                            src={campaign.campaignImageURL}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            width={900}
                            alt="boo"
                        />
                    </div>
                </Grid>
                <Button
                    borderColor="primary"
                    color="dark"
                    onClick={() => navigate(getCombatMapRoute(campaign?.docId || ""))}
                >
                    <Typography size="default" color="primary">
                    Player Link
                    </Typography>
                </Button>
                <Grid item xs={12}>
                    <Typography>{campaign.description}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>DM'd By: {campaign.dungeonMaster || "A Dead God"}</Typography>
                </Grid>
            </Grid>
        </div>
    );
}

export default Overview;
