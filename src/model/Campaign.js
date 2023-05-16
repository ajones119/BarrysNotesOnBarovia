import { BaseReactObject } from "./BaseReactObject";

export class Campaign {
  constructor(docId, title, campaignImageURL = "", dungeonMaster = "", description = "") {
    this.docId = docId;
    this.title = title;
    this.campaignImageURL = campaignImageURL;
    this.dungeonMaster = dungeonMaster;
    this.description = description;
  }
}

export const validateCampaign = (campaign) => {
  let validator = {};
  if (!campaign?.title || campaign?.title.trim() === "") {
    validator.title = "Empty Title"
  }

  return validator;
}
