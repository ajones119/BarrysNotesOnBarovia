import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '../../../components/Typography/Typography';
import { useCampaign } from '../../../service/CampaignService';
import css from "./SingleCampaign.module.scss"
import Tabs, { Tab } from '../../../components/Tabs/Tabs';
import { Campaign } from '../../../model/Campaign';
import Overview from './Tabs/Overview';
import CampaignCharacters from './Tabs/CampaignCharacters';
import CampaignNotes from './Tabs/CampaignNotes';
import { useCampaignNPCs } from '../../../service/NPCService';
import { useCampaignCharacters } from '../../../service/CharacterService';
import { Character } from '../../../model/Character';
import { NPC } from '../../../model/NPC';
import { Note } from '../../../model/Note';
import { useCampaignNotes } from '../../../service/NotesService';
import CampaignLocations from './Tabs/CampaignLocations/CampaignLocations';
import { useCampaignLocations } from '../../../service/CampaignLocationService';
import { CampaignLocation } from '../../../model/Location';

const getTabs = (
    campaign: Campaign,
    characters: Character[],
    NPCs: NPC[],
    notes: Note[],
    locations: CampaignLocation[]
    ) => [
    {
        key: "overview",
        name: <Typography>Overview</Typography>,
        content: <Overview campaign={campaign} />
    },
    {
        key: "characters",
        name: <Typography>Characters</Typography>,
        content: <CampaignCharacters characters={characters} npcs={NPCs} />
    },
    {
        key: "notes",
        name: <Typography>Notes</Typography>,
        content: <CampaignNotes characters={characters} notes={notes} />
    },
    {
        key: "locations",
        name: <Typography>Locations</Typography>,
        content: <CampaignLocations npcs={NPCs} locations={locations} />
    }
];

const SingleCampaign = () => {
    const navigate = useNavigate;
    const params = useParams();
    const { CampaignId } = params;
    const { campaign, isLoading } = useCampaign(CampaignId as string);
    const {characters, isLoading: isCharactersLoading} = useCampaignCharacters(CampaignId || "");
    const {NPCs, isLoading: isNPCsLoading} = useCampaignNPCs(CampaignId || "");
    const {notes, isLoading: isNotesLoading} = useCampaignNotes(CampaignId || "");
    const {campaignLocations, isLoading: isLocationsLoading} = useCampaignLocations(CampaignId || "");

    const [currentTab, setCurrentTab] = useState("overview")

    return (
        <div className={css.singleCampaign}>
            <Tabs currentTab={currentTab} tabs={getTabs(campaign, characters || [], NPCs || [], notes || [], campaignLocations || [])} onChange={(tabKey) => setCurrentTab(tabKey)} />
        </div>
    );
};

export default SingleCampaign;