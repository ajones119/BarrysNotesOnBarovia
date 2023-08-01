import { BASE_ABILITY_SCORES } from "./BaseCharacter";

export class NPC {
  constructor(docId, npc) {
    this.docId = docId;
    this.name = npc.name || "";
    this.characterImageURL = npc.characterImageURL || "";
    this.backstory = npc.backstory || "";
    this.campaignDocId = npc.campaignDocId;
    this.statBlockURL = npc.statBlockURL || "";
    this.abilityScores = npc?.abilityScores || BASE_ABILITY_SCORES;
    this.skills = npc.skills || [];
    this.actions = npc.actions || [];
    this.bonusActions = npc.bonusActions || [];
    this.otherActions = npc.otherActions || [];
    this.speed = npc.speed || "";
    this.passivePerception = npc.passivePerception || 0;
    this.armorClass = npc.armorClass || 0;
    this.health = npc.health || 0;
  }
}


export const validateNPC = (npc) => {
  let validator = {};
  if (!npc?.name || npc?.name.trim() === "") {
    validator.name = "Empty Name"
  }

  return validator;
}