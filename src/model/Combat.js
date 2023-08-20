export class Combat {
    constructor(
      docId,
      campaignDocId,
      combatCharacterArray = [],
      name = "",
      currentTurnIndex = 0
    ) {
      this.docId = docId;
      this.campaignDocId = campaignDocId;
      this.combatCharacterArray = combatCharacterArray;
      this.name = name;
      this.currentTurnIndex = currentTurnIndex;
    }
  }
  
  export const validateCombat = (combat) => {
    let validator = {};
    if (!combat?.name || combat?.name.trim() === "") {
      validator.name = "Empty Content"
    }
  
    return validator;
  }