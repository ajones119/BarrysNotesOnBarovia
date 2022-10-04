export class Character {
  constructor(
    docId,
    name,
    characterImageURL,
    player,
    backstory,
    className,
    campaignDocId,
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
