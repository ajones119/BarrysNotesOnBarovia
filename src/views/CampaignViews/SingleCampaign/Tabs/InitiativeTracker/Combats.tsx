import React, { useState } from "react";
import css from "./InitiativeTracker.module.scss";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Button } from "@components/Button/Button";
import { Campaign } from "@model/Campaign";
import CreateCombatModal from "@components/Modal/CreateCombatModal/CreateCombatModal";
import { CombatCharacter } from "@model/CombatCharacter";
import { useCampaignCombats } from "@services/CombatService";
import { Typography } from "@components/Typography/Typography";
import { CombatEntryRow } from "./CombatEntryRow";
import { PlayerCharacter } from "@model/PlayerCharacter";
import { Combat } from "@model/Combat";
import { useParams } from "react-router-dom";
import { useCampaignCharacters } from "@services/CharacterService";

const Combats = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { CampaignId } = useParams();

  const {characters} = useCampaignCharacters(CampaignId || "");
  const {combats} = useCampaignCombats(CampaignId || "")

  const formattedCharacters = characters.filter(character => !character?.disabled).map(
    (character) =>
      ({
        name: character.name || "",
        initiativeBonus: character?.initiativeBonus || 0,
        armorClass: character?.armorClass || 0,
        playerDocId: character.docId,
        maxHealth: character?.maxHealth || 0,
        health: character?.maxHealth || 0,
        shouldShow: true,
        shouldShowHealthBar: true,
        imageURL: character?.characterImageURL,
      }) as CombatCharacter,
  );

  return (
    <div className={css.initiativeTrackerContainer}>
      <Button
        onClick={() => {
          setCreateModalOpen(true);
        }}
      >
        Create Encounter
      </Button>
      <TableContainer style={{ width: "500px", margin: "0 auto" }}>
        <TableHead>
          <TableRow>
            <TableCell width="20%"></TableCell>
            <TableCell width="80%">
              <Typography>Name</Typography>
            </TableCell>
            <TableCell width="20%"></TableCell>
          </TableRow>
        </TableHead>
        {combats?.map((combat: Combat) => <CombatEntryRow combat={combat} />)}
      </TableContainer>
      <CreateCombatModal
        characters={formattedCharacters}
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        campaignId={CampaignId || ""}
      />
    </div>
  );
};

export default Combats;
