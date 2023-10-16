import React from "react";
import BaseCharacterThumbCard, { BaseCharacterThumbCardProps } from "../BaseCharacterThumbCard";
import { useDeleteNPC } from "@services/NPCService";

declare interface NPCCardProps extends BaseCharacterThumbCardProps {
    removeOverride?: () => void
}

const NPCCard = ({ baseCharacter, onClickEdit, removeOverride }: NPCCardProps) => {

    const {mutate: remove, isLoading: isDeleting} = useDeleteNPC(baseCharacter)

    return (
        <BaseCharacterThumbCard
            baseCharacter={baseCharacter}
            onClickEdit={onClickEdit}
            onClickDelete={removeOverride || remove}
            isDeleting={isDeleting}
        />
    )
}

export default NPCCard;