import React, {useState} from "react";
import { NPC } from "@model/NPC";
import css from "./NPCThumbCard.module.scss"
import { Typography } from "../Typography/Typography";
import STICK from "@images/stick1.png";
import { useDeleteNPCButton } from "@services/NPCService";
import CreateNPCModal from "../Modal/CreateNPCModal/CreateNPCModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import ShowNPCModal from "../Modal/ShowNPCModal/ShowNPCModal";

declare interface NPCThumbCardProps {
    npc: NPC;
}

const NPCThumbCard = ({ npc }: NPCThumbCardProps) => {
    const [isActive, setIsActive] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

    const deleteButton = useDeleteNPCButton(npc, () => {});

    return (
        <div key={`npc-thumb-card-${npc.docId}`}>
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
                    <Typography color="primary">
                        {isActive && <Button color="secondary" onClick={() => setIsEditModalOpen(!isEditModalOpen)}><FontAwesomeIcon icon={faPenFancy} /></Button>}
                        {isActive && <Button color="secondary" onClick={() => setIsDetailsModalOpen(!isDetailsModalOpen)}><FontAwesomeIcon icon={faMagnifyingGlass} /></Button>}
                        {" "}{npc.name}{" "}
                        {isActive && (deleteButton)}
                    </Typography>
                </div>
                { isActive && (
                    <div className={css.backstoryContainer}>
                        <Typography>{npc.backstory}</Typography>
                    </div>
                ) }
            </div>
            <CreateNPCModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                campaignId={npc.campaignDocId}
                npc={npc}
            />
            <ShowNPCModal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                npc={npc}
            />
        </div>
    )
}

export default NPCThumbCard;