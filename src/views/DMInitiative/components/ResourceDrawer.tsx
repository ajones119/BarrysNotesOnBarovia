import React, { useMemo, useState } from "react";
import ListItem from "@mui/material/ListItem";
import { useDndApiMonsters } from "@services/DndApiService";
import { IconButton, ListItemText, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import css from "./ResourceDrawer.module.scss";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "@emotion/styled";
import { useCustomMonsters } from "@services/CustomMonstersService";
import { useDebounce } from "usehooks-ts";
import { BASE_ABILITY_SCORES, BaseCharacter, CharacterType } from "@model/BaseCharacter";
import { MonsterXPByChallengeRating } from "@model/ChallengeRating";
import { useCampaignNPCs } from "@services/NPCService";
import Drawer from "@components/Drawer";

type ResourceDrawerProps = {
  isOpen?: boolean,
  onClose: () => void,
  campaignDocId: string,
  onAdd?: (data: any) => void;
};

const StyledSearch = styled(TextField)({
  "& label": {
    color: "#dbe9ee",
  },
  "& label.Mui-focused": {
    color: "#dbe9ee",
  },
  "& .MuiOutlinedInput-input": {
    color: "#dbe9ee",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#f4d58d",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#f4d58d",
    },
    "&:hover fieldset": {
      borderColor: "#f4d58d",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f4d58d",
    },
  },
});

const Row = (props: ListChildComponentProps) => {
  const { monsters, handleMonsterAdd } = props.data;
  const monster = monsters[props.index];

  return (
    <ListItem
      key={monster.id}
      style={props.style}
      secondaryAction={
        <IconButton
          onClick={() => {
            handleMonsterAdd(monster);
          }}
          edge="end"
          className={css.icon}
        >
          <AddIcon />
        </IconButton>
      }
    >
      <ListItemText primary={monster.listName} />
    </ListItem>
  );
};

type DrawerMonster = {
  name: string;
  listName: string;
  health: number;
  maxHealth: number;
  armorClass: number;
  initiativeBonus: number;
  size: string;
  xp: number;
  type?: CharacterType | null;
  imageURL?: string;
};

const ResourceDrawer = ({ isOpen = false, onAdd, campaignDocId, onClose }: ResourceDrawerProps) => {
  const { isLoading, monsters } = useDndApiMonsters();
  const { isLoading: isCustomMonsterLoading, monsters: customMonsters = [] } =
    useCustomMonsters();
  const {isLoading: npcsLoading, NPCs = []} = useCampaignNPCs(campaignDocId);

  const [search, setSearch] = useState<string>();
  const searchValue = useDebounce(search, 250);
  const fullMonsterList = useMemo<DrawerMonster[]>(() => {
    if (!isLoading && !isCustomMonsterLoading && !npcsLoading) {
      const apiList: DrawerMonster[] = monsters.map((monster) => ({
        name: monster.name,
        listName: monster.name,
        health: monster.hitPoints,
        maxHealth: monster.hitPoints,
        armorClass: monster.armorClass,
        size: monster.size?.toLocaleLowerCase() || "medium",
        initiativeBonus: Math.floor((monster.dexterity - 10) / 2),
        type: (monster?.type as CharacterType) || "",
        xp: MonsterXPByChallengeRating[monster.challengeRating] ?? 1,
      }));

      const customList: DrawerMonster[] = customMonsters?.map((monster: BaseCharacter) => ({
        name: monster.name,
        listName: `${monster.name} (custom)`,
        health: monster.averageHitPoints || 0,
        maxHealth: monster.averageHitPoints || 0,
        armorClass: monster.armorClass || 0,
        initiativeBonus:
          Math.floor(((monster?.abilityScores || BASE_ABILITY_SCORES).dexterity - 10) / 2) || 0,
        type: monster.type || null,
        imageURL: String(monster?.characterImageURL) || "",
        xp: monster.xp ?? 0,
        size: monster.size?.toLocaleLowerCase() || "medium",
      }));

      const npcList: DrawerMonster[] = NPCs?.map((npc: BaseCharacter) => ({
        name: npc.name,
        listName: `${npc.name} (Campaign NPC)`,
        health: npc.averageHitPoints || 0,
        maxHealth: npc.averageHitPoints || 0,
        armorClass: npc.armorClass || 0,
        initiativeBonus:
          Math.floor(((npc?.abilityScores || BASE_ABILITY_SCORES).dexterity - 10) / 2) || 0,
        type: npc.type || null,
        imageURL: String(npc?.characterImageURL) || "",
        xp: npc.xp ?? 0,
        size: npc.size?.toLocaleLowerCase() || "medium",
      }));

      const combinedList = apiList.concat(customList).concat(npcList);

      return combinedList.sort();
    } else {
      return [];
    }
  }, [isLoading, isCustomMonsterLoading, searchValue, npcsLoading]);

  const filteredMonsters = useMemo(() => {
    return fullMonsterList
      .filter(
        (monster) =>
          !searchValue ||
          monster.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
      .sort();
  }, [searchValue, fullMonsterList.length]);

  if (isLoading || isCustomMonsterLoading || npcsLoading) return;

  const handleMonsterAdd = (monster: DrawerMonster) => {
    onAdd?.(monster);
  };

  // TODO (churt): Find a way to memoize this. Due to how the fixed size list works, the search causes a ton of reruns of the memo.

  return (
    <Drawer isOpen={isOpen} side="left" onClose={onClose}>
      <div className={css.resourceDrawer}>
        <StyledSearch
          id="monster-search"
          variant="outlined"
          label="Monster Search"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <div className={css.resourceList}>
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                itemSize={45}
                width={width}
                height={height}
                itemData={{
                  monsters: filteredMonsters,
                  handleMonsterAdd,
                }}
                itemCount={filteredMonsters.length}
              >
                {Row}
              </FixedSizeList>
            )}
          </AutoSizer>
        </div>
      </div>
    </Drawer>
  );
};

export default ResourceDrawer;
