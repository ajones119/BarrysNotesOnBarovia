import React from 'react';
import css from "./CampaignThumbCard.module.scss"
import STICK from "../../images/homeBackground.jpg"
import { Typography } from '../Typography/Typography';
import { Campaign } from '../../model/Campaign';
import { useNavigate } from 'react-router-dom';

declare interface CampaignThumbCardProps {
    campaign: Campaign
};

export const CampaignThumbCard = ({ campaign }: CampaignThumbCardProps) => {
    const navigate = useNavigate();
    return (
        <div className={css.CampaignThumbCard} onClick={() => navigate(`/campaigns/${campaign.docId}`)}>
            <div className={css.imageContainer}>
            <img
                src={campaign.campaignImageURL}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src=STICK;
                }}
                width={600}
                alt="boo"
            /></div>
            <div className={css.nameContainer}>
            <Typography color="primary"> {campaign.title} </Typography>
            </div>
        </div>
    );
};