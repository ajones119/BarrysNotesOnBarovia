import React, { useEffect, useState } from "react";
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
import { TextInput } from "@components/TextInput/TextInput";
import { Button } from "@components/Button/Button";
import {connect} from "socket.io-client";

const socket = connect("https://barrysbrainofbarovia.onrender.com");

export const Home = () => {
  const [value, setValue] = useState("");
  const [room, setRoom] = useState("")

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      alert(data.message)
    })
  }, [socket])

  return(
    <div className={css.homePage}>
      <Typography color="tertiary" size="xx-large" fontStyle="rough" underline>BARRY'S NOTES ON BAROVIA</Typography>
      <TextInput placeholder="ROOM" value={room} onChange={value => setRoom(String(value))} />
      <TextInput value={value} onChange={value => setValue(String(value))} />
      <Button onClick={() => {
        console.log("CLICKED");
        socket.emit("send_message", {message: value, room})
      }}>send message</Button>
      <Button onClick={() => {
        console.log("CLICKED");
        socket.emit("join_room", room)
      }}>join room</Button>

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
