import React from "react";
import "../../App.css";
import Party from "../../images/party.png";
import Castle from "../../images/hauntedCastleBackground.jpg"
import { HomeCard } from "../../components/HomeCard/HomeCard";
import { CursorFollowingPointer } from "../../components/CursorFollowingPointer/CursorFollowingPointer";
import css from "./Home.module.scss"
import { Grid } from "@mui/material"

export const Home = () => {

  return(
    <div className={css.homePage}>
      <Grid container>
        <Grid item md={4} sm={12}>
          <HomeCard name="Campaigns" image={Castle} url="/Campaigns/" />
        </Grid>
        <Grid  item md={4} sm={12}>
          <CursorFollowingPointer />
        </Grid>
        <Grid  item md={4} sm={12}>
          <HomeCard name="Characters" image={Party} url="/Characters/"/>
        </Grid>
      </Grid>
    </div>
  );
}
