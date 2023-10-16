import React, {useState} from "react";
import css from "./BaseCharacterThumbCard.module.scss"
import { Typography } from "../Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPenFancy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import Flip from "@components/AnimationComponentWrappers/Flip";
import CopyButton from "@components/Button/ReusableButtons/CopyButton";
import { BaseCharacter } from "@model/BaseCharacter";
import STICK from "@images/stick1.png"
import { LoadingButton } from "@components/Button/LoadingButton";

export declare interface BaseCharacterThumbCardProps {
    baseCharacter: BaseCharacter;
    onClickEdit?: (baseCharacter: BaseCharacter) => void;
    onClickDelete?: () => void;
    onClickMore?: () => void;
    isDeleting?: boolean;
}

const BaseCharacterThumbCard = ({ baseCharacter, onClickEdit, onClickDelete, onClickMore, isDeleting = false }: BaseCharacterThumbCardProps) => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

    return (
        <div key={`base-character-thumb-card-${baseCharacter.docId}`} className={`${css.baseCharacterThumbCard}`}>
           <Flip
                front={
                    <div>
                        <img
                            className={css.cardImage}
                            src={baseCharacter?.characterImageURL || STICK}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=STICK;
                            }}
                            alt="boo"
                        />
                        <Typography className={css.frontName} color="primary" weight="bold" size="large">{baseCharacter.name}</Typography>
                    </div>
                }
                back={
                    <div>
                        <div className={css.nameRow}>
                            {onClickEdit && <Button color="secondary" onClick={() => onClickEdit(baseCharacter)}><FontAwesomeIcon icon={faPenFancy} /></Button>}
                            <Typography color="primary" weight="bold" size="large">{baseCharacter.name}</Typography>
                            {onClickDelete && <LoadingButton isLoading={isDeleting} onClick={onClickDelete}><FontAwesomeIcon icon={faTrash}/></LoadingButton>}
                        </div>
                        <Typography color="light">{baseCharacter.backstory || baseCharacter.description}</Typography>
                        <div className={css.lowerButtons}>
                            { onClickMore &&  <Button color="secondary" onClick={() => setIsDetailsModalOpen(!isDetailsModalOpen)}><div className={css.moreButtonInner}><FontAwesomeIcon icon={faMagnifyingGlass} /> {" "} More</div></Button> }
                            {baseCharacter.characterImageURL && <CopyButton animatedHover={false} color="dark" copiedText={baseCharacter.characterImageURL}>Copy Image</CopyButton>}
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
        </div>
    )
}

export default BaseCharacterThumbCard;