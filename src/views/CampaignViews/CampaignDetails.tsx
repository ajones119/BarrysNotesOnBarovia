import React, { useEffect } from "react";
import { Button, Row, Col, Container, Tab, Nav, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CampaignDetailsOverview from "../../components/CampaignDetailsOverview/CampaignDetailsOverview";
import { CampaignNavBar } from "../../components/CampaignNavBar/CampaignNavBar";
import CharactersList from "../../components/CharactersList/CharactersList";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import { NavBar } from "../../components/NavBar/NavBar";
import NewNoteForm from "../../components/NewNoteForm/NewNoteForm";
import NewNpcForm from "../../components/NewNpcForm/NewNpcForm";
import NotesList from "../../components/NotesList/NotesList.js";
import NPCList from "../../components/NPCList/NPCList";
import ToolsList from "../../components/ToolsList/ToolsList";
import { Campaign } from "../../model/Campaign";
import "../baseViewsStyle.css"

import { getCampaignDetailsByDocId } from "../../service/CampaignService";
import { getCharactersByCampaignDocId } from "../../service/CharacterService";
import { getNotesByCampaignDocId } from "../../service/NoteService";
import { getNPCsByCampaignDocId } from "../../service/NPCService";
import { CHARATCERS, DM_NOTES, OVERVIEW, PARTY_NOTES, QUESTS } from "../../components/CampaignNavBar/CampaignNavBarConstants";
import { CampaignCharactersView } from "./CampaignCharactersView";
import { QuestList } from "../../components/QuestsList/Quests.List";

export const CampaignDetails = () => {
  const [campaign, setCampaignDetails] = React.useState(new Campaign());
  const [characters, setCharacters] = React.useState([]);
  const [npcs, setNpcs] = React.useState([]);
  const [notes, setNotes] = React.useState([]);
  const [newNoteOpen, setNewNoteOpen] = React.useState(false);
  const [newNPCOpen, setNewNPCOpen] = React.useState(false);
  const [dungeonMasterNotes, setDungeonMasterNotes] = React.useState([]);
  const [newDungeonMasterNoteOpen, setNewDungeonMasterNoteOpen] =
    React.useState(false);
  const [currentPane, setCurrentPane] = React.useState(OVERVIEW)

  const { Id: docId } = useParams();

  useEffect(() => {
    getCampaignDetailsByDocId(docId, setCampaignDetails);
  }, []);

  useEffect(() => {
    if (campaign) {
      getCharactersByCampaignDocId(docId, setCharacters);
    }
  }, [campaign, docId]);

  useEffect(() => {
    if (campaign) {
      getNotesByCampaignDocId(docId, setNotes);
    }
  }, [campaign, docId]);

  useEffect(() => {
    if (campaign) {
      getNotesByCampaignDocId(docId, setDungeonMasterNotes, true);
    }
  }, [campaign, docId]);

  useEffect(() => {
    if (campaign) {
      getNPCsByCampaignDocId(docId, setNpcs);
    }
  }, [campaign, docId]);

  return (
    <div>
      <div className="campaign-details">
        <CampaignNavBar currentPane={currentPane} setCurrentPane={setCurrentPane} />
        {
          currentPane === OVERVIEW &&
          <CampaignDetailsOverview campaign={campaign} />
        }
        {
          currentPane === CHARATCERS &&
          <CampaignCharactersView characters={characters} npcs={npcs} campaign={campaign} />
        }
        {
          currentPane === PARTY_NOTES &&
          <NotesList campaign={campaign} notes={notes} characters={characters} />
        }
        {
          currentPane === DM_NOTES &&
          <NotesList campaign={campaign} notes={dungeonMasterNotes} isDungeonMaster />
        }
        {
          currentPane === QUESTS &&
          <QuestList />
        }
      </div>
    </div>
  );
};