import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react"
import css from "../DMInitiative.module.scss"
import { faDiceD20, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useFloating, useClick, useInteractions, offset, flip, shift, autoUpdate, useDismiss } from "@floating-ui/react";
import { TextInput } from "../../../components/TextInput/TextInput";
import { Typography } from "../../../components/Typography/Typography";
import { Button } from "../../../components/Button/Button";
import { CombatCharacter } from "../../../model/CombatCharacter";

type InitiativeTrackerTableRowProps = {
    item: CombatCharacter;
    onChange: (newCopy: any) => void,
    onRemove: () => void,
    active?: boolean;
    tableKey: number;
}

const InitiativeTrackerTableRow = ({active = false, item, onChange, onRemove, tableKey}: InitiativeTrackerTableRowProps) => {
    const [isHealthCounterOpen, setIsHealthCounterOpen] = useState(false);
    const [healthIncrement, setHealthIncrement] = useState<null | number>(1);

    const {refs, floatingStyles, context} = useFloating({
        open: isHealthCounterOpen,
        onOpenChange: setIsHealthCounterOpen,
        middleware: [offset(10), flip(), shift()],
        whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);
    const dismiss = useDismiss(context);

    const {getReferenceProps, getFloatingProps} = useInteractions([
        click, 
    ]);

    return (
            <TableRow className={active ? css.active : ""} key={`initiative-${tableKey}`}>
                <TableCell style={{width: "5%"}}>
                        <Switch checked={item?.shouldHide} onChange={(e) => onChange({...item, shouldHide: !item?.shouldHide})}/>
                </TableCell>
                <TableCell style={{width: "15%"}}>
                    <div className={css.tableCell}>
                        <div className={css.randomIcon}><FontAwesomeIcon icon={faDiceD20} onClick={() => onChange({
                            ...item,
                            initiative: Math.floor(Math.random() * 20 + (1 + (item.initiativeBonus || 0)))
                        })} /></div>

                        <TextInput number value={item?.initiative} onChange={(value) => onChange({...item, initiative: value})} />
                        <Typography color="primary">+{item?.initiativeBonus || 0}</Typography>
                    </div>
                </TableCell>
                <TableCell style={{width: "65%"}}>
                        <TextInput  value={item?.name} onChange={(value) => onChange({...item, name: value})} />
                </TableCell>
                <TableCell style={{width: "10%"}}>
                    <div className={css.healthCell}>
                        <div ref={refs.setReference}  {...getReferenceProps()}>
                            <TextInput number value={item?.health} onChange={(value) => onChange({...item, health: value})} />
                        </div>
                        <Typography>/</Typography>
                        <TextInput number value={item?.maxHealth} onChange={(value) => onChange({...item, maxHealth: value})} />
                       
                    </div>
                </TableCell>
                <TableCell style={{width: "5%"}}>
                        <TextInput number value={item?.armorClass} onChange={(value) => onChange({...item, ac: value})} />
                </TableCell>
                <TableCell style={{width: "5%"}}>
                        <TextInput number value={item?.passivePerception} onChange={(value) => onChange({...item, passivePerception: value})} />
                </TableCell>
                <TableCell style={{width: "5%"}}>
                        <Switch checked={item?.shouldShowHealthBar} onChange={(e) => onChange({...item, shouldShowHealthBar: !item?.shouldShowHealthBar})}/>
                </TableCell>
                <TableCell style={{width: "10%"}}>
                        <Button onClick={onRemove} color="error">Delete</Button>
                </TableCell>
                {isHealthCounterOpen && (
                <div ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()}>
                    <div className={css.healthCounterContainer}>
                        <div>
                            <TextInput number value={healthIncrement} onChange={(value) => setHealthIncrement(Number(value))} />
                            <div className={css.counterButtons}>
                                <div className={css.minus} onClick={() => onChange({...item, health: Number(item?.health || 0) - Number(healthIncrement || 0)})}> <FontAwesomeIcon icon={faMinus} /></div>
                                <div className={css.plus} onClick={() => onChange({...item, health: Number(item?.health || 0) + Number(healthIncrement || 0)})}><FontAwesomeIcon icon={faPlus} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </TableRow>
    );
}

export default InitiativeTrackerTableRow;