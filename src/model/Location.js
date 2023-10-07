
export class CampaignLocation {
    constructor(
      docId,
      campaignDocId = "",
      parentLocationId = "",
      name,
      description = "",
      npcs = [],
      childItemIds = [],
      locationImageURL = ""

    ) {
      this.docId = docId;
      this.campaignDocId = campaignDocId;
      this.name = name;
      this.description = description;
      this.npcs = npcs;
      this.parentLocationId = parentLocationId;
      this.childItemIds = childItemIds;
      this.locationImageURL = locationImageURL;
    }
  }
  
  
  export const validateLocation = (location) => {
    let validator = {};
    if (!location?.name || location?.name.trim() === "") {
      validator.name = "Empty Name"
    }
  
    return validator;
  }