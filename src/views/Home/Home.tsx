import React from "react";
import "../../App.css";
import Party from "../../images/party.png";
import Castle from "../../images/hauntedCastleBackground.jpg"
import { Typography } from "@mui/material";
import { HomeCard } from "../../components/HomeCard/HomeCard";
import './Home.css';
import { CursorFollowingPointer } from "../../components/CursorFollowingPointer/CursorFollowingPointer";

export const Home = () => {

  return(
    <div className='home-page'>
      <div className='center-top'>
        <HomeCard name="Campaigns" image={Castle} url="/Campaigns/" />
      </div>
      <div className='center'>
        <CursorFollowingPointer />
      </div>
      <div className='center-bottom'>
        <HomeCard name="Characters" image={Party} url="test"/>
      </div>
    </div>
  );
}
