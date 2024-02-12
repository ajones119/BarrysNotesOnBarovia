import React from "react";
import "../../App.css";
import Tavern from "@images/party.png";
import Castle from "@images/hauntedCastleBackground.jpg"
import CharacterNoBG from "@images/characterNoBackground.png"
import Party from "@images/party-no-background.png"
import NoBGMonster from '@images/monster2-no-background.png'
import MonsterBG from '@images/monster-background.jpg'

import css from "./Home.module.scss"
import HomeCard from "./components/HomeCard";
import { Typography } from "@components/Typography/Typography";

export const Home = () => {

  return(
    <div className={css.homePage}>
      <Typography color="tertiary" size="xx-large" fontStyle="rough" inderline>BARRY'S NOTES ON BAROVIA</Typography>

      <div className={css.homePageCards}>
          <HomeCard
            frontImage={CharacterNoBG}
            backImage={Tavern}
            title="Characters"
            href="/Characters/"
          />
          <HomeCard
            frontImage={Party}
            backImage={Castle}
            title="Campaigns"
            href="/Campaigns/"
          />
          <HomeCard
            frontImage={NoBGMonster}
            backImage={MonsterBG}
            title="Monsters"
            href="/Monsters/"
          />
      </div>
    </div>
  );
}
