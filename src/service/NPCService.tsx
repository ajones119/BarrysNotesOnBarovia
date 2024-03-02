import { addDoc, collection, deleteDoc, doc, query, setDoc, where } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreQuery } from "@react-query-firebase/firestore";
import { uploadBytes, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";

import { BaseCharacter } from '@model/BaseCharacter';
import { useMutation } from "react-query";

export function useCampaignNPCs(campaignDocId: string) {
  const ref = query(collection(firestore, "npcs"), where("campaignDocId", "==", campaignDocId));

  const NPCsQuery = useFirestoreQuery([`${campaignDocId}-campaignNPCsList`], ref, { subscribe: true });
  
  
  const { data, isLoading, refetch } = NPCsQuery;

  const NPCsData = data?.docs.map(npc => {
    
    return {...npc.data(), docId: npc.id, name: npc.data().name};
  });

  return { NPCs: NPCsData, isLoading, refetch };
}

export const useCreateNPC = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ["addNPC"],
    onSuccess,
    mutationFn: async (newNPC: BaseCharacter) => {
      const ref = collection(firestore, "npcs");
      const response = await addDoc(ref, {...newNPC, characterImageURL: ""});
      const id = response.id;
      let imageURL = ""

      if (newNPC?.characterImageURL instanceof File) {
        const imageRef = storageRef(storage, `images/npcs/${id}`);
        await uploadBytes(imageRef, newNPC?.characterImageURL);
        imageURL = await getDownloadURL(imageRef);
      } else {
        imageURL = newNPC?.characterImageURL || "";
      }

      if (imageURL) {
          const npcRef = doc(firestore, "npcs", id);
          await setDoc(npcRef, {
            characterImageURL: imageURL
        }, {merge: true})
      }
    }
  })
}

export const useEditNPC = (onSuccess: () => void) => {
  return useMutation({
    mutationKey: ["edit-NPC"],
    onSuccess,
    mutationFn: async (npc: BaseCharacter) => {
      const docId = npc?.docId;
      if (!docId) return;

      let imageURL = ""

      if (npc?.characterImageURL instanceof File) {
        const imageRef = storageRef(storage, `images/npcs/${docId}`);
        await uploadBytes(imageRef, npc?.characterImageURL);
        imageURL = await getDownloadURL(imageRef);
      } else {
        imageURL = npc?.characterImageURL || "";
      }

      delete(npc.docId);
      const npcRef = doc(firestore, "npcs", docId)
      await setDoc(npcRef, {
        ...npc,
        characterImageURL: imageURL
      })
    }
  })
}

export const useDeleteNPC = (onSuccess?: () => void) => {
  return useMutation({
    mutationKey: ["delete-npc"],
    onSuccess,
    mutationFn: async (docid: string) => {
      const imageRef = storageRef(storage,  `images/npcs/${docid}`);
      const docRef = doc(firestore, "npcs", docid)
      await deleteDoc(docRef);
      await deleteObject(imageRef)
    }
  })
}
