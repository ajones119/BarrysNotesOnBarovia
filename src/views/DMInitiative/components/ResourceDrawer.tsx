import React, { useMemo, useState } from "react";
import ListItem from "@mui/material/ListItem";
import { Monster, useDndApiMonsters } from "@services/DndApiService";
import { IconButton, ListItemText, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SanityDrawer from "@components/Drawer/SanityDrawer";
import css from "./ResourceDrawer.module.scss";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "@emotion/styled";
import { useCustomMonsters } from "@services/CustomMonstersService";
import { useDebounce } from "usehooks-ts";

type ResourceDrawerProps = {
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
  name: string,
  listName: string,
  health: number,
  maxHealth: number,
  armorClass: number,
  initiativeBonus: number,
}

const ResourceDrawer = ({ onAdd }: ResourceDrawerProps) => {
  const { isLoading, monsters } = useDndApiMonsters();
  const { isLoading: isCustomMonsterLoading, monsters: customMonsters = [] } = useCustomMonsters();
  const [search, setSearch] = useState<string>();
  const searchValue = useDebounce(search, 250)
  const fullMonsterList = useMemo<DrawerMonster[]>(() => {
    if (!isLoading && !isCustomMonsterLoading) {
      const apiList: DrawerMonster[] = monsters.map(monster => (
        {
          name: monster.name,
          listName: monster.name,
          health: monster.hitPoints,
          maxHealth: monster.hitPoints,
          armorClass: monster.armorClass,
          initiativeBonus: Math.floor((monster.dexterity - 10) / 2),
        }
      ));

      const customList: DrawerMonster[] = customMonsters?.map(monster => (
        { 
          name: monster.name,
          listName: `${monster.name} (custom)`,
          health: monster.averageHitPoints || 0,
          maxHealth: monster.averageHitPoints || 0,
          armorClass: monster.armorClass || 0,
          initiativeBonus: Math.floor((monster.abilityScores.dexterity - 10) / 2),
        }
      ));

      const combinedList = apiList.concat(customList);
    
      return combinedList
    } else {
      return [];
    }
  }, [isLoading, isCustomMonsterLoading, searchValue])

  const filteredMonsters = useMemo(() => {
    return fullMonsterList.filter(
      (monster) => !searchValue || monster.name.toLowerCase().includes(searchValue.toLowerCase()),
    ).sort();
  }, [searchValue, fullMonsterList.length])

  if (isLoading || isCustomMonsterLoading) return;

  const handleMonsterAdd = (monster: DrawerMonster) => {
    onAdd?.(monster);
  };

  // TODO (churt): Find a way to memoize this. Due to how the fixed size list works, the search causes a ton of reruns of the memo.

  return (
    <SanityDrawer>
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
    </SanityDrawer>
  );
};

export default ResourceDrawer;
