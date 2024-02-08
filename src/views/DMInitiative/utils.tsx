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