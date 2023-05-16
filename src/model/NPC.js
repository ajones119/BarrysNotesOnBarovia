export class NPC {
  constructor(
    docId,
    name,
    characterImageURL = "",
    backstory = "",
    campaignDocId = "",
    statBlockURL = ""
  ) {
    this.docId = docId;
    this.name = name;
    this.characterImageURL = characterImageURL;
    this.backstory = backstory;
    this.campaignDocId = campaignDocId;
    this.statBlockURL = statBlockURL;
  }
}


export const validateNPC = (npc) => {
  let validator = {};
  if (!npc?.name || npc?.name.trim() === "") {
    validator.name = "Empty Name"
  }

  return validator;
}