import React from "react";
import BaseCharacterThumbCard, { BaseCharacterThumbCardProps } from "../BaseCharacterThumbCard";
import { useDeleteNPC } from "@services/NPCService";

declare interface NPCCardProps extends BaseCharacterThumbCardProps {
    removeOverride?: (docId: string) => void
}

const NPCCard = ({ baseCharacter, onClickEdit, removeOverride }: NPCCardProps) => {

    const {mutate: remove, isLoading: isDeleting} = useDeleteNPC()

    return (
        <BaseCharacterThumbCard
            baseCharacter={baseCharacter}
            onClickEdit={onClickEdit}
            onClickDelete={() => removeOverride ? removeOverride(baseCharacter?.docId || "") : remove(baseCharacter?.docId || "")}
            isDeleting={isDeleting}
        />
    )
}

export default NPCCard;