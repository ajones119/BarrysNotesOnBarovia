import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Checkbox, TableCell, TableRow } from "@mui/material";
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

type InitiativeTrackerTableRowProps = {
  item: CombatCharacter;
  onChange: (newCopy: any) => void;
  onRemove: () => void;
  active?: boolean;
  tableKey: number;
  characters: PlayerCharacter[];
};

const InitiativeTrackerTableRow = ({
  active = false,
  item,
  onChange,
  onRemove,
  tableKey,
  characters,
}: InitiativeTrackerTableRowProps) => {
  const [isHealthCounterOpen, setIsHealthCounterOpen] = useState(false);
  const [healthIncrement, setHealthIncrement] = useState<number>(1);

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
      onChange({ ...item, shouldShowHealthBar: true, shouldShow: true });
    } else if (value === "hideHP") {
      onChange({ ...item, shouldShowHealthBar: false, shouldShow: true });
    } else {
      onChange({ ...item, shouldShowHealthBar: false, shouldShow: false });
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

  const playerCharacterImageUrl = item?.playerDocId &&
    characters.find((character) => character.docId === item?.playerDocId)
      ?.characterImageURL;

  const characterType: CharacterTypeLowercase = (item?.type?.toLowerCase() || "unknown") as CharacterTypeLowercase;
  const enemyImageURL = item?.imageURL || BASE_CHARACTER_IMAGE_MAP[characterType]

  const image = playerCharacterImageUrl || enemyImageURL;

  const identifier = (
    <div className={css.identifier}>
      <Avatar
        className={css.avatar}
        src={image || BACKUP}
        alt="boo"
        sx={{ width: 32, height: 32 }}
      />
      <ColorPicker
        width={0}
        value={item?.color}
        onChange={(value) => onChange({ ...item, color: value })}
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
                onChange({
                  ...item,
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
            onChange={(value) => onChange({ ...item, initiative: value })}
          />
          <Typography color="primary">+{item?.initiativeBonus || 0}</Typography>
        </div>
      </TableCell>
      <TableCell style={{ width: "65%" }}>
        <div className={css.nameCell}>
          <TextInput
            disabled={!!item?.playerDocId}
            value={item?.name}
            onChange={(value) => onChange({ ...item, name: value })}
          />
        </div>
      </TableCell>
      <TableCell style={{ width: "10%" }}>
        <div className={css.healthCell}>
          <div ref={refs.setReference} {...getReferenceProps()}>
            <TextInput
              number
              value={item?.health}
              onChange={(value) => onChange({ ...item, health: value })}
            />
          </div>
          <Typography>/</Typography>
          <TextInput
            number
            value={item?.maxHealth}
            onChange={(value) => onChange({ ...item, maxHealth: value })}
          />
        </div>
      </TableCell>
      <TableCell style={{ width: "5%" }}>
        <TextInput
          number
          value={item?.armorClass}
          onChange={(value) => onChange({ ...item, armorClass: value })}
        />
      </TableCell>
      <TableCell style={{ width: "10%" }}>
        <ConditionSelect
          width="100%"
          selectedValue={item?.conditions}
          onChange={(value) => onChange({ ...item, conditions: value })}
        />
      </TableCell>
      <TableCell style={{ width: "2%" }}>
       <Checkbox checked={item?.isAlly} disabled={!!item?.playerDocId} onChange={() => onChange({...item, isAlly: !item?.isAlly})} />
      </TableCell>
      <TableCell style={{ width: "2%" }}>
        {!item?.playerDocId && (
          <Button onClick={onRemove} color="error">
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
                    onChange({
                      ...item,
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
                    onChange({
                      ...item,
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
