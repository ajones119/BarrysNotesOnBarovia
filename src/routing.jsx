import { Route, Routes } from "react-router-dom";
import Campaigns from "@views/CampaignViews/Campaigns";
import Characters from "@views/CharacterViews/Characters";
import { NonHomePageContainer } from "@views/NonHomePageContainer";
import { Home } from "@views/Home/Home";
import SingleCampaign from "@views/CampaignViews/SingleCampaign/SingleCampaign";
import PlayerInitiative from "@views/PlayerInitiative/PlayerInitiative";
import DMInitiative from "@views/DMInitiative";
import CustomMonsters from "@views/CustomMonsters";
import CombatMap from "@views/CombatMap";
import { faBook, faCircleUser, faCrosshairs, faEarthAmericas, faMagic, faMagnifyingGlassLocation, faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { getCombatMapRoute } from "@views/DMInitiative/utils";

const CampaignAdditionalLinks = {
  getAdditionalLinks: ({CampaignId}) => ([
    {
      name: "Overview",
      url: `/Campaigns/${CampaignId}/overview`,
      icon: faEarthAmericas
    },
    {
      name: "Characters",
      url: `/Campaigns/${CampaignId}/characters`,
      icon: faCircleUser
    },
    {
      name: "Notes",
      url: `/Campaigns/${CampaignId}/notes`,
      icon: faBook
    },
    {
      name: "Locations",
      url: `/Campaigns/${CampaignId}/locations`,
      icon: faMagnifyingGlassLocation
    },
    {
      name: "Combat",
      url: getCombatMapRoute(CampaignId || "") ,
      icon: faCrosshairs
    },
    {
      name: "Encounters",
      url: `/Campaigns/${CampaignId}/combat`,
      icon: faSkullCrossbones
    },
  ])
}

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Campaigns/" element={<NonHomePageContainer page={<Campaigns />} />} />
      <Route
        path="/Campaigns/:CampaignId/:tabKey?"
        element={
          <NonHomePageContainer
            page={<SingleCampaign/>}
            meta={CampaignAdditionalLinks}
          />
        }
      />
      <Route path="/Initiative/:CampaignId" element={<NonHomePageContainer page={<PlayerInitiative />} meta={CampaignAdditionalLinks} />} />
      <Route path="/Initiative/DM/:CampaignId/:combatId" element={<NonHomePageContainer page={<DMInitiative />} meta={CampaignAdditionalLinks} />} />
      <Route path="/Initiative/Map/:CampaignId/:combatId" element={<NonHomePageContainer page={<CombatMap />} meta={CampaignAdditionalLinks} />} />
      <Route path="/Characters/" element={<NonHomePageContainer page={<Characters />} />} />
      <Route path="/Monsters/" element={<NonHomePageContainer page={<CustomMonsters />} />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};
