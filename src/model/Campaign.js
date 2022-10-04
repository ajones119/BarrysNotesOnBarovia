import { BaseReactObject } from "./BaseReactObject";

export class Campaign extends BaseReactObject {
  constructor(docId, title, campaignImageURL, dungeonMaster, description) {
    super();
    this.docId = docId;
    this.title = title;
    this.campaignImageURL = campaignImageURL;
    this.dungeonMaster = dungeonMaster;
    this.description = description;
  }
}
