import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Campaigns from "./views/CampaignViews/Campaigns";
import NewCampaign from "./views/CampaignViews/NewCampaign";
import CampaignDetails from "./views/CampaignViews/CampaignDetails";
import Characters from "./views/CharacterViews/Characters";
import NewCharacter from "./views/CharacterViews/NewCharacter";
import CharacterDetails from "./views/CharacterViews/CharacterDetails";
import EditCampaign from "./views/CampaignViews/EditCampaign";
import EditCharacter from "./views/CharacterViews/EditCharacter";

export const Routes = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/BarrysNotesOnBarovia/">
          <Redirect to="/" />
        </Route>
        <Route exact path="/Campaigns/" component={Campaigns}></Route>
        <Route
          exact
          path="/Campaigns/new-campaign"
          component={NewCampaign}
        ></Route>
        <Route path="/Campaigns/:Id" component={CampaignDetails}></Route>
        <Route path="/edit-campaign/:Id" component={EditCampaign}></Route>
        <Route exact path="/Characters/" component={Characters}></Route>
        <Route
          exact
          path="/Characters/new-character"
          component={NewCharacter}
        ></Route>
        <Route path="/edit-character/:Id" component={EditCharacter}></Route>
        <Route path="/Characters/:Id" component={CharacterDetails}></Route>
      </Switch>
    </div>
  );
};
