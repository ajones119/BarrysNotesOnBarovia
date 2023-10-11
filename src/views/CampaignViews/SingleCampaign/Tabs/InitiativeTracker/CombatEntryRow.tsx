import React from "react";
import { TableCell, TableRow } from "@mui/material";

import { Button } from "@components/Button/Button";
import { useDeleteCombatButton } from "../../../../../service/CombatService";
import { Typography } from "@components/Typography/Typography";
import { Combat } from "@model/Combat";

type CombatEntryRowProps = {
    combat: Combat
}

export const CombatEntryRow = ({combat}: CombatEntryRowProps) => {
    const button = useDeleteCombatButton(combat, () => {})
    const islocalhost = window.location.host === "localhost:3000";
    console.log(window.location.host)

    return (
        <TableRow>
            <TableCell><Button onClick={() => window.open(`/${islocalhost ? 'BarrysNotesOnBarovia/#' :'BarrysNotesOnBarovia#'}/Initiative/DM/${combat.campaignDocId}/${combat.docId}`, '_blank')}>Open</Button></TableCell>
            <TableCell><Typography>{combat?.name}</Typography></TableCell>
            <TableCell>{button}</TableCell>
        </TableRow>
    )
}