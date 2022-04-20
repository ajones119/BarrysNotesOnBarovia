export class Note {
  constructor(
    docId,
    content,
    characterDocId,
    campaignDocId,
    date,
    isPersonal,
    isCampaign,
    isDungeonMaster
  ) {
    this.docId = docId;
    this.content = content;
    this.characterDocId = characterDocId;
    this.date = date;
    this.campaignDocId = campaignDocId;
    this.isPersonal = isPersonal;
    this.isCampaign = isCampaign;
    this.isDungeonMaster = isDungeonMaster;
  }
}
