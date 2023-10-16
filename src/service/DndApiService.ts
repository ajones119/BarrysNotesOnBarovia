import { useQuery } from "react-query";

export const GET_MONSTERS = `https://api.open5e.com/v1/monsters/`;

type ApiMonsterResponse = {
  slug: string;
  name: string;
  type: string;
  dexterity: number;
  armor_class: number;
  hit_points: number;
};

export type Monster = Omit<ApiMonsterResponse, "armor_class" | "hit_points"> & {
  armorClass: number;
  hitPoints: number;
};

export const useDndApiMonsters = (): {
  monsters: Monster[];
  isLoading: boolean;
  error: unknown;
} => {
  const { isLoading, error, data } = useQuery<{
    results: ApiMonsterResponse[];
  }>({
    queryKey: ["apiMonsters"],
    queryFn: () =>
      fetch(
        `${GET_MONSTERS}?fields=${Object.keys({} as ApiMonsterResponse).join(
          ",",
        )}&limit=4000`,
      ).then((res) => res.json()),
  });

  return {
    monsters:
      data?.results
        ?.map<Monster>((monster: ApiMonsterResponse) => ({
          slug: monster.slug,
          type: monster.type,
          armorClass: monster.armor_class,
          hitPoints: monster.hit_points,
          name: monster.name,
          dexterity: monster.dexterity,
        }))
        .sort((a: Monster, b: Monster) => a.name.localeCompare(b.name)) ?? [],
    isLoading,
    error,
  };
};

export const useDndApiMonsterTypes = (): {
  monsterTypes: string[];
  isLoading: boolean;
  error: unknown;
} => {
  const { isLoading, error, data } = useQuery<ApiMonsterResponse[]>({
    queryKey: ["apiMonsters", "types"],
    queryFn: () =>
      fetch(
        `${GET_MONSTERS}?${Object.keys({} as ApiMonsterResponse).join(
          ",",
        )}&limit=4000`,
      ).then((res) => res.json()),
  });

  return {
    monsterTypes:
      data
        ?.filter(
          (monster: ApiMonsterResponse) => monster.type && monster.type !== "",
        )
        ?.map((monster: ApiMonsterResponse) => monster.type)
        .sort((a: string, b: string) => a.localeCompare(b)) ?? [],
    isLoading,
    error: error as string,
  };
};
