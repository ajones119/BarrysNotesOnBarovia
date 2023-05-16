import React, { useEffect, useState } from "react";
import "../../App.css";
import css from "./Characters.module.scss"

import { CharacterThumbCard } from "../../components/CharacterThumbCard/CharatcerThumbCard";
import { Grid, TextField } from "@mui/material"
import { Character } from "../../model/Character";
import { useCharacters } from "../../service/CharacterService";
import { Typography } from "../../components/Typography/Typography";
import CampaignPicker from "../../components/CampaignPicker/CampaignPicker";
import { Campaign } from "../../model/Campaign";
import { Spacer } from "../../components/Spacer/Spacer";
import { TextInput } from "../../components/TextInput/TextInput";
import { Button } from "../../components/Button/Button";
import CreateCharacterModal from "../../components/Modal/CreateCharacterModal/CreateCharacterModal";

//add loading state
//double check spacing of header/search bar on smaller screens

export const Characters = () => {
  const [openCharacterModal, setOpenCharacterModal] = useState(false);
  const [campaignFilter, setCampaignFilter] = useState<Campaign | null>(null);
  const [characterFilter, setCharacterFilter] = useState<string>("");

  const {characters, isLoading } = useCharacters();
 
  let filteredCharacters = characters;

  if (campaignFilter && campaignFilter.docId !== "__none__") {
    filteredCharacters = filteredCharacters?.filter((character: Character) => character.campaignDocId === campaignFilter.docId);
  }

  if (characterFilter) {
    filteredCharacters = filteredCharacters?.filter((character: Character) => character.name.toLowerCase().includes(characterFilter.trim().toLowerCase()));
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
    <div className="characters">
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
              <TextInput placeholder="Search Character..." value={characterFilter} onChange={(value) => setCharacterFilter(value.trimStart())}/>
            </div>
          </Grid>
        <Grid item xs={12} md={4}>
          <div className={css.characterAddButtton}>
            <Button size="large" color="dark" onClick={() => setOpenCharacterModal(true)}>Add Character</Button>
          </div>
        </Grid>
      </Grid>
      </div>
      <Spacer height={16} />
      <Grid container justifyContent="space-evenly" spacing={2} alignItems="center">
      {filteredCharacters?.map((character) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={character.docId}>
          <CharacterThumbCard character={character} />
        </Grid>
      ))}
      </Grid>
      <CreateCharacterModal onClose={() => {
          setOpenCharacterModal(false);
        }}
        isOpen={openCharacterModal} />
    </div>
  );
};

export default Characters;
