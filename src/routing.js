import React from "react";
import { Route, Routes } from "react-router-dom";
import Campaigns from "./views/CampaignViews/Campaigns";
import { CampaignDetails } from "./views/CampaignViews/CampaignDetails";
import Characters from "./views/CharacterViews/Characters";
import { CharacterDetails } from "./views/CharacterViews/CharacterDetails";
import RulesHome from "./views/RulesViews/RulesHome";
import { NonHomePageContainer } from "./views/NonHomePageContainer";
import { Home } from "./views/Home/Home";

export const Routing = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Campaigns/" element={<NonHomePageContainer page={<Campaigns />} />} />
        <Route path="/Campaigns/:Id" element={<NonHomePageContainer page={<CampaignDetails />} />} />
        <Route path="/Characters/" element={<NonHomePageContainer page={<Characters />} />} />
        <Route path="/Characters/:Id" element={<NonHomePageContainer page={<CharacterDetails />} />} />
        <Route path="/Rules/" element={RulesHome} />

        <Route path="/*" element={<Home />} />
      </Routes>
  );
};
