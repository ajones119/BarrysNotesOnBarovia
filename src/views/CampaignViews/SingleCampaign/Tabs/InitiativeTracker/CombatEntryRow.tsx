import React from "react";
import { TableCell, TableRow } from "@mui/material";

import { Button } from "@components/Button/Button";
import { useDeleteCombat } from "@services/CombatService";
import { Typography } from "@components/Typography/Typography";
import { Combat } from "@model/Combat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

type CombatEntryRowProps = {
    combat: Combat
}

export const CombatEntryRow = ({combat}: CombatEntryRowProps) => {
    const {mutate, isLoading} = useDeleteCombat()
    const islocalhost = window.location.host === "localhost:3000";

    return (
        <TableRow>
            <TableCell><Button onClick={() => window.open(`/${islocalhost ? 'BarrysNotesOnBarovia/#' :'BarrysNotesOnBarovia#'}/Initiative/DM/${combat.campaignDocId}/${combat.docId}`, '_blank')}>Open</Button></TableCell>
            <TableCell><Typography>{combat?.name}</Typography></TableCell>
            <TableCell><Button color="error" isLoading={isLoading} onClick={() => mutate(combat?.docId || "")}><FontAwesomeIcon icon={faTrash} /></Button></TableCell>
        </TableRow>
    )
}