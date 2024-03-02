import React, {useState} from "react";
import css from "./BaseCharacterThumbCard.module.scss"
import { Typography } from "../Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPenFancy, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../Button/Button";
import Flip from "@components/AnimationComponentWrappers/Flip";
import CopyButton from "@components/Button/ReusableButtons/CopyButton";
import { BaseCharacter, CharacterTypeLowercase } from "@model/BaseCharacter";
import STICK from "@images/stick1.png"
import { BASE_CHARACTER_IMAGE_MAP } from "utils/getBaseCharacterGenericImage";
import ViewImageModal from "@components/Modal/ImageModal";

export declare interface BaseCharacterThumbCardProps {
    baseCharacter: BaseCharacter;
    onClickEdit?: (baseCharacter: BaseCharacter) => void;
    onClickDelete?: () => void;
    onClickMore?: () => void;
    isDeleting?: boolean;
}

const BaseCharacterThumbCard = ({ baseCharacter, onClickEdit, onClickDelete, onClickMore, isDeleting = false }: BaseCharacterThumbCardProps) => {
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    const getCardImage = () => {
        let image = STICK;

        if (baseCharacter?.characterImageURL) {
            image = String(baseCharacter.characterImageURL);
        } else if (baseCharacter?.type) {
            const type = baseCharacter.type.toLowerCase() as CharacterTypeLowercase
            image = BASE_CHARACTER_IMAGE_MAP[type || "unknown"]
        }

        return image;
    }

    return (
        <div key={`base-character-thumb-card-${baseCharacter.docId}`} className={`${css.baseCharacterThumbCard}`}>
            <Flip
                front={
                    <div>
                        <img
                            className={css.cardImage}
                            src={getCardImage()}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src=STICK;
                            }}
                            alt="boo"
                        />
                        <Typography
                            className={css.frontName}
                            color="tertiary"
                            fontStyle="secondary"

                            size="large"
                        >{baseCharacter.name}</Typography>
                    </div>
                }
                back={
                    <div>
                        <div className={css.nameRow}>
                            {onClickEdit && <Button color="secondary" onClick={() => onClickEdit(baseCharacter)}><FontAwesomeIcon icon={faPenFancy} /></Button>}
                            <Typography color="primary" weight="bold" size="large">{baseCharacter.name}</Typography>
                            {onClickDelete && <Button isLoading={isDeleting} onClick={onClickDelete} color="error"><FontAwesomeIcon icon={faTrash}/></Button>}
                        </div>
                        <Typography color="light">{baseCharacter.backstory || baseCharacter.description}</Typography>
                        <div className={css.lowerButtons}>
                            { onClickMore &&  <Button color="secondary" onClick={() => setIsDetailsModalOpen(!isDetailsModalOpen)}><div className={css.moreButtonInner}><FontAwesomeIcon icon={faMagnifyingGlass} /> {" "} More</div></Button> }
                            {
                            baseCharacter.characterImageURL &&
                                <CopyButton
                                    animatedHover={false}
                                    color="dark"
                                    copiedText={String(baseCharacter.characterImageURL)}
                                    onClick={() => setIsImageModalOpen(true)}
                                >
                                    View Image
                                </CopyButton>}
                        </div>
                    </div>
                }
                perspective={400}
                springConfig={{ mass: 10, tension: 500, friction: 100 }}
                flipOnClick
                cardClassName={css.thumbCard}
                frontClassName={css.front}
                backClassName={css.back}
           />
           <ViewImageModal
                isOpen={isImageModalOpen}
                onClose={() => {
                    setIsImageModalOpen(false);
                }}
                imageURL={String(baseCharacter.characterImageURL)}
            />
        </div>
    )
}

export default BaseCharacterThumbCard;