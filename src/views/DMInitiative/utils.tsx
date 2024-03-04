import { CombatCharacter } from "@model/CombatCharacter";

export const getCombatURL = (campaignDocId: string) => {
    let url = `https://ajones119.github.io/BarrysNotesOnBarovia#/Initiative/${campaignDocId}`;

    if (window.location.hostname === "localhost") {
        url = `http://localhost:3000/BarrysNotesOnBarovia/#/Initiative/${campaignDocId}`
    }

    return url;
}

export const getCombatMapURL = (campaignDocId: string, combatDocId: string) => {
    let url = `https://ajones119.github.io/BarrysNotesOnBarovia#/Initiative/Map/${campaignDocId}/${combatDocId}`;

    if (window.location.hostname === "localhost") {
        url = `http://localhost:3000/BarrysNotesOnBarovia/#/Initiative/Map/${campaignDocId}/${combatDocId}`
    }

    return url;
}

export const getCombatMapRoute = (campaignDocId: string) => {
    return`/Initiative/${campaignDocId}`;
}

export const sortCombatOnInitiatives = (characters: CombatCharacter[]) => {
    return characters?.sort((a: CombatCharacter, b: CombatCharacter) => {
        let aInititative = Number(a?.initiative || -100);
        let bInitiative = Number(b?.initiative || -100);
        if (aInititative === bInitiative) {
          aInititative += Number(a?.initiativeBonus || -100)
          bInitiative += Number(b?.initiativeBonus || -100)
        }
        if (aInititative === bInitiative) {
          aInititative += Number(a?.uniqueId || -100)
          bInitiative += Number(b?.uniqueId || -100)
        }
  
        return aInititative < bInitiative ? 1 : -1;
      }).map(character => character?.docId || "")
}

export const getFilteredList = (colorFilter: string[], combatCharacters: CombatCharacter[]) => colorFilter.length > 0 ? combatCharacters.filter(item => colorFilter.includes(item?.color || "") || item?.playerDocId || item?.isAlly) : combatCharacters;

export const getNextTurnIndex = (currentTurnIndex: number | null, combatCharacters: CombatCharacter[], colorFilter: string[]) => {
    const filteredList = getFilteredList(colorFilter, combatCharacters)
    let nextTurn = 0;
    if (currentTurnIndex !== null) {
        nextTurn =
            currentTurnIndex + 1 >= combatCharacters.length
            ? 0
            : currentTurnIndex + 1;

            while (filteredList.filter(item => combatCharacters[nextTurn].uniqueId === item.uniqueId).length < 1) {
            nextTurn =
                nextTurn + 1 >= combatCharacters.length
                ? 0
                : nextTurn + 1;
            }
    }

    return nextTurn;
}

export const getLastTurnIndex = (currentTurnIndex: number | null, combatCharacters: CombatCharacter[], colorFilter: string[]) => {
    const filteredList = getFilteredList(colorFilter, combatCharacters)
    let nextTurn = 0;
    if (currentTurnIndex !== null) {
        nextTurn =
          currentTurnIndex - 1 < 0
            ? combatCharacters.length-1
            : currentTurnIndex - 1;

          while (filteredList.filter(item => combatCharacters[nextTurn].uniqueId === item.uniqueId).length < 1) {
            nextTurn =
              nextTurn - 1 <= 0
                ? 0
                : nextTurn - 1;
        }
    }

    return nextTurn;
}