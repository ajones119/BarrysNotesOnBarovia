import { DrawerProps } from "@components/Drawer";
import { BaseCharacter } from "@model/BaseCharacter";
import React from "react";
import CreateOrEditBaseCharacterDrawer from "..";
import { useCreateNPC, useEditNPC } from "@services/NPCService";

declare interface NPCDrawerProps extends DrawerProps {
  editNPC?: BaseCharacter | null;
  campaignDocId: string;
}

const NPCDrawer = ({
  isOpen,
  onClose = () => {},
  editNPC,
  campaignDocId,
}: NPCDrawerProps) => {
  const { mutate: create, isLoading: createLoading } = useCreateNPC(onClose);
  const { mutate: edit, isLoading: editLoading } = useEditNPC(editNPC, onClose);

  return (
    <CreateOrEditBaseCharacterDrawer
      editCharacter={editNPC}
      isOpen={isOpen}
      onClose={onClose}
      isNpc
      edit={(npc: BaseCharacter) => edit({ ...npc, campaignDocId })}
      create={(npc: BaseCharacter) => create({ ...npc, campaignDocId })}
      isLoading={createLoading || editLoading}
    />
  );
};

export default NPCDrawer;
