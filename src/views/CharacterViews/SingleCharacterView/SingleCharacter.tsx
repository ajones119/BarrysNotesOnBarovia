import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@components/Typography/Typography';
import { useCharacter } from '@services/CharacterService';
import Tabs from '@components/Tabs/Tabs';
import Overview from './Tabs/Overview';
import { PlayerCharacter } from '@model/PlayerCharacter';

const getTabs = (
    character: PlayerCharacter
    ) => [
        {
            key: "overview",
            name: <Typography>Overview</Typography>,
            content: <Overview character={character} />
        },
];

const SingleCharacter = () => {
    const params = useParams();
    const { CharacterId } = params;
    const { character } = useCharacter(CharacterId)
    const [currentTab, setCurrentTab] = useState("overview")

    return (
        <div>
            <Tabs
                currentTab={currentTab}
                onChange={(tabKey) => setCurrentTab(tabKey)}
                tabs={getTabs(character)}
            />
        </div>
    );
};

export default SingleCharacter;