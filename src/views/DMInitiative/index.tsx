import React, { useState, useEffect } from "react";
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
import { faArrowRightRotate, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useCombatMap, useUpdateCombatMap } from "@services/CombatMapService";
import FloatingButtonContainer from "@components/FloatingButtonContainer";

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
  const { combatId, CampaignId: campaignId = "" } = useParams();
  const { combat, isLoading, isRefetching, isFetching } = useCombat(combatId);
  const { combatMap, isLoading: isMapLoading, isRefetching: isMapRefetching } = useCombatMap(combatId || "");
  const { currentTurnIndex = null, combatCharacterArray = [], campaignDocId = "" } = combat;
  const { data: campaign } = useCampaign(campaignId);
  const { characters = [] } = useCampaignCharacters(campaignId);
  const { insert, removeAt, replaceAt, replaceList, listWithIds, list } =
    useList([]);
  const [colorFilter, setColorFilter] = useState<string[]>([])
  const updateInitiative = useUpdateInitiative(combat);
  const updateCampaign = useUpdateCampaign(campaignId);
  const {mutate: updateCombatMap} = useUpdateCombatMap(combatMap);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);

  useDeepCompareEffect(() => {
    if (!isLoading && !isRefetching) {
      replaceList(combatCharacterArray || [{}]);
    }
  }, [isRefetching, isLoading, combat]);

  //autosaving not needed rn, currently breaks delete
  useDeepCompareEffect(() => {
    if (!isRefetching && !isLoading) {
      const timeout = setTimeout(() => handleUpdate({...combat}), 500)

      return () => clearTimeout(timeout)
    }
  }, [isFetching, list]);

  const handleUpdate = (combat: Combat, overrideCharacterArray = list) => { 
    updateInitiative({
      ...combat,
      combatCharacterArray: overrideCharacterArray,
    });

      const { combatMapCharacterArray = [] } = combatMap;
      const combinedCharacterArrays = overrideCharacterArray.map((characterFromCombat) => {
        const characterFromMap = combatMapCharacterArray.find(item => item?.uniqueId === characterFromCombat?.uniqueId);
        return {
          ...characterFromMap,
          ...characterFromCombat,
          position: {
            x: characterFromMap?.position?.x || 100,
            y: characterFromMap?.position?.y || 100,
          },
          uniqueId: characterFromCombat?.uniqueId !== undefined ? characterFromCombat?.uniqueId : getNewUniqueId()
        };
      })


      updateCombatMap({...combatMap, combatMapCharacterArray: combinedCharacterArrays})
  };

  const handleStart = () => {
    updateCampaign({ ...campaign, currentCombatDocId: combatId });
  };

  const handleDelete = (index: number) => {
    const removedList = removeAt(index);
    let newNextTurn = currentTurnIndex;

    if (newNextTurn !== null && newNextTurn >= index) {
      newNextTurn -= 1;
    }

    handleUpdate({ ...combat, currentTurnIndex: newNextTurn || 0 }, removedList);
  };

  // TODO: do this properly using types for safety. Maybe a better signifier? What about npcs?
  const encounterDiffulty = getEncounterDifficulty(
    list.filter((character) => !character?.playerDocId && !character?.isAlly),
    characters,
  );

  const filteredList = colorFilter.length > 0 ? listWithIds.filter(item => colorFilter.includes(item?.data?.color) || item?.data?.playerDocId || item?.data?.isAlly) : listWithIds;

  const getNewUniqueId = () => {
    let newId = 0;

    list.forEach(character => {
      const testId = character?.uniqueId || 0;

      if (testId > newId) {
        newId = testId;
      }
    })

    return newId + 1;
  }

  const autoInitiative = () => {
    let tempCombatCharacters = [...combatCharacterArray];

    tempCombatCharacters = tempCombatCharacters.map(character => {
      if (!character?.playerDocId && !character?.initiative) {
        const roll = Math.floor(
          Math.random() * 20 + (1 + (character.initiativeBonus || 0)),
        );
        return {...character, initiative: roll};
      }
      return character;
    })

    handleUpdate(combat, tempCombatCharacters)
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
              onChange={(value: string[]) => setColorFilter(value)} />
              <Button hollow color="error" onClick={() => {setColorFilter([])}} ><FontAwesomeIcon icon={faCircleXmark} color="red"  /></Button>
          </div>
          <Spacer height={8} />
          <div style={{display: "flex", alignItems: "center", columnGap: 4}}>
            <Button onClick={() => {
              const newCombatCharacterArray = combatCharacterArray.map(item => {
                if ((colorFilter.includes(item?.color || "") || colorFilter.length < 1) && !item?.playerDocId) {
                  return {...item, shouldShow: false, shouldShowHealthBar: false}
                }
                return item
              })

              handleUpdate(combat, newCombatCharacterArray)
            }} color="dark">Hide All</Button>
            <Button onClick={() => {
              const newCombatCharacterArray = combatCharacterArray.map(item => {
                if ((colorFilter.includes(item?.color || "") || colorFilter.length < 1) && !item?.playerDocId) {
                  return {...item, shouldShow: true, shouldShowHealthBar: true}
                }
                return item
              })

              handleUpdate(combat, newCombatCharacterArray)
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
            <TableCell style={{ width: "70%" }}>
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
        {listWithIds.map((item, index) => filteredList.includes(item) && (
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
      <ResourceDrawer
        isOpen={isAddDrawerOpen}
        onAdd={(data) => insert({...data, uniqueId: getNewUniqueId()})}
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
              onClick={() =>
                insert({ shouldShow: true, shouldShowHealthBar: true, uniqueId: getNewUniqueId() })
              }
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

          <div className={css.buttonsColumn}>
            <Button
              onClick={() => {
                const tempList = [...list];
                const sortedList = tempList.sort((a, b) =>{
                  let aInititative = Number(a["initiative"] || -100);
                  let bInitiative = Number(b["initiative"] || -100);
                    if (aInititative === bInitiative) {
                      aInititative += Number(a["dexterity"] || -100)
                      bInitiative += Number(a["dexterity"] || -100)
                    }
                  
                    return aInititative <= bInitiative ? 1 : -1;
                });
                handleUpdate({ ...combat }, sortedList);
              }}
            >
              <Typography>Sort</Typography>
            </Button>
            <Button
              onClick={() => {
                handleUpdate({ ...combat });
              }}
            >
              <Typography>Save</Typography>
            </Button>
          </div>

          <Button
            color="error"
            onClick={() =>{
              let nextTurn = 0;
              if (currentTurnIndex !== null) {
                nextTurn =
                  currentTurnIndex - 1 < 0
                    ? list.length-1
                    : currentTurnIndex - 1;

                  while (filteredList.filter(item => listWithIds[nextTurn].data.uniqueId === item.data.uniqueId).length < 1) {
                    nextTurn =
                      nextTurn - 1 <= 0
                        ? 0
                        : nextTurn - 1;
                  }
              }
              handleUpdate({ ...combat, currentTurnIndex: nextTurn })
            }}
          >
            <Typography>Back</Typography>
          </Button>
          <Button
            color="success"
            onClick={() =>{
              let nextTurn = 0;
              if (currentTurnIndex !== null) {
                nextTurn =
                  currentTurnIndex + 1 >= list.length
                    ? 0
                    : currentTurnIndex + 1;

                  while (filteredList.filter(item => listWithIds[nextTurn].data.uniqueId === item.data.uniqueId).length < 1) {
                    nextTurn =
                      nextTurn + 1 >= list.length
                        ? 0
                        : nextTurn + 1;
                  }
              }
              handleUpdate({ ...combat, currentTurnIndex: nextTurn })
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
