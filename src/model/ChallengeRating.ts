// Credit to stack overflow - https://stackoverflow.com/a/71700658
type Tuple<
  T,
  N extends number,
  R extends readonly T[] = [],
> = R["length"] extends N ? R : Tuple<T, N, readonly [T, ...R]>;

type CharacterXpThresholdsByLevel = Tuple<number, 20>;
enum DIFFICULTY {
  easy,
  medium,
  hard,
  deadly,
}

// TODO (churt): Maybe there is a formula? But the pattern didn't suggest it.
export const CharacterLevelEncounterXpThresholdsByDiffulty: Record<
  keyof typeof DIFFICULTY,
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
