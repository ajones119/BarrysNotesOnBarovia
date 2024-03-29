import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import css from "../DMInitiative.module.scss";
import { faDiceD20, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  useFloating,
  useClick,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  useDismiss,
} from "@floating-ui/react";
import { TextInput } from "@components/TextInput/TextInput";
import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/Button/Button";
import { CombatCharacter } from "@model/CombatCharacter";
import ColorPicker from "@components/ColorPicker/ColorPicker";
import BACKUP from "@images/GenericMonsters/unknown.png";
import ShowSelector from "./ShowSelector";
import ConditionSelect from "@components/ConditionsSelect/ConditionsSelect";
import { BASE_CHARACTER_IMAGE_MAP } from "utils/getBaseCharacterGenericImage";
import { CharacterTypeLowercase } from "@model/BaseCharacter";
import { PlayerCharacter } from "@model/PlayerCharacter";
import Avatar from "@components/Avatar";
import { useDeleteCombatCharacter, useEditCombatCharacter } from "@services/CombatService";
import { useParams } from "react-router-dom";
import { useEditPlayerCharacter } from "@services/CharacterService";

type InitiativeTrackerTableRowProps = {
  item: CombatCharacter;
  active?: boolean;
  tableKey: number | string;
  characters: PlayerCharacter[];
};

const InitiativeTrackerTableRow = ({
  active = false,
  item,
  tableKey,
  characters,
}: InitiativeTrackerTableRowProps) => {
  const { combatId = "", CampaignId: campaignId = "" } = useParams();

  const [isHealthCounterOpen, setIsHealthCounterOpen] = useState(false);
  const [healthIncrement, setHealthIncrement] = useState<number>(1);
  const {mutate: updateCharacter} = useEditCombatCharacter(item?.docId || "")
  const {mutate: deleteCharacter} = useDeleteCombatCharacter(combatId || "")
  const {mutate: updatePlayerCharacter} = useEditPlayerCharacter(() => {})

  const { refs, floatingStyles, context } = useFloating({
    open: isHealthCounterOpen,
    onOpenChange: setIsHealthCounterOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]); 

  const handleShowChange = (value: string) => {
    if (value === "all") {
      updateCharacter({ shouldShowHealthBar: true, shouldShow: true });
    } else if (value === "hideHP") {
      updateCharacter({ shouldShowHealthBar: false, shouldShow: true });
    } else {
      updateCharacter({ shouldShowHealthBar: false, shouldShow: false });
    }
  };

  const getShowValue = () => {
    if (item?.shouldShowHealthBar && item?.shouldShow) {
      return "all";
    } else if (!item?.shouldShowHealthBar && item?.shouldShow) {
      return "hideHP";
    } else {
      return "hide";
    }
  };

  const playerCharacter = item?.playerDocId &&
    characters.find((character) => character.docId === item?.playerDocId) || null;

  const characterType: CharacterTypeLowercase = (item?.type?.toLowerCase() || "unknown") as CharacterTypeLowercase;
  const enemyImageURL = item?.imageURL || BASE_CHARACTER_IMAGE_MAP[characterType];

  const image = playerCharacter?.characterImageURL || enemyImageURL;
  let name = item?.name;
  let maxHealth = item?.maxHealth;
  let health = item?.health;
  let armorClass = item?.armorClass;
  let tempHealth = item?.tempHealth;
  let conditions = item?.conditions;
  let update: (value: any) => void = updateCharacter;

  if (playerCharacter) {
    name = playerCharacter?.name;
    maxHealth = playerCharacter?.maxHealth;
    health = playerCharacter?.health;
    armorClass = playerCharacter?.armorClass;
    tempHealth = playerCharacter?.tempHealth;
    conditions = playerCharacter?.conditions;
    update = (updateCharacter: Partial<PlayerCharacter>) => {
      updatePlayerCharacter({...updateCharacter, docId: item?.playerDocId});
    }
  }
  

  const identifier = (
    <div className={css.identifier}>
      <Avatar
        className={css.avatar}
        src={String(image || BACKUP)}
        alt="boo"
        size={32}
      />
      <ColorPicker
        width={0}
        value={item?.color}
        onChange={(value) => updateCharacter({ color: value })}
      />
    </div>)

  return (
    <TableRow
      className={`${css.row} ${active ? css.active : ""}`}
      key={`initiative-${tableKey}-item-${item?.color}`}
    >
      <TableCell style={{ width: "5%" }}>
        <div style={{display: "flex", alignItems: "center", columnGap: "4px"}}>
          <Typography>{item?.uniqueId}</Typography> 
          <ShowSelector
            value={getShowValue()}
            onChange={(value) => handleShowChange(value)}
          />
        </div>
      </TableCell>
      <TableCell style={{ width: "5%" }}>{identifier}</TableCell>
      <TableCell style={{ width: "15%" }}>
        <div className={css.tableCell}>
          <div className={css.randomIcon}>
            <FontAwesomeIcon
              icon={faDiceD20}
              onClick={() =>
                updateCharacter({
                  initiative: Math.floor(
                    Math.random() * 20 + (1 + (item.initiativeBonus || 0)),
                  ),
                })
              }
            />
          </div>

          <TextInput
            number
            value={item?.initiative}
            onChange={(value) => updateCharacter({ initiative: Number(value || 0) })}
          />
          <Typography color="primary">+{item?.initiativeBonus || 0}</Typography>
        </div>
      </TableCell>
      <TableCell style={{ width: "65%" }}>
        <div className={css.nameCell}>
          <TextInput
            disabled={!!item?.playerDocId}
            value={name}
            onChange={(value) => update({ name: String(value)})}
          />
        </div>
      </TableCell>
      <TableCell style={{ width: "10%" }}>
        <div className={css.healthCell}>
          <div ref={refs.setReference} {...getReferenceProps()}>
            <TextInput
              number
              value={health}
              onChange={(value) => update({ health: Number(value || 0) })}
            />
          </div>
          <Typography>/</Typography>
          <TextInput
            number
            value={maxHealth}
            onChange={(value) => update({ maxHealth: Number(value || 1) })}
          />
          <Typography>|</Typography>
          <TextInput
            number
            value={tempHealth || 0}
            onChange={(value) => update({ tempHealth: Number(value || 0) })}
          />
        </div>
      </TableCell>
      <TableCell style={{ width: "5%" }}>
        <TextInput
          number
          value={armorClass}
          onChange={(value) => update({ armorClass: Number(value || 0) })}
        />
      </TableCell>
      <TableCell style={{ width: "10%" }}>
        <ConditionSelect
          width="100%"
          selectedValue={conditions}
          onChange={(value) => update({ conditions: value || [] })}
        />
      </TableCell>
      <TableCell style={{ width: "2%" }}>
      <Checkbox checked={item?.isAlly} disabled={!!item?.playerDocId} onChange={() => updateCharacter({ isAlly: !item?.isAlly})} />
      </TableCell>
      <TableCell style={{ width: "2%" }}>
        {!item?.playerDocId && (
          <Button onClick={() => deleteCharacter(item?.docId || "")} color="error">
            Delete
          </Button>
        )}
      </TableCell>
      {isHealthCounterOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          <div className={css.healthCounterContainer}>
            <div>
              <TextInput
                number
                value={healthIncrement || 0}
                onChange={(value) => setHealthIncrement(Number(value))}
              />
              <div className={css.counterButtons}>
                <div
                  className={css.minus}
                  onClick={() =>
                    updateCharacter({
                      health:
                        Number(item?.health || 0) -
                        Number(healthIncrement || 0),
                    })
                  }
                >
                  {" "}
                  <FontAwesomeIcon icon={faMinus} />
                </div>
                <div
                  className={css.plus}
                  onClick={() =>
                    updateCharacter({
                      health:
                        Number(item?.health || 0) +
                        Number(healthIncrement || 0),
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </TableRow>
  );
};

export default InitiativeTrackerTableRow;
