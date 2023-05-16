import React from 'react';
import css from "../SingleCampaign.module.scss"
import { Campaign } from '../../../../model/Campaign';
import { Grid } from "@mui/material";
import { Typography } from '../../../../components/Typography/Typography';
import BACKUP from "../../../../images/homeBackground.jpg";

declare interface OverviewProps {
    campaign: Campaign;
};

const Overview = ({ campaign }: OverviewProps) => {
    return (
        <div className={css.overview}>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <Typography>{campaign.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <div className={css.overviewImage}>
                        <img
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