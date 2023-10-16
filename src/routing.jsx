import { Route, Routes } from "react-router-dom";
import Campaigns from "@views/CampaignViews/Campaigns";
import Characters from "@views/CharacterViews/Characters";
import { NonHomePageContainer } from "@views/NonHomePageContainer";
import { Home } from "@views/Home/Home";
import SingleCampaign from "@views/CampaignViews/SingleCampaign/SingleCampaign";
import SingleCharacter from "@views/CharacterViews/SingleCharacterView/SingleCharacter";
import PlayerInitiative from "@views/PlayerInitiative/PlayerInitiative";
import DMInitiative from "@views/DMInitiative";
import CustomMonsters from "@views/CustomMonsters";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Campaigns/" element={<NonHomePageContainer page={<Campaigns />} />} />
      <Route path="/Campaigns/:CampaignId/:tabKey?" element={<NonHomePageContainer page={<SingleCampaign />} />} />
      <Route path="/Initiative/:CampaignId" element={<PlayerInitiative />} />
      <Route path="/Initiative/DM/:campaignId/:combatId" element={<NonHomePageContainer page={<DMInitiative />} />} />
      <Route path="/Characters/" element={<NonHomePageContainer page={<Characters />} />} />
      <Route path="/Characters/:CharacterId" element={<NonHomePageContainer page={<SingleCharacter />} />} />
      <Route path="/Monsters/" element={<NonHomePageContainer page={<CustomMonsters />} />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};
