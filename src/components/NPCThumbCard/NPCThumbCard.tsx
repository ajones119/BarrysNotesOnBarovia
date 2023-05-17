import React, {useState} from "react";
import { NPC } from "../../model/NPC";
import css from "./NPCThumbCard.module.scss"
import { Typography } from "../Typography/Typography";
import STICK from "../../images/stick1.png";
import { useDeleteNPCButton } from "../../service/NPCService";

declare interface NPCThumbCardProps {
    npc: NPC;
}

const NPCThumbCard = ({ npc }: NPCThumbCardProps) => {
    const [isActive, setIsActive] = useState(false);
    const deleteButton = useDeleteNPCButton(npc, () => {});

    return (
        <div className={`${css.NPCThumbCard} ${isActive && css.isActive}`} onClick={() => setIsActive(!isActive)}>
            <div className={css.imageContainer}>
            <img
                src={npc.characterImageURL}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src=STICK;
                }}
                width={300}
                alt="boo"
            /></div>
            <div className={`${css.nameContainer} ${isActive && css.isActive}`}>
                <Typography color="primary"> {npc.name}{" "}{isActive && (deleteButton)}</Typography>
            </div>
            { isActive && (
                <div className={css.backstoryContainer}>
                    <Typography>{npc.backstory}</Typography>
                </div>
            ) }
        </div>
    )
}

export default NPCThumbCard;