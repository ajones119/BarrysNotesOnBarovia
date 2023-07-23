import { BaseReactObject } from "./BaseReactObject";

export class Campaign {
  constructor(docId, title, campaignImageURL = "", dungeonMaster = "", description = "", currentDocId, nextDocId) {
    this.docId = docId;
    this.title = title;
    this.campaignImageURL = campaignImageURL;
    this.dungeonMaster = dungeonMaster;
    this.description = description;
    this.currentDocId = currentDocId;
    this.nextDocId = nextDocId;
  }
}

export const validateCampaign = (campaign) => {
  let validator = {};
  if (!campaign?.title || campaign?.title.trim() === "") {
    validator.title = "Empty Title"
  }

  return validator;
}
