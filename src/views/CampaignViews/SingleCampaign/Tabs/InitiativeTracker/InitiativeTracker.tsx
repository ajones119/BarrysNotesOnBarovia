import React, { useState } from "react";
import css from "./InitiativeTracker.module.scss"
import { TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import { Character } from "../../../../../model/Character";
import { useList } from "../../../../../hooks/useList";
import { Typography } from "../../../../../components/Typography/Typography";
import InitiativeTrackerTableRow from "./components/InitiativeTrackerTableRow";
import { Button } from "../../../../../components/Button/Button";
import { useUpdateInitiative } from "../../../../../service/InitiativeTrackerService";
import { Campaign } from "../../../../../model/Campaign";
import useDeepCompareEffect from "use-deep-compare-effect";

type InitiativeTrackerProps = {
    campaign: Campaign,
    characters: Array<Character>,
}

const InitiativeTracker = ({ campaign, characters}: InitiativeTrackerProps) => {
    const {
        insert,
        removeAt,
        replaceAt,
        sort,
        replaceList,
        listWithIds,
    } = useList([{},{},{},{},{}]);

    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    let nextIndex: number | null = null;
    if (activeIndex !== null) {
        nextIndex = activeIndex < listWithIds.length-1 ? activeIndex + 1 : 0;
    }

    const currentTurnId = listWithIds[nextIndex || 0]?.data?.docId;
    const nextTurnId = nextIndex !== null ? listWithIds[nextIndex < listWithIds.length-1 ? nextIndex + 1 : 0]?.data?.docId : listWithIds[1]?.data?.docId;

    const updateInitiativeButton = useUpdateInitiative(campaign, currentTurnId, nextTurnId, () => {setActiveIndex(activeIndex !== null ? nextIndex : 0)})

    const resetCharacters = () => {
        if (characters.length > 0) {
            const newList = characters?.map(character => ({
                name: character.name,
                docId: character.docId
            }))

            if (newList.length < 5){
                const length = newList.length;
                for(let i = 0; i < 5-length; i++) {
                    newList.push({name: "", docId: ""})
                }
            }

            replaceList(newList)
        } else {
            const newList = [];
            for(let i = 0; i < 5; i++) {
                newList.push({name: ""})
            }
            replaceList(newList)
        }
    }

    useDeepCompareEffect(() => {
        resetCharacters();
    }, [characters])


    return (
        <div className={css.initiativeTrackerContainer}>
            <div className={css.topButtonsRow}>
                <Button color="dark" onClick={() =>  navigator.clipboard.writeText(`https://ajones119.github.io/BarrysNotesOnBarovia/#/Initiative/${campaign.docId}`)}>Copy Player Link</Button>
                <Button color="dark" onClick={() =>  {}} disabled>Import (Not setup)</Button>
            </div>
            <TableContainer>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: "10%"}}>
                            <Typography color="light" size="large" weight="bolder">
                                Initiative
                            </Typography>
                        </TableCell>
                        <TableCell style={{width: "70%"}}>
                            <Typography color="light" size="large" weight="bolder">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell style={{width: "10%"}}>
                            <Typography color="light" size="large" weight="bolder">
                                Health
                            </Typography>
                        </TableCell>
                        <TableCell style={{width: "5%"}}>
                            <Typography color="light" size="large" weight="bolder">
                                AC
                            </Typography>
                        </TableCell>
                        <TableCell style={{width: "5%"}}>
                            <Typography color="light" size="large" weight="bolder">
                                PP
                            </Typography>
                        </TableCell>
                        <TableCell style={{width: "10%"}}>
                            <Typography color="light" size="large" weight="bolder">
                                Remove
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                {
                    listWithIds.map((item, index) => (
                        <InitiativeTrackerTableRow tableKey={item._id} active={index === activeIndex} item={item.data} onChange={(value) => replaceAt(index, {...value})} onRemove={() => removeAt(index)} />
                    ))
                }
            </TableContainer>
            <div className={css.bottonsContainer}>
                <Button onClick={() => insert({})}>ADD </Button>
                <Button onClick={() => sort("initiative")}>SORT</Button>
                <Button onClick={resetCharacters}>RESET</Button>
                { updateInitiativeButton }
            </div>
        </div>
    );
}

export default InitiativeTracker