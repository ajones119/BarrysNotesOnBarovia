import { Validator } from "./Validator";

export type Campaign =  {
    docId?: string,
    title: string,
    campaignImageURL?: string,
    dungeonMaster?: string,
    description?: string,
    currentCombatDocId?: string,
    aiApiKey?: string,
};

export const validateCampaign = (campaign: Campaign) => {
    let validator: Validator = {};
    if (!campaign?.title || campaign?.title.trim() === "") {
      validator.title = "Empty Title"
    }
  
    return validator;
  }