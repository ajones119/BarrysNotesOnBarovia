import React, { useEffect, useState } from "react";
import Drawer, { DrawerProps } from "..";
import {
  BASE_ABILITY_SCORES,
  BaseCharacter,
  CharacterSizes,
  CharacterType,
  SavingThrow,
} from "@model/BaseCharacter";
import css from "./BaseCharacterDrawer.module.scss";
import { Grid } from "@mui/material";
import { TextInput } from "@components/TextInput/TextInput";
import SizeSelect from "@components/Selects/SizeSelect";
import CharacterTypeSelect from "@components/Selects/CharatcerTypeSelect";
import TextEditor from "@components/TextEditor";
import { Typography } from "@components/Typography/Typography";
import SavingThrowSelect from "@components/Selects/SavingThrowSelect";
import SkillsSelect from "@components/Selects/SkillsSelect";
import { Button } from "@components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LoadingButton } from "@components/Button/LoadingButton";
import { calculateAbilityScoreModifier } from "./utils";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

declare interface BaseCharacterProps extends DrawerProps {
  editCharacter?: BaseCharacter | null;
  edit: (character: BaseCharacter) => void;
  create: (character: BaseCharacter) => void;
  isLoading?: boolean;
  isNpc?: boolean;
}

const BaseCharacterDrawer = ({
  isOpen,
  onClose = () => {},
  editCharacter,
  edit,
  create,
  isLoading = false,
  isNpc = false,
}: BaseCharacterProps) => {
  const [character, setCharacter] = useState<BaseCharacter>({
    docId: "",
    name: "",
    abilityScores: BASE_ABILITY_SCORES,
  });

  useEffect(() => {
    setCharacter(
      editCharacter || {
        name: "",
        abilityScores: BASE_ABILITY_SCORES,
      },
    );
  }, [isOpen]);

  const abilityScores = character?.abilityScores || BASE_ABILITY_SCORES;

  return (
    <Drawer side="bottom" isOpen={isOpen} onClose={onClose}>
      <div className={css.characterDrawer}>
        <Grid container justifyContent="end" spacing={2}>
          <Grid item>
            <LoadingButton
              color="success"
              isLoading={isLoading}
              onClick={() => {
                editCharacter ? edit(character) : create(character);
              }}
            >
              <Typography size="large" color="dark">
                Submit
              </Typography>
            </LoadingButton>
          </Grid>
          <Grid item>
            <Button color="dark" borderColor="light" onClick={onClose}>
              <Typography color="light" size="large">
                <FontAwesomeIcon icon={faXmarkCircle} />
              </Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} rowGap={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              value={character?.name}
              onChange={(value) =>
                setCharacter({ ...character, name: String(value) })
              }
              placeholder="Name"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SizeSelect
              value={character.size}
              onChange={(value: CharacterSizes) =>
                setCharacter({ ...character, size: value })
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CharacterTypeSelect
              value={character.type}
              onChange={(value: CharacterType) =>
                setCharacter({ ...character, type: value })
              }
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextInput
              value={character?.characterImageURL}
              onChange={(value) =>
                setCharacter({ ...character, characterImageURL: String(value) })
              }
              placeholder="Image URL"
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <TextInput
              value={character?.averageHitPoints}
              onChange={(value) =>
                setCharacter({ ...character, averageHitPoints: Number(value) })
              }
              placeholder="Average Hit Points"
              number
            />
          </Grid>
          <Grid item xs={12} md={2}>
            {isNpc ? (
              <TextInput
                value={character?.level ?? 1}
                onChange={(value) =>
                  setCharacter({ ...character, level: Number(value) })
                }
                placeholder="Level"
                number
              />
            ) : (
              <TextInput
                value={character?.xp ?? 0}
                onChange={(value) =>
                  setCharacter({ ...character, xp: Number(value) })
                }
                placeholder="XP"
                number
              />
            )}
          </Grid>
          <Grid item xs={4} md={2}>
            <TextInput
              value={character?.speed}
              onChange={(value) =>
                setCharacter({ ...character, speed: Number(value) })
              }
              placeholder="Speed"
              number
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextInput
              value={character?.armorClass}
              onChange={(value) =>
                setCharacter({ ...character, armorClass: Number(value) })
              }
              placeholder="Armor Class"
              number
            />
          </Grid>
          <Grid item xs={4} md={2}>
            <TextInput
              value={character?.passivePerception}
              onChange={(value) =>
                setCharacter({ ...character, passivePerception: Number(value) })
              }
              placeholder="Passive Percep"
              number
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextInput
              value={abilityScores?.strength}
              onChange={(value) => {
                const scores = {
                  ...abilityScores,
                  strength: Number(value),
                };
                setCharacter({ ...character, abilityScores: scores });
              }}
              placeholder={`Strength (${calculateAbilityScoreModifier(
                abilityScores.strength,
              )})`}
              number
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextInput
              value={abilityScores.dexterity}
              onChange={(value) => {
                const scores = {
                  ...abilityScores,
                  dexterity: Number(value),
                };
                setCharacter({ ...character, abilityScores: scores });
              }}
              placeholder={`Dexterity (${calculateAbilityScoreModifier(
                abilityScores.dexterity,
              )})`}
              number
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextInput
              value={abilityScores?.constitution}
              onChange={(value) => {
                const scores = {
                  ...abilityScores,
                  constitution: Number(value),
                };
                setCharacter({ ...character, abilityScores: scores });
              }}
              placeholder={`Constitution ${calculateAbilityScoreModifier(
                abilityScores.constitution,
              )}`}
              number
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextInput
              value={abilityScores?.intelligence}
              onChange={(value) => {
                const scores = {
                  ...abilityScores,
                  intelligence: Number(value),
                };
                setCharacter({ ...character, abilityScores: scores });
              }}
              placeholder={`Intelligence (${calculateAbilityScoreModifier(
                abilityScores.intelligence,
              )})`}
              number
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextInput
              value={abilityScores?.wisdom}
              onChange={(value) => {
                const scores = {
                  ...abilityScores,
                  wisdom: Number(value),
                };
                setCharacter({ ...character, abilityScores: scores });
              }}
              placeholder={`Wisdom (${calculateAbilityScoreModifier(
                abilityScores.wisdom,
              )})`}
              number
            />
          </Grid>
          <Grid item xs={4} md={1}>
            <TextInput
              value={abilityScores?.charisma}
              onChange={(value) => {
                const scores = {
                  ...abilityScores,
                  charisma: Number(value),
                };
                setCharacter({ ...character, abilityScores: scores });
              }}
              placeholder={`Charisma (${calculateAbilityScoreModifier(
                abilityScores.charisma,
              )})`}
              number
            />
          </Grid>

          <Grid item xs={12} md={2}>
            <SavingThrowSelect
              value={character.savingThrowProficiencies || []}
              onChange={(value: SavingThrow[]) =>
                setCharacter({ ...character, savingThrowProficiencies: value })
              }
            />
          </Grid>

          <Grid item xs={4} md={1}>
            <TextInput
              value={character?.proficiencyBonus}
              onChange={(value) =>
                setCharacter({ ...character, proficiencyBonus: Number(value) })
              }
              placeholder="Prof. Bonus"
              number
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <SkillsSelect
              value={character.skillProficiencies || []}
              onChange={(value: SavingThrow[]) =>
                setCharacter({ ...character, skillProficiencies: value })
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography color="primary">Description</Typography>
            <TextEditor
              height={400}
              preview="edit"
              value={character?.description || ""}
              onChange={(value) =>
                setCharacter({ ...character, description: String(value) })
              }
              placeholder="Description"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography color="primary">Actions</Typography>
            <TextEditor
              height={400}
              preview="edit"
              value={character?.actions || ""}
              onChange={(value) =>
                setCharacter({ ...character, actions: String(value) })
              }
              placeholder="Actions"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography color="primary">Bonus Actions</Typography>
            <TextEditor
              height={400}
              preview="edit"
              value={character?.bonusActions || ""}
              onChange={(value) =>
                setCharacter({ ...character, bonusActions: String(value) })
              }
              placeholder="Bonus Actions"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography color="primary">Reactions</Typography>
            <TextEditor
              height={400}
              preview="edit"
              value={character?.reactions || ""}
              onChange={(value) =>
                setCharacter({ ...character, reactions: String(value) })
              }
              placeholder="Reactions"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography color="primary">Legendary Actions</Typography>
            <TextEditor
              height={400}
              preview="edit"
              value={character?.legendaryActions || ""}
              onChange={(value) =>
                setCharacter({ ...character, legendaryActions: String(value) })
              }
              placeholder="Legendary Actions"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography color="primary">Lair Actions</Typography>
            <TextEditor
              height={400}
              preview="edit"
              value={character?.lairActions || ""}
              onChange={(value) =>
                setCharacter({ ...character, lairActions: String(value) })
              }
              placeholder="Lair Actions"
            />
          </Grid>
        </Grid>
      </div>
    </Drawer>
  );
};

export default BaseCharacterDrawer;
