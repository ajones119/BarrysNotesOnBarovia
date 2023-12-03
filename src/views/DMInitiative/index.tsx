import React from "react";
import { useCombat, useUpdateInitiative } from "@services/CombatService";
import { useParams } from "react-router-dom";
import { useList } from "@hooks/useList";
import useDeepCompareEffect from "use-deep-compare-effect";
import css from "./DMInitiative.module.scss";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Typography } from "@components/Typography/Typography";
import InitiativeTrackerTableRow from "./components/InitiativeTrackerTableRow";
import { Combat } from "@model/Combat";
import { useCampaign, useUpdateCampaign } from "@services/CampaignService";
import { Button } from "@components/Button/Button";
import { useCampaignCharacters } from "@services/CharacterService";
import { getCombatMapURL, getCombatURL } from "./utils";
import CopyButton from "@components/Button/ReusableButtons/CopyButton";
import ResourceDrawer from "@views/DMInitiative/components/ResourceDrawer";
import LinearProgress from "@mui/material/LinearProgress";
import {
  ENCOUNTER_DIFFICULTY,
  getEncounterDifficulty,
} from "@model/ChallengeRating";
import Box from "@mui/material/Box";

type EncounterDiffultyProgressProps = {
  difficulty: ENCOUNTER_DIFFICULTY;
};

const EncounterDiffultyProgress = ({
  difficulty,
}: EncounterDiffultyProgressProps) => {
  let hint = "easy";
  let color: "success" | "secondary" | "warning" | "error" = "success";

  if (difficulty === ENCOUNTER_DIFFICULTY.medium) {
    hint = "warning";
    color = "warning";
  }
  if (difficulty === ENCOUNTER_DIFFICULTY.hard) {
    hint = "hard";
    color = "error";
  }
  if (difficulty === ENCOUNTER_DIFFICULTY.deadly) {
    hint = "deadly";
    color = "error";
  }

  return (
    <Box sx={{ width: "25%" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%" }}>
          <LinearProgress
            variant="determinate"
            value={(difficulty + 1) * 25}
            color={color}
          />
        </Box>
        <Box sx={{ minWidth: 35, pl: 2 }}>
          <Typography color="light" size="small" weight="bolder">
            {hint}
          </Typography>
        </Box>
      </Box>
      <Typography>Difficulty</Typography>
    </Box>
  );
};

const DMInitiative = () => {
  const { combatId, campaignId = "" } = useParams();
  const { combat, isLoading, isRefetching } = useCombat(combatId);
  const { currentTurnIndex = 0, combatCharacterArray = [], campaignDocId = "" } = combat;
  const { campaign } = useCampaign(campaignId);
  const { characters = [] } = useCampaignCharacters(campaignId);
  const { insert, removeAt, replaceAt, replaceList, listWithIds, list } =
    useList([]);

  const updateInitiative = useUpdateInitiative(combat);
  const updateCampaign = useUpdateCampaign(campaign);
  useDeepCompareEffect(() => {
    if (!isLoading && !isRefetching) {
      replaceList(combatCharacterArray || [{}]);
    }
  }, [isRefetching, isLoading, combat]);

  const nextTurn =
    currentTurnIndex + 1 >= list.length
      ? 0
      : currentTurnIndex + 1;

  const handleUpdate = (combat: Combat, overrideCharacterArray = list) => {
    updateInitiative({
      ...combat,
      combatCharacterArray: overrideCharacterArray,
    });
  };

  const handleStart = () => {
    updateCampaign({ ...campaign, currentCombatDocId: combatId });
  };

  const handleDelete = (index: number) => {
    const removedList = removeAt(index);
    let newNextTurn = currentTurnIndex;

    if (newNextTurn >= index) {
      newNextTurn -= 1;
    }

    handleUpdate({ ...combat, currentTurnIndex: newNextTurn }, removedList);
  };

  // TODO: do this properly using types for safety. Maybe a better signifier? What about npcs?
  const encounterDiffulty = getEncounterDifficulty(
    list.filter((character) => !character?.playerDocId),
    characters,
  );

  return (
    <div className={css.initiativeTrackerContainer}>
      <div className={css.topButtonsRow}>
        <CopyButton
          animatedHover={false}
          borderColor="primary"
          color="dark"
          copiedText={getCombatURL(campaignDocId)}
        >
          <Typography size="default" color="primary">
            Copy Player Link
          </Typography>
        </CopyButton>
        <Typography size={"xtraLarge"}>{combat.name}</Typography>
        <EncounterDiffultyProgress difficulty={encounterDiffulty} />
      </div>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "5%" }}>
              <Typography color="light" size="large" weight="bolder">
                Show
              </Typography>
            </TableCell>
            <TableCell style={{ width: "5%" }}>
              <Typography color="light" size="large" weight="bolder">
                {" "}
              </Typography>
            </TableCell>
            <TableCell style={{ width: "10%" }}>
              <Typography color="light" size="large" weight="bolder">
                Initiative
              </Typography>
            </TableCell>
            <TableCell style={{ width: "70%" }}>
              <Typography color="light" size="large" weight="bolder">
                Name
              </Typography>
            </TableCell>
            <TableCell style={{ width: "10%" }}>
              <Typography color="light" size="large" weight="bolder">
                Health
              </Typography>
            </TableCell>
            <TableCell style={{ width: "5%" }}>
              <Typography color="light" size="large" weight="bolder">
                AC
              </Typography>
            </TableCell>
            <TableCell style={{ width: "50px" }}>
              <Typography color="light" size="large" weight="bolder">
                Conditions
              </Typography>
            </TableCell>
            <TableCell style={{ width: "2%" }}>
              <Typography color="light" size="large" weight="bolder">
                Remove
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {listWithIds.map((item, index) => (
          <InitiativeTrackerTableRow
            tableKey={item._id}
            active={index === combat.currentTurnIndex}
            item={item.data}
            onChange={(value) => replaceAt(index, { ...value })}
            onRemove={() => handleDelete(index)}
            characters={characters}
          />
        ))}
      </TableContainer>
      <ResourceDrawer onAdd={insert} />
      <div className={css.bottonsContainer}>
      <Button
          onClick={() =>
            window.open(getCombatMapURL(campaignDocId, combat?.docId || ""), '_blank')
          }
        >
          Map
        </Button>
        <Button
          onClick={() =>
            insert({ shouldShow: true, shouldShowHealthBar: true })
          }
        >
          ADD
        </Button>
        <Button
          onClick={() => {
            const tempList = [...list];
            const sortedList = tempList.sort((a, b) =>
              Number(a["initiative"]) < Number(b["initiative"]) ? 1 : -1,
            );
            handleUpdate({ ...combat }, sortedList);
          }}
        >
          SORT
        </Button>
        <Button onClick={() => handleStart()}>Start</Button>
        <Button
          onClick={() =>
            handleUpdate({ ...combat, currentTurnIndex: nextTurn })
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DMInitiative;
