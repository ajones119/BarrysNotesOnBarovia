import React, {useState } from "react";
import "../../App.css";
import css from "./Characters.module.scss"

import { CharacterThumbCard } from "@components/CharacterThumbCard/CharacterThumbCard";
import { Grid, Typography } from "@mui/material"
import { useCharacters } from "@services/CharacterService";
import CampaignPicker from "@components/CampaignPicker/CampaignPicker";
import { Campaign } from "@model/Campaign";
import { Spacer } from "@components/Spacer/Spacer";
import { TextInput } from "@components/TextInput/TextInput";
import { Button } from "@components/Button/Button";
import { PlayerCharacter } from "@model/PlayerCharacter";
import PlayerCharacterDrawer from "@components/Drawer/BaseCharacterDrawer/PlayerCharacterDrawer";

//add loading state
//double check spacing of header/search bar on smaller screens

export const Characters = () => {
  const [openCharacterDrawer, setOpenCharacterDrawer] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<PlayerCharacter | null>(null)
  const [campaignFilter, setCampaignFilter] = useState<Campaign | null>(null);
  const [characterFilter, setCharacterFilter] = useState<string>("");

  const {characters } = useCharacters();
 
  let filteredCharacters = characters;

  if (campaignFilter && campaignFilter.docId !== "__none__") {
    filteredCharacters = filteredCharacters?.filter((character: PlayerCharacter) => character.campaignDocId === campaignFilter.docId);
  }

  if (characterFilter) {
    filteredCharacters = filteredCharacters?.filter((character: PlayerCharacter) => character.name.toLowerCase().includes(characterFilter.trim().toLowerCase()));
  }

  filteredCharacters?.sort(function (a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return (
    <div className={css.pageContainer}>
      <div>
        <Grid container justifyContent="space-evenly" spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <CampaignPicker
              onChange={(campaign) => setCampaignFilter(campaign)}
              value={campaignFilter}
              width={300}
              label="Filter By Campaign"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={css.characterSearch}>
              <TextInput placeholder="Search Character..." value={characterFilter} onChange={(value) => setCharacterFilter(String(value).trimStart())}/>
            </div>
          </Grid>
        <Grid item xs={12} md={4}>
          <div className={css.characterAddButtton}>
            <Button size="large" color="dark" onClick={() => setOpenCharacterDrawer(true)}><Typography size="large">Add Character</Typography></Button>
          </div>
        </Grid>
      </Grid>
      </div>
      <Spacer height={16} />
      <Grid container justifyContent="space-evenly" spacing={2} alignItems="center">
      {filteredCharacters?.map((character) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={character.docId}>
          <CharacterThumbCard character={character} onClick={(character) => {
            setSelectedCharacter(character);
            setOpenCharacterDrawer(true)
          }} />
        </Grid>
      ))}
      </Grid>
      <PlayerCharacterDrawer
        isOpen={openCharacterDrawer}
        editCharacter={selectedCharacter}
        onClose={() => {
          setSelectedCharacter(null)
          setOpenCharacterDrawer(!openCharacterDrawer)
        }}
      />
    </div>
  );
};

export default Characters;
