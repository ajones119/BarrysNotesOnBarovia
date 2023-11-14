import React, { useState } from "react";
import { Modal } from "../Modal";
import { Grid } from "@mui/material";
import { TextInput } from "../../TextInput/TextInput";
import CampaignPicker from "../../CampaignPicker/CampaignPicker";
import ClassPicker from "../../ClassPicker/ClassPicker";
import TextArea from "../../TextArea/TextArea";

import css from "./CreateCharacterModal.module.scss";
import {
  useAddCharacterButton,
  useUpdateCharacterButton,
} from "@services/CharacterService";
import useDeepCompareEffect from "use-deep-compare-effect";
import { PlayerCharacter } from "@model/PlayerCharacter";

declare interface CreateCharacterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCampaignId?: string;
  character?: PlayerCharacter;
}

const CreateCharacterModal = ({
  isOpen,
  onClose,
  initialCampaignId,
  character = {name: ""},
}: CreateCharacterModalProps) => {
  const [newCharacter, setNewCharacter] = useState<PlayerCharacter>({...character, campaignDocId: initialCampaignId});
  const [validator, setValidator] = useState<any>();
  const [campaign, setCampaign] = useState();
  const saveCharacterButton = useAddCharacterButton(
    newCharacter,
    () => handleOnClose(),
    () => true,
  );
  const updateCharacterButton = useUpdateCharacterButton(
    newCharacter,
    () => handleOnClose(),
    () => true,
  );
  const {
    name,
    player,
    characterImageURL,
    backstory,
    className,
    dndBeyondURL,
    passivePerception,
    initiativeBonus,
    armorClass,
    maxHealth,
    level,
  } = newCharacter;
  useDeepCompareEffect(() => {
    setNewCharacter({...character, campaignDocId: initialCampaignId});
  }, [character, isOpen]);

  const handleOnClose = () => {
    onClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={handleOnClose}
        extraButtons={[
          character.docId ? updateCharacterButton : saveCharacterButton,
        ]}
      >
        <Grid
          container
          spacing={2}
          rowSpacing={3}
          className={css.CreateCharacterModal}
        >
          <Grid item lg={6} sm={12}>
            <TextInput
              error={validator?.name}
              value={name}
              onChange={(value) =>
                setNewCharacter({ ...newCharacter, name: String(value) })
              }
              placeholder="Name"
            />
          </Grid>
          <Grid item lg={6} sm={12}>
            <TextInput
              error={validator?.player}
              value={player}
              onChange={(value) =>
                setNewCharacter({ ...newCharacter, player: String(value) })
              }
              placeholder="Player"
            />
          </Grid>
          <Grid item lg={6} sm={12}>
            <TextInput
              error={validator?.characterImageURL}
              value={characterImageURL}
              onChange={(value) =>
                setNewCharacter({ ...newCharacter, characterImageURL: String(value) })
              }
              placeholder="Character Image Url"
            />
          </Grid>
          <Grid item lg={6} sm={12}>
            <TextInput
              error={validator?.dndBeyondURL}
              value={dndBeyondURL}
              onChange={(value) =>
                setNewCharacter({
                  ...newCharacter,
                  dndBeyondURL: String(value),
                })
              }
              placeholder="DnD Beyond Url"
            />
          </Grid>
          <Grid item lg={4} sm={12}>
            <CampaignPicker
              initialCampaignId={initialCampaignId}
              value={campaign}
              onChange={(campaign) => {
                setNewCharacter({
                  ...newCharacter,
                  campaignDocId: campaign.docId,
                });
                setCampaign(campaign);
              }}
            />
          </Grid>
          <Grid item lg={4} sm={12}>
            <ClassPicker
              value={className}
              onChange={(value) =>
                setNewCharacter({ ...newCharacter, className: value })
              }
            />
          </Grid>
          <Grid item lg={1} sm={6}>
            <TextInput
              number
              value={level}
              onChange={(value) =>
                setNewCharacter({ ...newCharacter, level: Number(value) })
              }
              placeholder="Level"
            />
          </Grid>
          <Grid item lg={1} sm={6}>
            <TextInput
              number
              value={initiativeBonus}
              onChange={(value) =>
                setNewCharacter({
                  ...newCharacter,
                  initiativeBonus: Number(value),
                })
              }
              placeholder="Initiative Bonus"
            />
          </Grid>
          <Grid item lg={1} sm={6}>
            <TextInput
              number
              value={passivePerception}
              onChange={(value) =>
                setNewCharacter({
                  ...newCharacter,
                  passivePerception: Number(value || 0),
                })
              }
              placeholder="Passive Percep."
            />
          </Grid>
          <Grid item lg={1} sm={6}>
            <TextInput
              number
              value={armorClass}
              onChange={(value) =>
                setNewCharacter({
                  ...newCharacter,
                  armorClass: Number(value || 0),
                })
              }
              placeholder="AC"
            />
          </Grid>
          <Grid item lg={1} sm={6}>
            <TextInput
              number
              value={maxHealth}
              onChange={(value) =>
                setNewCharacter({
                  ...newCharacter,
                  maxHealth: Number(value || 0),
                })
              }
              placeholder="Max Health"
            />
          </Grid>
          <Grid item sm={12}>
            <TextArea
              value={backstory || ""}
              onChange={(value) =>
                setNewCharacter({ ...newCharacter, backstory: value })
              }
              rows={5}
            />
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default CreateCharacterModal;
