import React, { useState } from "react";
import { mutateCombatCharacter, useAddCombatCharacter, useCombat, useCombatCharacters, useEditCombat, useUpdateInitiative } from "@services/CombatService";
import { useParams } from "react-router-dom";
import css from "./DMInitiative.module.scss";
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Typography } from "@components/Typography/Typography";
import InitiativeTrackerTableRow from "./components/InitiativeTrackerTableRow";
import { useCampaign, useUpdateCampaign } from "@services/CampaignService";
import { Button } from "@components/Button/Button";
import { useCampaignCharacters } from "@services/CharacterService";
import { getCombatMapURL, getFilteredList, getLastTurnIndex, getNextTurnIndex, sortCombatOnInitiatives } from "./utils";
import ResourceDrawer from "@views/DMInitiative/components/ResourceDrawer";
import LinearProgress from "@mui/material/LinearProgress";
import {
  ENCOUNTER_DIFFICULTY,
  getEncounterDifficulty,
} from "@model/ChallengeRating";
import Box from "@mui/material/Box";
import { Spacer } from "@components/Spacer/Spacer";
import ColorPicker from "@components/ColorPicker/ColorPicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import FloatingButtonContainer from "@components/FloatingButtonContainer";
import Spinner from "@components/Spinner";

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
  const { combatId = "", CampaignId: campaignId = "" } = useParams();
  const { combat, isLoading } = useCombat(combatId);
  const { currentTurnIndex = null, campaignDocId = "" } = combat;
  const { data: campaign } = useCampaign(campaignId);
  const { characters = [] } = useCampaignCharacters(campaignId);
  const {mutate: editCombat} = useEditCombat(combatId)
  const updateCampaign = useUpdateCampaign(campaignId);
  const {combatCharacters = [], isLoading: isCharactersLoading} = useCombatCharacters(combatId);
  const {mutate: addCombatCharacter} = useAddCombatCharacter(combatId)
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  const handleStart = () => {
    updateCampaign({ ...campaign, currentCombatDocId: combatId });
  };

  // TODO: do this properly using types for safety. Maybe a better signifier? What about npcs?
  const encounterDiffulty = getEncounterDifficulty(
    combatCharacters.filter((character) => !character?.playerDocId && !character?.isAlly),
    characters,
  );
  const {colorFilter = []} = combat;
  const filteredList = getFilteredList(colorFilter, combatCharacters);

  const getNewUniqueId = () => {
    let newId = 0;

    combatCharacters.forEach(character => {
      const testId = character?.uniqueId || 0;

      if (testId > newId) {
        newId = testId;
      }
    })

    return newId + 1;
  }

  const autoInitiative = () => {

    combatCharacters.forEach(character => {
      if (!character?.playerDocId && !character?.initiative) {
        const roll = Math.floor(
          Math.random() * 20 + (1 + (character.initiativeBonus || 0)),
        );
        mutateCombatCharacter(character?.docId || "", {initiative: roll});
      }
    })

  }
  
  if (isLoading || isCharactersLoading) {
    return <Spinner />
  }

  return (
    <div className={css.initiativeTrackerContainer}>
      <div className={css.topButtonsRow}>
        <div>
          <Spacer height={8} />
          <div style={{display: "flex", alignItems: "center", columnGap: 4}}>
            <Typography size="default">Color Filter</Typography>
            <ColorPicker
              multiple
              width={96}
              outlined
              value={colorFilter}
              onChange={(value: string[]) => editCombat({colorFilter: value})} />
              <Button hollow color="error" onClick={() => editCombat({colorFilter: []})} ><FontAwesomeIcon icon={faCircleXmark} color="red"  /></Button>
          </div>
          <Spacer height={8} />
          <div style={{display: "flex", alignItems: "center", columnGap: 4}}>
            <Button onClick={() => {
              combatCharacters.forEach(item => {
                if ((colorFilter.includes(item?.color || "") || colorFilter.length < 1) && !item?.playerDocId) {
                  mutateCombatCharacter(item?.docId || "", { shouldShow: false, shouldShowHealthBar: false})
                }
              })
            }} color="dark">Hide All</Button>
            <Button onClick={() => {
              combatCharacters.forEach(item => {
                if ((colorFilter.includes(item?.color || "") || colorFilter.length < 1) && !item?.playerDocId) {
                  mutateCombatCharacter(item?.docId || "", { shouldShow: true, shouldShowHealthBar: true})
                }
              })

            }} color="dark">Show All</Button>
            <Button onClick={() => autoInitiative()} color="dark">Auto Init</Button>
          </div>
        </div>
        <Typography size={"xtraLarge"} fontStyle="secondary">{combat.name}</Typography>
        <EncounterDiffultyProgress difficulty={encounterDiffulty} />
      </div>
      <TableContainer>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "5%" }}>
              <Typography color="light" size="large">
                Show
              </Typography>
            </TableCell>
            <TableCell style={{ width: "5%" }}>
              <Typography color="light" size="large">
                {" "}
              </Typography>
            </TableCell>
            <TableCell style={{ width: "10%" }}>
              <Typography color="light" size="large">
                Initiative
              </Typography>
            </TableCell>
            <TableCell style={{ width: "60%" }}>
              <Typography color="light" size="large">
                Name
              </Typography>
            </TableCell>
            <TableCell style={{ width: "10%" }}>
              <Typography color="light" size="large">
                Health
              </Typography>
            </TableCell>
            <TableCell style={{ width: "5%" }}>
              <Typography color="light" size="large">
                AC
              </Typography>
            </TableCell>
            <TableCell style={{ width: "50px" }}>
              <Typography color="light" size="large">
                Conditions
              </Typography>
            </TableCell>
            <TableCell style={{ width: "2%" }}>
              <Typography color="light" size="large">
                Ally?
              </Typography>
            </TableCell>
            <TableCell style={{ width: "2%" }}>
              <Typography color="light" size="large">
                Remove
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        {combatCharacters.map((item, index) => filteredList.includes(item) && (
          <InitiativeTrackerTableRow
            tableKey={item?.docId || index}
            active={index === combat.currentTurnIndex}
            item={item}
            characters={characters}
          />
        ))}
      </TableContainer>
      <ResourceDrawer
        isOpen={isAddDrawerOpen}
        onAdd={(data) => addCombatCharacter({...data, uniqueId: getNewUniqueId()})}
        campaignDocId={campaignId}
        onClose={() => setIsAddDrawerOpen(false)}
      />
      <FloatingButtonContainer>
        <div className={css.bottonsContainer}>
          <div className={css.buttonsColumn}>
            <Button
              onClick={() =>
                window.open(getCombatMapURL(campaignDocId, combat?.docId || ""), '_blank')
              }
            >
              <Typography>Go To Map</Typography>
            </Button>
            <Button onClick={() => handleStart()}><Typography>Start</Typography></Button>
          </div>
          
          <div className={css.buttonsColumn}>
            <Button
              onClick={() => {
                addCombatCharacter({
                  shouldShow: true, shouldShowHealthBar: true, uniqueId: getNewUniqueId()
                })
              }}
            >
              <Typography>Add Empty</Typography>
            </Button>
            <Button
              onClick={() => {
                setIsAddDrawerOpen(true)
              }}
            >
              <Typography>Add Template</Typography>
            </Button>
          </div>

            <Button
              onClick={() => {
                editCombat({combatCharacterIds: sortCombatOnInitiatives(combatCharacters)})
              }}
            >
              <Typography>Sort</Typography>
            </Button>

          <Button
            color="error"
            onClick={() =>{
              const nextTurn = getLastTurnIndex(currentTurnIndex, combatCharacters, colorFilter)
              editCombat({ currentTurnIndex: nextTurn })
            }}
          >
            <Typography>Back</Typography>
          </Button>
          <Button
            color="success"
            onClick={() =>{
              const nextTurn = getNextTurnIndex(currentTurnIndex, combatCharacters, colorFilter)
              editCombat({ currentTurnIndex: nextTurn })
              
            }}
          >
            <Typography>Next</Typography>
          </Button>

        </div>
      </FloatingButtonContainer>
    </div>
  );
};

export default DMInitiative;
