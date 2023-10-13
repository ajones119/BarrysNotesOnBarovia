import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Monster, useDndApiMonsters } from "@services/DndApiService";
import Drawer from "@components/Drawer";
import { IconButton, ListItemText, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type ResourceDrawerProps = {
  onAdd?: (data: any) => void;
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

  return (
    <Drawer>
      <div style={{ padding: "16px" }}>
        <TextField
          id="monster-search"
          variant="outlined"
          label="Monster Search"
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(event.target.value);
          }}
          value={search}
        />
        <Box>
          <List>
            {monsters
              .filter(
                (monster) =>
                  !search || monster.name.toLowerCase().includes(search),
              )
              .map((monster) => (
                <ListItem
                  key={monster.id}
                  secondaryAction={
                    <IconButton
                      onClick={() => {
                        handleMonsterAdd(monster);
                      }}
                      edge="end"
                    >
                      <AddIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={monster.name} />
                </ListItem>
              ))}
          </List>
        </Box>
      </div>
    </Drawer>
  );
};

export default ResourceDrawer;
