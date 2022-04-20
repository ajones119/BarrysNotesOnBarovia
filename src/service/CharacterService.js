import { Character } from "../model/Character";
import firebase from "./firebase";

const firestoreDatabase = firebase.firestore().collection("characters");

export async function saveNewCharacter(newCharacter) {
  await firestoreDatabase.add({
    name: newCharacter.name,
    characterImageURL: newCharacter.characterImageURL,
    player: newCharacter.player,
    backstory: newCharacter.backstory,
    classNames: newCharacter.classNames,
    campaignDocId: newCharacter.campaignDocId,
    dndBeyondURL: newCharacter.dndBeyondURL,
  });
}

export async function getCharacters(setCharacters) {
  firestoreDatabase.onSnapshot((querySnapshot) => {
    const characters = [];
    querySnapshot.forEach((doc) => {
      characters.push(
        new Character(
          doc.id,
          doc.data().name,
          doc.data().characterImageURL,
          doc.data().player,
          doc.data().backstory,
          doc.data().className,
          doc.data().campaignDocId,
          doc.data().dndBeyondURL
        )
      );
    });

    setCharacters(characters);
  });
}

export async function getCharacterDetailsByDocId(docId, setCharacter) {
  firestoreDatabase
    .doc(`${docId}`)
    .get()
    .then((doc) => {
      let character = new Character(
        doc.id,
        doc.data().name,
        doc.data().characterImageURL,
        doc.data().player,
        doc.data().backstory,
        doc.data().className,
        doc.data().campaignDocId,
        doc.data().dndBeyondURL
      );

      setCharacter(character);
    });
}

export async function getCharactersByCampaignDocId(
  campaignDocId,
  setCharacters
) {
  firestoreDatabase
    .where("campaignDocId", "==", `${campaignDocId}`)
    .onSnapshot((querySnapshot) => {
      const characters = [];
      querySnapshot.forEach((doc) => {
        characters.push(
          new Character(
            doc.id,
            doc.data().name,
            doc.data().characterImageURL,
            doc.data().player,
            doc.data().backstory,
            doc.data().className,
            doc.data().campaignDocId,
            doc.data().dndBeyondURL
          )
        );
      });

      setCharacters(characters);
    });
}
