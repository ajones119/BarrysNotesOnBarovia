import { BaseCharacter } from "@model/BaseCharacter";
import { Character } from "@model/Character";

// Credit to stack overflow - https://stackoverflow.com/a/71700658
type Tuple<
  T,
  N extends number,
  R extends readonly T[] = [],
> = R["length"] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

type CharacterXpThresholdsByLevel = Tuple<number, 20>;
export enum ENCOUNTER_DIFFICULTY {
  easy,
  medium,
  hard,
  deadly,
}

// TODO (churt): Maybe there is a formula? But the pattern didn't suggest it.
export const CharacterLevelEncounterXpThresholdsByDiffulty: Record<
  keyof typeof ENCOUNTER_DIFFICULTY,
  CharacterXpThresholdsByLevel
> = {
  easy: [
    25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400,
    1600, 2000, 2100, 2400, 2800,
  ],
  medium: [
    50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500,
    2800, 3200, 3900, 4200, 4900, 5700,
  ],
  hard: [
    75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800,
    4300, 4800, 5900, 6300, 7300, 8500,
  ],
  deadly: [
    100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100,
    5700, 6400, 7200, 8800, 9500, 10900, 12700,
  ],
};

const EncounterMultipliers = [1, 1.5, 2, 2.5, 3, 5];

export const getEncounterMultiplier = (
  monsterCount: number,
  playerCount: number,
): number => {
  let multiplierIndex = 0;

  if (monsterCount === 2) {
    multiplierIndex = 1;
  }

  if (monsterCount >= 3 && monsterCount <= 6) {
    multiplierIndex = 2;
  }

  if (monsterCount >= 7 && monsterCount <= 10) {
    multiplierIndex = 3;
  }

  if (monsterCount >= 11 && monsterCount <= 14) {
    multiplierIndex = 4;
  }

  if (monsterCount > 15) {
    multiplierIndex = 5;
  }

  if (playerCount < 3 && multiplierIndex < 5) {
    multiplierIndex += 1;
  }

  if (playerCount > 6) {
    // Special case for large parties and a single monster.
    if (monsterCount === 1) {
      return 0.5;
    }

    multiplierIndex -= 1;
  }

  return EncounterMultipliers[multiplierIndex];
};

export const getEncounterDifficulty = (
  monsters: BaseCharacter[],
  players: Character[],
): ENCOUNTER_DIFFICULTY => {
  // TODO (churt): get better at typescript.
  const partyDifficultyXpThresholds: Record<
    keyof typeof ENCOUNTER_DIFFICULTY,
    number
  > = {
    easy: players.reduce(
      (accumulator, currentValue) =>
        accumulator +
        CharacterLevelEncounterXpThresholdsByDiffulty.easy[
        currentValue.level as number
        ],
      0,
    ),
    medium: players.reduce(
      (accumulator, currentValue) =>
        accumulator +
        CharacterLevelEncounterXpThresholdsByDiffulty.medium[
        currentValue.level as number
        ],
      0,
    ),
    hard: players.reduce(
      (accumulator, currentValue) =>
        accumulator +
        CharacterLevelEncounterXpThresholdsByDiffulty.hard[
        currentValue.level as number
        ],
      0,
    ),
    deadly: players.reduce(
      (accumulator, currentValue) =>
        accumulator +
        CharacterLevelEncounterXpThresholdsByDiffulty.deadly[
        currentValue.level as number
        ],
      0,
    ),
  };

  const currentMonsterCost = monsters.reduce(
    (accumulator, currentValue) => accumulator + (currentValue.xp ?? 0),
    0,
  );

  const encounterMultipler = getEncounterMultiplier(
    monsters.length,
    players.length,
  );

  const encounterCost = currentMonsterCost * encounterMultipler;

  if (encounterCost <= partyDifficultyXpThresholds.easy) {
    return ENCOUNTER_DIFFICULTY.easy;
  }
  if (encounterCost <= partyDifficultyXpThresholds.medium) {
    return ENCOUNTER_DIFFICULTY.medium;
  }
  if (encounterCost <= partyDifficultyXpThresholds.hard) {
    return ENCOUNTER_DIFFICULTY.hard;
  }
  return ENCOUNTER_DIFFICULTY.deadly;
};
