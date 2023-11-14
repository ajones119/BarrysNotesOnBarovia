import React from 'react';
import { Select, MenuItem } from "@mui/material"
import css from "./CampaignPicker.module.scss"
import { Campaign } from '@model/Campaign';
import { Typography } from '../Typography/Typography';
import { useCampaigns } from '@services/CampaignService';

declare interface CampaignPickerProps {
    onChange: (value: any) => void,
    value?: Campaign | null,
    width?: number,
    label?: string,
    initialCampaignId?: string
}

const CampaignPicker = ({ onChange, value, width = 300, label, initialCampaignId }: CampaignPickerProps) => {
    const { campaigns, isLoading } = useCampaigns();

    campaigns?.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });


    campaigns?.push({docId: "__none__", title: "None"})

    return (
        <div className={css.campaignPicker} style={{width: `${width}px`}}>
            <Typography className={css.header} size="caption">{label || "Campaign"}</Typography>
            <Select
                value={value?.docId || initialCampaignId}
                onChange={(event) => {
                    const campaignId = event.target.value;
                    const chosenCampaign = campaigns?.find(campaign => campaign.docId === campaignId)
                    onChange(chosenCampaign)
                }}
                className={css.picker}
                style={{width: `${width}px`}}
                label='Campaigns'
                defaultValue={"__none__"}
                variant="standard"
            >
                { !isLoading && campaigns?.map((campaign) => (
                    <MenuItem key={`picker-${campaign.docId}`} value={campaign.docId}>{campaign.title}</MenuItem>
                    ))
                }
            </Select>
        </div>
    );
}

export default CampaignPicker;
