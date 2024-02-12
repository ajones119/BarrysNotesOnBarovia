import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@components/Typography/Typography';
import { useCampaign } from '@services/CampaignService';
import css from "./SingleCampaign.module.scss"
import Tabs from '@components/Tabs/Tabs';
import Overview from './Overview/Overview';
import CampaignCharacters from './Tabs/CampaignCharacters';
import CampaignNotes from './Tabs/CampaignNotes';
import CampaignLocations from './Tabs/CampaignLocations/CampaignLocations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEarthAmericas, faMagnifyingGlassLocation, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import Combats from './Tabs/InitiativeTracker/Combats';

const getTabs = () => [
    {
        key: "overview",
        name: <Typography><FontAwesomeIcon icon={faEarthAmericas} />{" "}Overview</Typography>,
        content: <Overview />
    },
    {
        key: "characters",
        name: <Typography><FontAwesomeIcon icon={faCircleUser} />{" "}Characters</Typography>,
        content: <CampaignCharacters />
    },
    {
        key: "notes",
        name: <Typography><FontAwesomeIcon icon={faBook} />{" "}Notes</Typography>,
        content: <CampaignNotes />
    },
    {
        key: "locations",
        name: <Typography><FontAwesomeIcon icon={faMagnifyingGlassLocation} />{" "}Locations</Typography>,
        content: <CampaignLocations />
    },
    {
        key: "combat",
        name: <Typography><FontAwesomeIcon icon={faSkullCrossbones} />{" "}Combat</Typography>,
        content: <Combats />
    }
];

const SingleCampaign = () => {
    const { CampaignId, tabKey = "overview" } = useParams();
    const navigate = useNavigate();

    return (
        <div className={css.singleCampaign}>
            <Tabs currentTab={tabKey} disableTabMenu tabs={getTabs()} onChange={(tabKey) => navigate(`/Campaigns/${CampaignId}/${tabKey}`)} />
        </div>
    );
};

export default SingleCampaign;
