import React, { useState } from "react";
import Tray from "..";
import { faNoteSticky, faUser } from "@fortawesome/free-solid-svg-icons";
import { useCharacter, useEditPlayerCharacter } from "@services/CharacterService";
import useLocalCharacter from "@hooks/useLocalCharacter";
import { useParams } from "react-router-dom";
import css from "./CharacterOverlayTray.module.scss"
import { TextInput } from "@components/TextInput/TextInput";
import ConditionSelect from "@components/ConditionsSelect/ConditionsSelect";
import CharacterInfoTab from "./components/characterInfo";
import NotesTray from "./components/notesTray";

const CharacterOverlayTray = () => {
    const [openTab, setOpenTab] = useState("");
    const {CampaignId = ""} = useParams();
    const {selectedCharacter = ""} = useLocalCharacter(CampaignId);

    const tabs = [];

    if (selectedCharacter) {
        tabs.push({
            key: "selectedCharacter",
            icon: faUser,
            contents: (
                <CharacterInfoTab id={selectedCharacter} />
            )
        });

        tabs.push({
            key: "notes",
            icon: faNoteSticky,
            contents: (
                <NotesTray id={selectedCharacter} campaignId={CampaignId} />
            )
        });
    }


    return (
        <Tray
            openTab={openTab}
            onClose={() => setOpenTab("")}
            onOpen={(tab) => setOpenTab(tab)} 
            side="right"
            contents={tabs}
        />
    );
}

export default CharacterOverlayTray;