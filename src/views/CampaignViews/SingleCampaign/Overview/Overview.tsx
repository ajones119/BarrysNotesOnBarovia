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
import OverviewCard from './components/OverviewCard';


const Overview = () => {
    const { CampaignId } = useParams();
    const { data: campaign } = useCampaign(CampaignId as string);

    return (
        <div className={css.overview}>
            <div className={css.overviewRow}>
                <div className={css.overviewItemContainer}>
                    <OverviewCard
                        title="Overview"
                        url={`/Campaigns/${CampaignId}/overview`}
                        image={campaign?.campaignImageURL || ""}
                    />
                </div>
                <div className={css.overviewItemContainer}>
                    <OverviewCard
                        title="Characters"
                        url={`/Campaigns/${CampaignId}/characters`}
                        image={Party}
                    />
                </div>
            </div>
            <div className={css.overviewRow}>
                <div className={css.overviewItemContainer}>
                    <OverviewCard
                        title="Notes"
                        url={`/Campaigns/${CampaignId}/notes`}
                        image={Notes}
                    />
                </div>
                <div className={css.overviewItemContainer}>
                    <OverviewCard
                        title="Locations"
                        url={`/Campaigns/${CampaignId}/locations`}
                        image={Locations}
                    />
                </div>
            </div>
            <div className={css.overviewRow}>
                <div className={css.overviewItemContainer}>
                    <OverviewCard
                        title="Combat"
                        url={getCombatMapRoute(campaign?.docId || "")}
                        image={Combat}
                    />
                </div>
                <div className={css.overviewItemContainer}>
                    <OverviewCard
                        title="Encounters"
                        url={`/Campaigns/${CampaignId}/combat`}
                        image={Encounters}
                    />
                </div>
            </div>
        </div>
    );
}

export default Overview;
