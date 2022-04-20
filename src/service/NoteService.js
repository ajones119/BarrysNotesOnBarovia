import { Note } from "../model/Note";
import firebase from "./firebase";

const firestoreDatabase = firebase.firestore().collection("notes");

export async function saveNewNote(newNote) {
  await firestoreDatabase.add({
    content: newNote.content,
    characterDocId: newNote.characterDocId,
    campaignDocId: newNote.campaignDocId,
    date: newNote.date,
    isPersonal: newNote.isPersonal,
    isCampaign: newNote.isCampaign,
    isDungeonMaster: newNote.isDungeonMaster,
  });
}

export async function getNotesByCampaignDocId(
  campaignDocId,
  setNotes,
  areDmNotes = false
) {
  firestoreDatabase
    .orderBy("date", "desc")
    .where("campaignDocId", "==", `${campaignDocId}`)
    .where(areDmNotes ? "isDungeonMaster" : "isCampaign", "==", true)
    .onSnapshot((querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push(
          new Note(
            doc.id,
            doc.data().content,
            doc.data().characterDocId,
            doc.data().campaignDocId,
            doc.data().date,
            doc.data().isPersonal,
            doc.data().isCampaign,
            doc.data().isDungeonMaster
          )
        );
      });

      setNotes(notes);
    });
}

export async function getNotesByCharacterDocId(characterDocId, setNotes) {
  firestoreDatabase
    .orderBy("date", "desc")
    .where("characterDocId", "==", `${characterDocId}`)
    .where("isPersonal", "==", true)
    .onSnapshot((querySnapshot) => {
      const notes = [];
      querySnapshot.forEach((doc) => {
        notes.push(
          new Note(
            doc.id,
            doc.data().content,
            doc.data().characterDocId,
            doc.data().campaignDocId,
            doc.data().date,
            doc.data().isPersonal,
            doc.data().isCampaign,
            doc.data().isDungeonMaster
          )
        );
      });

      setNotes(notes);
    });
}

export async function deleteNote(docId) {
  firestoreDatabase.doc(docId).delete();
}
