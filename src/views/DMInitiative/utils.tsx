export const getCombatURL = (campaignDocId: string) => {
    let url = `https://ajones119.github.io/BarrysNotesOnBarovia#/Initiative/${campaignDocId}`;

    if (window.location.hostname === "localhost") {
        url = `http://localhost:3000/BarrysNotesOnBarovia/#/Initiative/${campaignDocId}`
    }

    return url;
}