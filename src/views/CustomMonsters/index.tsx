
import { Grid } from "@mui/material";
import React, { useState } from "react";
import css from "./CustomMonsters.module.scss"
import { TextInput } from "@components/TextInput/TextInput";
import { Spacer } from "@components/Spacer/Spacer";
import { Button } from "@components/Button/Button";

import { useCustomMonsters } from "@services/CustomMonstersService";
import { BaseCharacter } from "@model/BaseCharacter";
import BaseCharacterThumbCard from "@components/BaseCharacterThumbCard/BaseCharacterThumbCard";
import CreateOrEditMonsterDrawer from "@components/Drawer/BaseCharacterDrawer";
import MonsterCard from "@components/BaseCharacterThumbCard/Cards/MonsterCard";
import MonsterDrawer from "@components/Drawer/BaseCharacterDrawer/MonsterDrawer";

const CustomMonsters = () => {
    const [isMonsterDrawerOpen, setIsMonsterDrawerOpen] = useState(false);
    const [selectedMonster, setSelectedMonster] = useState<BaseCharacter | null>()
    const [nameFilter, setNameFilter] = useState<string>("");
  
    const { monsters } = useCustomMonsters();
   
    let filteredMonsters = monsters;
  
    if (nameFilter) {
      filteredMonsters = filteredMonsters?.filter((monster: BaseCharacter) => monster.name.toLowerCase().includes(nameFilter.trim().toLowerCase()));
    }
  
    filteredMonsters?.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  
    return (
      <div>
        <div>
          <Grid container justifyContent="space-evenly" spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <div className={css.characterSearch}>
                <TextInput placeholder="Search Character..." value={nameFilter} onChange={(value) => setNameFilter(String(value).trimStart())}/>
              </div>
            </Grid>
          <Grid item xs={12} md={4}>
            <div className={css.characterAddButtton}>
              <Button size="large" color="dark" borderColor="primary" onClick={() => setIsMonsterDrawerOpen(true)}>Add Monster</Button>
            </div>
          </Grid>
        </Grid>
        </div>
        <Spacer height={16} />
        <Grid container justifyContent="space-evenly" spacing={2} alignItems="center">
        {filteredMonsters?.map((monster) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={monster.docId}>
            <MonsterCard baseCharacter={monster} onClickEdit={monster => {
              setSelectedMonster(monster);
              setIsMonsterDrawerOpen(true)
        }} />
          </Grid>
        ))}
        </Grid>
        <MonsterDrawer editMonster={selectedMonster} onClose={() => {
            setIsMonsterDrawerOpen(false);
            setSelectedMonster(null)
          }}
          isOpen={isMonsterDrawerOpen} />
      </div>
    );
}

export default CustomMonsters;