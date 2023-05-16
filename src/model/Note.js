export class Note {
  constructor(
    docId,
    characterDocId,
    campaignDocId,
    date,
    content,
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

export const validateNote = (note) => {
  let validator = {};
  if (!note?.content || note?.content.trim() === "") {
    validator.content = "Empty Content"
  }

  return validator;
}