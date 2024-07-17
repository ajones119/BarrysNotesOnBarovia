import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, runTransaction, setDoc, where, writeBatch } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreDocument, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Combat } from '@model/Combat';
import { useMutation } from "react-query";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { CombatCharacter } from "@model/CombatCharacter";

export function useCampaignCombats(campaignDocId: string): {combats: Combat[], isLoading: boolean, refetch: () => void} {
  const ref = query(collection(firestore, "combats"), where("campaignDocId", "==", campaignDocId));

  const CombatQuery = useFirestoreQuery([`${campaignDocId}-campaignCombatsList`], ref, { subscribe: true });
  
  const { data, isLoading, refetch } = CombatQuery;

  const CombatData = data?.docs.map(combat => ({
      ...combat?.data(),
      docId: combat.id,
    }) as Combat) || [];

  return { combats: CombatData, isLoading, refetch };
}

export const useCombat = (combatDocId = ""): {combat: Combat, isLoading: boolean, isRefetching: boolean, isFetching: boolean} => {
  const ref = doc(firestore, "combats", combatDocId);

  const campaignQuery = useFirestoreDocument(["singleCombat", combatDocId], ref, {subscribe: true});
  
  const { data, isLoading, isRefetching, isFetching } = campaignQuery;

  const combat: Combat = {
    ...data?.data(),
    docId: combatDocId,
  };

  return { combat, isLoading, isRefetching, isFetching };
}

export function useCombatCharacters(combatDocId: string, sorted = false) {
  const {combat, isLoading: isCombatLoading} = useCombat(combatDocId)
  const ref = query(collection(firestore, "combatCharacters"), where("combatDocId", "==", combatDocId));

  const CombatQuery = useFirestoreQuery([`${combatDocId}-combatCharacterst`], ref, { subscribe: true });
  
  const { data, isLoading, refetch } = CombatQuery;

  let charactersData = data?.docs.map(character => ({
      ...character?.data(),
      docId: character.id,
    }) as CombatCharacter) || [];

  if (sorted) {
    charactersData = charactersData?.sort((a, b) => {
      let aInititative = Number(a["initiative"] || -100);
      let bInitiative = Number(b["initiative"] || -100);
      if (aInititative === bInitiative) {
        aInititative += Number(a["initiativeBonus"] || -100)
        bInitiative += Number(a["initiativeBonus"] || -100)
      }

      return aInititative <= bInitiative ? 1 : -1;
    })
  } else if (!isCombatLoading) {
    charactersData = combat?.combatCharacterIds ? combat?.combatCharacterIds?.map(id => charactersData.find(character => id === character?.docId) || charactersData[0]) : [];
  }

  return { combatCharacters: charactersData, isLoading, refetch };
}

export const useAddCombatCharacter = (combatDocId: string) => {
  return useMutation({
    mutationKey: ["add-combat-character", combatDocId],
    mutationFn: async (newCharacter: CombatCharacter) => {
      const combatCharactersRef = collection(firestore, "combatCharacters");
      const response = await addDoc(combatCharactersRef, {
        ...newCharacter,
        combatDocId,
        position: {
          x: 500,
          y: 500
        } 
      })
      const docId = response.id;
      const combatRef = doc(firestore, "combats", combatDocId)
      const combatData = await getDoc(combatRef);
      const { combatCharacterIds } = combatData.data() as Combat;
      combatCharacterIds?.push(docId)
      await setDoc(combatRef,{ combatCharacterIds } ,{ merge: true})
    }
  })
}

export const useDeleteCombatCharacter = (combatDocId: string) => {
  return useMutation({
    mutationKey: ["delete-combat-character", combatDocId],
    mutationFn: async (docId: string) => {      
      await runTransaction(firestore, async() => {
        const combatRef = doc(firestore, "combats", combatDocId)
        const combatData = await getDoc(combatRef)
        const { combatCharacterIds } = combatData.data() as Combat;
        const newIds = combatCharacterIds?.filter(id => id !== docId)
        await setDoc(combatRef,{ combatCharacterIds: newIds } ,{ merge: true})

        const combatCharactersRef = doc(firestore, "combatCharacters", docId);
        await deleteDoc(combatCharactersRef);
      })
    }
  })
}
// should I add batch mutation here?
export const mutateCombatCharacter = async (docId: string, newCombatCharacter: Partial<CombatCharacter>) => {
  if (docId) {
    const ref = doc(firestore, "combatCharacters", docId);
    await setDoc(ref, {...newCombatCharacter}, {merge: true})
  }
}

export const useEditCombatCharacter = (docId: string) => {
  return useMutation({
    mutationKey: ["edit-combat-character", docId],
    mutationFn : async (newCombatCharacter: Partial<CombatCharacter>) => {
      await mutateCombatCharacter(docId, newCombatCharacter)
    }
  })
}

export const useAddCombat = (onSuccess = () => {}) => {
  return useMutation({
    mutationKey: ["add-combat"],
    onSuccess,
    mutationFn: async ({combat, characters}: {combat: Combat, characters: CombatCharacter[]}) => {
      runTransaction(firestore, async () => {
        const combatsRef = collection(firestore, "combats");
        const combatMapsRef = collection(firestore, "combatMaps");
        const combatCharactersRef = collection(firestore, "combatCharacters");

        // add combat
        const response = await addDoc(combatsRef, combat)
        const docId = response?.id;

        const mapData = {
          combatDocId: docId,
          campaignDocId: combat?.campaignDocId,
        };

        // add combat map
        addDoc(combatMapsRef, mapData);

        const combatCharacterIds: string[] = [];
        for(let index = 0; index < characters.length; index++) {
          const character = characters[index];
          const charResponse = await addDoc(combatCharactersRef, {
            position: {
              x: 100,
              y: 100,
            },
            combatDocId: docId,
            ...character
          })
          //consider how to move Character combat stats to their document
          //should I attach to their current character document, ot make a persistanct combat character?

          //seems like combat character can be used for map position, but maybe move health to character
          combatCharacterIds.push(character.docId || charResponse.id)
        }

        const newCombatRef = doc(firestore, "combats", docId)
        await setDoc(newCombatRef,{ combatCharacterIds } ,{ merge: true})
      });
    }
  })
}

export const useUpdateInitiative = (combat: Combat) => {
    const combatCollection = collection(firestore, "combats");
    const ref = doc(combatCollection, combat?.docId)
    const mutation = useFirestoreDocumentMutation(ref);

    const update = (updatedCombat: Combat) => {
      delete(updatedCombat.docId)
        mutation.mutate({
            ...updatedCombat
        })
      }

    return update;
  }

  export const useDeleteCombat = () => {
    return useMutation({
      mutationKey: ["delete-combat"],
      mutationFn: async (combatId: string) => {
        runTransaction(firestore, async () => {
          const batch = writeBatch(firestore)
          const combatMapQuery = query(collection(firestore, "combatMaps"), where("combatDocId", "==", combatId));
          const combatMapsSnapshot = await getDocs(combatMapQuery);
          if (combatMapsSnapshot.size > 0) {
            combatMapsSnapshot.docs.forEach(async (doc) => {
              const docid = doc.id;
              const combatTokensQuery = query(collection(firestore, "combatTokens"), where("combatMapDocId", "==", docid));
              const combatTokensSnapshot = await getDocs(combatTokensQuery);
              if (combatTokensSnapshot.size > 0) {
                combatTokensSnapshot.docs.forEach(async (doc) => {
                  batch.delete(doc.ref);
                })
              }
              const imageRef = storageRef(storage,  `images/combats/${docid}`);
              try{
                await deleteObject(imageRef)
              } catch (e) {
                console.log(e)
              }
            })
          }

          const combatCharactersQuery = await query(collection(firestore, "combatCharacters"), where("combatDocId", "==", combatId));
          const combatCharactersSnapshot = await getDocs(combatCharactersQuery);
          if (combatCharactersSnapshot.size > 0) {
            combatCharactersSnapshot.docs.forEach(async (doc) => {
              if (!doc.data().playerDocId) {
                batch.delete(doc.ref);
              }
            })
            await batch.commit();
          }

          const combatRef = doc(firestore, "combats", combatId)
          await deleteDoc(combatRef)
      })
    }
  });
}

export const useEditCombat = (combatDocId: string) => {
  return useMutation({
    mutationKey: ["edit-combat", combatDocId],
    mutationFn: async(combat: Partial<Combat>) => {
      const ref = doc(firestore, "combats", combatDocId);
      await setDoc(ref, {...combat}, {merge: true});
    }
  })
}

