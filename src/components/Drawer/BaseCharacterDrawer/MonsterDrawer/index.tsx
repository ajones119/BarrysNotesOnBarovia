import { DrawerProps } from "@components/Drawer";
import { BaseCharacter } from "@model/BaseCharacter";
import { useCreateCustomMonster, useEditCustomMonster } from "@services/CustomMonstersService";
import React from "react";
import CreateOrEditBaseCharacterDrawer from "..";

declare interface MonsterDrawerProps extends DrawerProps {
    editMonster?: BaseCharacter | null
}

const MonsterDrawer = ({
    isOpen, onClose = () => {}, editMonster
}: MonsterDrawerProps) => {

    const { mutate: create, isLoading: createLoading } = useCreateCustomMonster(onClose);
    const { mutate: edit, isLoading: editLoading } = useEditCustomMonster(editMonster, onClose);

    return (
        <CreateOrEditBaseCharacterDrawer editCharacter={editMonster} isOpen={isOpen} onClose={onClose} edit={edit} create={create} isLoading={createLoading || editLoading} />
    );

}

export default MonsterDrawer