export class Character {
  constructor(
    docId,
    name,
    characterImageURL,
    player,
    backstory,
    classNames,
    campaignDocId,
    dndBeyondURL
  ) {
    this.docId = docId;
    this.name = name;
    this.characterImageURL = characterImageURL;
    this.player = player;
    this.backstory = backstory;
    this.classNames = classNames;
    this.campaignDocId = campaignDocId;
    this.dndBeyondURL = dndBeyondURL;
  }
}
