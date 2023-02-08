import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import CharactersList from "../../components/CharactersList/CharactersList";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import NewNpcForm from "../../components/NewNpcForm/NewNpcForm";
import NPCList from "../../components/NPCList/NPCList";

export const CampaignCharactersView = ({npcs, characters, campaign}: any) => {
const [newNPCOpen, setNewNPCOpen] = React.useState(false);

    return(
        <div>
            <h1>Characters in {campaign.title}</h1>
            <h2>Players</h2>
            <CharactersList characters={characters} />
            <h2>NPCs <Button variant="success" onClick={() => { setNewNPCOpen(true) }} ><FontAwesomeIcon icon={faPlus} /></Button></h2>
            <NPCList npcs={npcs} />
            <CreateModal
          title="Create Campaign"
          handleClose={() => setNewNPCOpen(false)}
          show={newNPCOpen}
          content={
            <NewNpcForm
              campaign={campaign}
              handleModalSave={() => setNewNPCOpen(false)}
            />
            }
            />
        </div>
    );
}