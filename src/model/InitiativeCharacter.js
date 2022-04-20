export class InitiativeCharacter {
  constructor(
    name,
    initiative,
    maxHp,
    currentHp,
    armorClass,
    conditions,
    imageUrl
  ) {
    this.name = name;
    this.initiative = initiative;
    this.maxHp = maxHp;
    this.currentHp = currentHp;
    this.armorClass = armorClass;
    this.conditions = conditions;
    this.imageUrl = imageUrl;
  }
}
