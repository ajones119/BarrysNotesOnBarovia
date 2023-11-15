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

type CombatsProps = {
  campaign: Campaign;
  characters: PlayerCharacter[];
};

const Combats = ({ campaign, characters }: CombatsProps) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

    const {combats} = useCampaignCombats(campaign.docId || "")

  const formattedCharacters = characters.filter(character => !character?.disabled).map(
    (character) =>
      ({
        name: character.name,
        initiativeBonus: character?.initiativeBonus,
        armorClass: character?.armorClass,
        playerDocId: character.docId,
        maxHealth: character?.maxHealth,
        health: character?.maxHealth,
        shouldShow: true,
        shouldShowHealthBar: true,
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
        campaignId={campaign.docId || ""}
      />
    </div>
  );
};

export default Combats;
