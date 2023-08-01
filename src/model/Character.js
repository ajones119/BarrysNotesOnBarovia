
export class Character {
  constructor(
    docId,
    name,
    campaignDocId,
    characterImageURL,
    player = "",
    backstory = "",
    className = "",
    dndBeyondURL = "",
    passivePerception = 0,
    initiativeBonus = 0,
    armorClass = 0,
  ) {
    this.docId = docId;
    this.name = name;
    this.characterImageURL = characterImageURL;
    this.player = player;
    this.backstory = backstory;
    this.className = className;
    this.campaignDocId = campaignDocId;
    this.dndBeyondURL = dndBeyondURL;
    this.passivePerception = passivePerception;
    this.initiativeBonus = initiativeBonus;
    this.armorClass = armorClass
  }

}

export const validateCharacter = (character) => {
  let validator = {};
  if (!character?.name || character?.name.trim() === "") {
    validator.name = "Empty Name"
  }

  return validator;
}
