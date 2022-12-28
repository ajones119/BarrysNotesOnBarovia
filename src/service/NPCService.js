import { Character } from "../model/Character";
import { NPC } from "../model/NPC";
import firebase from "./firebase";

const firestoreDatabase = firebase.firestore().collection("npcs");

export async function saveNewNPC(newNpc) {
  await firestoreDatabase.add({
    name: newNpc.name,
    characterImageURL: newNpc.characterImageURL,
    backstory: newNpc.backstory,
    campaignDocId: newNpc.campaignDocId,
    statBlockURL: newNpc.statBlockURL,
  });
}

export async function updateCharacter(npc) {
  await firestoreDatabase.doc(`${npc.docId}`).set({
    name: npc.name,
    characterImageURL: npc.characterImageURL,
    backstory: npc.backstory,
    campaignDocId: npc.campaignDocId,
    statBlockURL: npc.statBlockURL,
  });
}

export async function getNPCs(setNpcs) {
  firestoreDatabase.onSnapshot((querySnapshot) => {
    const npcs = [];
    querySnapshot.forEach((doc) => {
      npcs.push(
        new Character(
          doc.id,
          doc.data().name,
          doc.data().characterImageURL,
          doc.data().backstory,
          doc.data().campaignDocId,
          doc.data().statBlockURL
        )
      );
    });

    setNpcs(npcs);
  });
}

export async function getNPCDetailsByDocId(docId, setNpc) {
  firestoreDatabase
    .doc(`${docId}`)
    .get()
    .then((doc) => {
      let npc = new NPC(
        doc.id,
        doc.data().name,
        doc.data().NPCImageURL,
        doc.data().backstory,
        doc.data().campaignDocId,
        doc.data().statBlockURL
      );

      setNpc(npc);
    });
}

export async function getNPCsByCampaignDocId(campaignDocId, setNpcs) {
  firestoreDatabase
    .where("campaignDocId", "==", `${campaignDocId}`)
    .onSnapshot((querySnapshot) => {
      const npcs = [];
      querySnapshot.forEach((doc) => {
        npcs.push(
          new NPC(
            doc.id,
            doc.data().name,
            doc.data().characterImageURL,
            doc.data().backstory,
            doc.data().campaignDocId,
            doc.data().statBlockURL
          )
        );
      });

      npcs.sort(function(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      })

      setNpcs(npcs);
    });
}

export async function deleteNPC(docId) {
  console.log("DOCID", docId);
  firestoreDatabase.doc(docId).delete();
}
