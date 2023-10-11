import React, { useState } from 'react';
import css from "./CampaignThumbCard.module.scss"
import STICK from "../../images/homeBackground.jpg"
import { Typography } from '../Typography/Typography';
import { Campaign } from '@model/Campaign';
import { useNavigate } from 'react-router-dom';
import {animated, useSpring, config} from "@react-spring/web"

declare interface CampaignThumbCardProps {
    campaign: Campaign
    width?: number
};

export const CampaignThumbCard = ({ campaign, width = 600 }: CampaignThumbCardProps) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const style = useSpring({
        transform: isHovered
        ? `scale(1.05)
        `
        : `scale(1)
        `,
        config: config.wobbly,
    })

    

    return (
        <animated.div
            style={{...style}}
            onMouseEnter={()=> setIsHovered(true)}
            onMouseLeave={()=> setIsHovered(false)}
        >
            <div
                className={css.CampaignThumbCard}
                style={{width: `${width}px`}}
                onClick={() => navigate(`/campaigns/${campaign.docId}`)}
            >
                <div className={css.imageContainer}>
                <img
                    src={campaign.campaignImageURL}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src=STICK;
                    }}
                    width={width}
                    alt="boo"
                /></div>
                <div className={css.nameContainer}>
                <Typography color="primary"> {campaign.title} </Typography>
                </div>
            </div>
        </animated.div>
    );
};
