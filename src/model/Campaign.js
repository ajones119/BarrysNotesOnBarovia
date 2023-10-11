export class Campaign {
  constructor(docId, title, campaignImageURL = "", dungeonMaster = "", description = "", currentCombatDocId) {
    this.docId = docId;
    this.title = title;
    this.campaignImageURL = campaignImageURL;
    this.dungeonMaster = dungeonMaster;
    this.description = description;
    this.currentCombatDocId = currentCombatDocId;
  }
}

export const validateCampaign = (campaign) => {
  let validator = {};
  if (!campaign?.title || campaign?.title.trim() === "") {
    validator.title = "Empty Title"
  }

  return validator;
}