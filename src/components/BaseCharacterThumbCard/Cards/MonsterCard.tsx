import React from "react";
import BaseCharacterThumbCard, { BaseCharacterThumbCardProps } from "../BaseCharacterThumbCard";
import { useDeleteCustomMonster } from "@services/CustomMonstersService";

declare interface MonsterCardProps extends BaseCharacterThumbCardProps {

}

const MonsterCard = ({ baseCharacter, onClickEdit = () => {} }: MonsterCardProps) => {

    const {mutate: remove, isLoading: isDeleting} = useDeleteCustomMonster(baseCharacter)

    return (
        <BaseCharacterThumbCard
            baseCharacter={baseCharacter}
            onClickEdit={onClickEdit}
            onClickDelete={remove}
            isDeleting={isDeleting}
        />
    )
}

export default MonsterCard;