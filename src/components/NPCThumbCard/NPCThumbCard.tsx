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
import CopyButton from "@components/Button/ReusableButtons/CopyButton";
import Flip from "@components/AnimationComponentWrappers/Flip";

declare interface NPCThumbCardProps {
    npc: NPC;
}

const NPCThumbCard = ({ npc }: NPCThumbCardProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const deleteButton = useDeleteNPCButton(npc, () => {});

    return (
        <div key={`npc-thumb-card-${npc.docId}`} className={`${css.NPCThumbCard}`}>
           <Flip
                front={
                    <div>
                        <img
                            className={css.cardImage}
                            src={npc.characterImageURL}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=STICK;
                            }}
                            alt="boo"
                        />
                        <Typography className={css.frontName} color="primary" weight="bold" size="large">{npc.name}</Typography>
                    </div>
                }
                back={
                    <div>
                        <div className={css.nameRow}>
                            {<Button color="secondary" onClick={() => setIsEditModalOpen(!isEditModalOpen)}><FontAwesomeIcon icon={faPenFancy} /></Button>}
                            <Typography color="primary" weight="bold" size="large">{npc.name}</Typography>
                            {(deleteButton)}
                        </div>
                        <Typography color="light">{npc.backstory}</Typography>
                        <div className={css.lowerButtons}>
                            <Button color="secondary" onClick={() => setIsDetailsModalOpen(!isDetailsModalOpen)}><div className={css.moreButtonInner}><FontAwesomeIcon icon={faMagnifyingGlass} /> {" "} More</div></Button>
                            <CopyButton animatedHover={false} color="dark" copiedText={npc.characterImageURL}>Copy Image</CopyButton>
                        </div>
                    </div>
                }
                perspective={400}
                springConfig={{ mass: 15, tension: 500, friction: 80 }}
                flipOnClick
                flipOnHover
                cardClassName={css.thumbCard}
                frontClassName={css.front}
                backClassName={css.back}
           />
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
