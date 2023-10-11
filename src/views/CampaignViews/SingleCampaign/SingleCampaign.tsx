import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '../../../components/Typography/Typography';
import { useCampaign } from '../../../service/CampaignService';
import css from "./SingleCampaign.module.scss"
import Tabs from '../../../components/Tabs/Tabs';
import { Campaign } from '@model/Campaign';
import Overview from './Tabs/Overview';
import CampaignCharacters from './Tabs/CampaignCharacters';
import CampaignNotes from './Tabs/CampaignNotes';
import { useCampaignNPCs } from '../../../service/NPCService';
import { useCampaignCharacters } from '../../../service/CharacterService';
import { Character } from '@model/Character';
import { NPC } from '@model/NPC';
import { Note } from '@model/Note';
import { useCampaignNotes } from '../../../service/NotesService';
import CampaignLocations from './Tabs/CampaignLocations/CampaignLocations';
import { useCampaignLocations } from '../../../service/CampaignLocationService';
import { CampaignLocation } from '@model/Location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEarthAmericas, faMagnifyingGlassLocation, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import Combats from './Tabs/InitiativeTracker/Combats';

const getTabs = (
    campaign: Campaign,
    characters: Character[],
    NPCs: NPC[],
    notes: Note[],
    locations: CampaignLocation[]
    ) => [
    {
        key: "overview",
        name: <Typography><FontAwesomeIcon icon={faEarthAmericas} />{" "}Overview</Typography>,
        content: <Overview campaign={campaign} />
    },
    {
        key: "characters",
        name: <Typography><FontAwesomeIcon icon={faCircleUser} />{" "}Characters</Typography>,
        content: <CampaignCharacters characters={characters} npcs={NPCs} />
    },
    {
        key: "notes",
        name: <Typography><FontAwesomeIcon icon={faBook} />{" "}Notes</Typography>,
        content: <CampaignNotes characters={characters} notes={notes} />
    },
    {
        key: "locations",
        name: <Typography><FontAwesomeIcon icon={faMagnifyingGlassLocation} />{" "}Locations</Typography>,
        content: <CampaignLocations npcs={NPCs} locations={locations} />
    },
    {
        key: "combat",
        name: <Typography><FontAwesomeIcon icon={faSkullCrossbones} />{" "}Combat</Typography>,
        content: <Combats campaign={campaign} characters={characters} />
    }
];

const SingleCampaign = () => {
    const { CampaignId, tabKey = "overview" } = useParams();
    const navigate = useNavigate();
    const { campaign } = useCampaign(CampaignId as string);
    const {characters} = useCampaignCharacters(CampaignId || "");
    const {NPCs} = useCampaignNPCs(CampaignId || "");
    const {notes} = useCampaignNotes(CampaignId || "");
    const {campaignLocations} = useCampaignLocations(CampaignId || "");

    return (
        <div className={css.singleCampaign}>
            <Tabs currentTab={tabKey} tabs={getTabs(campaign, characters || [], NPCs || [], notes || [], campaignLocations || [])} onChange={(tabKey) => navigate(`/Campaigns/${CampaignId}/${tabKey}`)} />
        </div>
    );
};

export default SingleCampaign;
