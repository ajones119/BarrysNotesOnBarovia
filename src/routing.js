import React from "react";
import { Route, Routes } from "react-router-dom";
import Campaigns from "./views/CampaignViews/Campaigns";
import Characters from "./views/CharacterViews/Characters";
import RulesHome from "./views/RulesViews/RulesHome";
import { NonHomePageContainer } from "./views/NonHomePageContainer";
import { Home } from "./views/Home/Home";
import SingleCampaign from "./views/CampaignViews/SingleCampaign/SingleCampaign";
import SingleCharacter from "./views/CharacterViews/SingleCharacterView/SingleCharacter";

export const Routing = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Campaigns/" element={<NonHomePageContainer page={<Campaigns />} />} />
        <Route path="/Campaigns/:CampaignId" element={<NonHomePageContainer page={<SingleCampaign />} />} />
        <Route path="/Characters/" element={<NonHomePageContainer page={<Characters />} />} />
        <Route path="/Characters/:CharacterId" element={<NonHomePageContainer page={<SingleCharacter />} />} />
        <Route path="/Rules/" element={RulesHome} />
        <Route path="/*" element={<Home />} />
      </Routes>
  );
};
