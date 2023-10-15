import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import { Monster, useDndApiMonsters } from "@services/DndApiService";
import { IconButton, ListItemText, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SanityDrawer from "@components/Drawer/SanityDrawer";
import css from "./ResourceDrawer.module.scss";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "@emotion/styled";

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
      <ListItemText primary={monster.name} />
    </ListItem>
  );
};

const ResourceDrawer = ({ onAdd }: ResourceDrawerProps) => {
  const { isLoading, monsters } = useDndApiMonsters();

  const [search, setSearch] = useState<string>();

  if (isLoading || monsters.length === 0) return;

  const handleMonsterAdd = (monster: Monster) => {
    const monsterItem = {
      name: monster.name,
      health: monster.hitPoints,
      maxHealth: monster.hitPoints,
      armorClass: monster.armorClass,
      initiativeBonus: Math.floor((monster.dexterity - 10) / 2),
    };
    onAdd?.(monsterItem);
  };

  // TODO (churt): Find a way to memoize this. Due to how the fixed size list works, the search causes a ton of reruns of the memo.
  const filteredMonsters = monsters.filter(
    (monster) => !search || monster.name.toLowerCase().includes(search),
  );

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
          InputProps={{
            style: {
              color: "#dbe9ee",
            },
          }}
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
