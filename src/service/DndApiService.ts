import { gql, useQuery } from '@apollo/client';

export const GET_MONSTERS = gql`
  query MonstersQuery($limit: Int!) {
    monsters(limit: $limit) {
      index
      name
      armor_class {
        value
      }
      hit_points
      dexterity
    }
  }
`;

type GQLMonsterResponse = {
  index: string;
  name: string;
  dexterity: number;
  armor_class: { value: number }[];
  hit_points: number;
}

type Monster = Omit<GQLMonsterResponse, "index" | "armor_class" | "hit_points"> & {
  id: string;
  armorClass: number;
  hitPoints: number;
}

export const useDndApiMonsters = (): { monsters: Monster[], isLoading: boolean } => {
  const { loading, error, data } = useQuery(GET_MONSTERS, { variables: { limit: 500 } });

  return {
    monsters: data?.monsters.map((monster: GQLMonsterResponse) => ({
      id: monster.index,
      armorClass: monster.armor_class[0].value,
      hitPoints: monster.hit_points,
      name: monster.name,
      dexterity: monster.dexterity
    })) ?? [],
    isLoading: loading
  };
}
