import React from 'react';
import css from "../SingleCampaign.module.scss"
import { Typography } from '@components/Typography/Typography';
import BACKUP from "@images/homeBackground.jpg";
import { useNavigate, useParams } from 'react-router-dom';
import { useCampaign } from '@services/CampaignService';
import Party from "@images/party.png"
import Notes from "@images/notes.jpg"
import Locations from "@images/locations.jpg"
import Combat from "@images/combat.jpg"
import Encounters from "@images/encounters.jpg"
import { getCombatMapRoute } from '@views/DMInitiative/utils';


const Overview = () => {
    const { CampaignId } = useParams();
    const { data: campaign } = useCampaign(CampaignId as string);
    const navigate = useNavigate();

    return (
        <div className={css.overview}>
            <div className={css.overviewRow}>
                <div className={css.overviewItemContainer}>
                    <div className={css.overviewCard} onClick={() => navigate(`/Campaigns/${CampaignId}/overview`)}>
                        <img
                            className={css.overviewCardImage}
                            src={campaign.campaignImageURL}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            alt="boo"
                        />
                        <div className={css.overviewCardText}>
                            <Typography size="large" weight="bold">
                                {campaign.title}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={css.overviewItemContainer}>
                    <div className={css.overviewCard} onClick={() => navigate(`/Campaigns/${CampaignId}/characters`)}>
                        <img
                            className={css.overviewCardImage}
                            src={Party}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            alt="boo"
                        />
                        <div className={css.overviewCardText}>
                            <Typography size="large" weight="bold">
                                Characters
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.overviewRow}>
                <div className={css.overviewItemContainer}>
                    <div className={css.overviewCard} onClick={() => navigate(`/Campaigns/${CampaignId}/notes`)}>
                        <img
                            className={css.overviewCardImage}
                            src={Notes}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            alt="boo"
                        />
                        <div className={css.overviewCardText}>
                            <Typography size="large" weight="bold">
                                Notes
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={css.overviewItemContainer}>
                    <div className={css.overviewCard} onClick={() => navigate(`/Campaigns/${CampaignId}/locations`)}>
                        <img
                            className={css.overviewCardImage}
                            src={Locations}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            alt="boo"
                        />
                        <div className={css.overviewCardText}>
                            <Typography size="large" weight="bold">
                                Locations
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className={css.overviewRow}>
                <div className={css.overviewItemContainer}>
                    <div className={css.overviewCard} onClick={() => navigate(getCombatMapRoute(campaign?.docId || ""))}>
                        <img
                            className={css.overviewCardImage}
                            src={Combat}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            alt="boo"
                        />
                        <div className={css.overviewCardText}>
                            <Typography size="large" weight="bold">
                                Combat
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className={css.overviewItemContainer}>
                    <div className={css.overviewCard} onClick={() => navigate(`/Campaigns/${CampaignId}/combat`)}>
                        <img
                            className={css.overviewCardImage}
                            src={Encounters}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=BACKUP;
                            }}
                            alt="boo"
                        />
                        <div className={css.overviewCardText}>
                            <Typography size="large" weight="bold">
                                Encounters
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;
