
export class Character {
  constructor(
    docId,
    name,
    campaignDocId,
    characterImageURL,
    player,
    backstory,
    className,
    dndBeyondURL
  ) {
    this.docId = docId;
    this.name = name;
    this.characterImageURL = characterImageURL;
    this.player = player;
    this.backstory = backstory;
    this.className = className;
    this.campaignDocId = campaignDocId;
    this.dndBeyondURL = dndBeyondURL;
  }

}

export const validateCharacter = (character) => {
  let validator = {};
  if (!character?.name || character?.name.trim() === "") {
    validator.name = "Empty Name"
  }

  return validator;
}
