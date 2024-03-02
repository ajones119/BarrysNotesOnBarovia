import { addDoc, collection, deleteDoc, doc, query, setDoc, where } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import {
  useFirestoreCollectionMutation,
  useFirestoreDocument,
  useFirestoreDocumentDeletion,
  useFirestoreDocumentMutation,
  useFirestoreQuery,
} from "@react-query-firebase/firestore";

import { PlayerCharacter } from "@model/PlayerCharacter";
import { useMutation } from "react-query";
import { uploadBytes, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";

export function useCharacter(characterDocId = "") {
  const ref = doc(firestore, "characters", characterDocId);

  const campaignQuery = useFirestoreDocument(
    ["singleCharacter", characterDocId],
    ref,
    { subscribe: true },
  );

  const { data, isLoading } = campaignQuery;

  const character: PlayerCharacter = {
    docId: characterDocId,
    name: data?.data()?.name,
    ...data?.data()
  };

  return { character, isLoading };
}

export function useCharacters() {
  const ref = query(collection(firestore, "characters"));

  const characterQuery = useFirestoreQuery(["charactersList"], ref, {
    subscribe: true,
  });

  const { data, isLoading, refetch } = characterQuery;

  const charactersData = data?.docs.map((character) => {
    return {
      docId: character.id,
      name: character.data().name,
      ...character.data()
    };
  });

  return { characters: charactersData, isLoading, refetch };
}

export function useCampaignCharacters(campaignDocId: string): {characters: PlayerCharacter[], isLoading: boolean, refetch: () => void} {
  const ref = query(
    collection(firestore, "characters"),
    where("campaignDocId", "==", campaignDocId),
  );

  const characterQuery = useFirestoreQuery(
    [`${campaignDocId}-campaignCharactersList`],
    ref,
    { subscribe: true },
  );

  const { data, isLoading, refetch } = characterQuery;

  const charactersData = data?.docs.map((character) => {

    return {
      docId: character.id,
      name: character.data().name,
      ...character.data()
    };
  });

  return {
    characters: campaignDocId && charactersData?.length ? charactersData : [],
    isLoading,
    refetch,
  };
}

export const useCreatePlayerCharacter = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ["addPC"],
    onSuccess,
    mutationFn: async (newPC: PlayerCharacter) => {
      const ref = collection(firestore, "characters");
      const response = await addDoc(ref, {...newPC, characterImageURL: ""});
      const id = response.id;
      let imageURL = ""

      if (newPC?.characterImageURL instanceof File) {
        const imageRef = storageRef(storage, `images/characters/${id}`);
        await uploadBytes(imageRef, newPC?.characterImageURL);
        imageURL = await getDownloadURL(imageRef);
      } else {
        imageURL = newPC?.characterImageURL || "";
      }

      if (imageURL) {
          const npcRef = doc(firestore, "characters", id);
          await setDoc(npcRef, {
            characterImageURL: imageURL
        }, {merge: true})
      }
    }
  })
}

export const useEditPlayerCharacter = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ["edit-PC"],
    onSuccess,
    mutationFn: async (pc: PlayerCharacter) => {
      const docId = pc?.docId;
      if (!docId) return;

      let imageURL = ""

      if (pc?.characterImageURL instanceof File) {
        const imageRef = storageRef(storage, `images/characters/${docId}`);
        await uploadBytes(imageRef, pc?.characterImageURL);
        imageURL = await getDownloadURL(imageRef);
      } else {
        imageURL = pc?.characterImageURL || "";
      }

      delete(pc.docId);
      const pcRef = doc(firestore, "characters", docId)
      await setDoc(pcRef, {
        ...pc,
        characterImageURL: imageURL
      })

    }
  })
}

export const useDeletePlayerCharacter = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["delete-pc"],
    onSuccess,
    mutationFn: async (docid: string) => {
      const imageRef = storageRef(storage,  `images/characters/${docid}`);
      const docRef = doc(firestore, "characters", docid)
      await deleteDoc(docRef);
      await deleteObject(imageRef)
    }
  })
}
