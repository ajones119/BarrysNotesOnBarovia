import { Transaction, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, runTransaction, where, writeBatch } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Combat } from '@model/Combat';
import { useAddCombatMap } from './CombatMapService';
import { useMutation } from "react-query";
import { uploadBytes, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";


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
    combatCharacterArray: data?.data()?.combatCharacterArray,
    docId: combatDocId,
  };

  return { combat, isLoading, isRefetching, isFetching };
}

export const useAddCombatButton = (onSuccess: () => void) => {
    const ref = collection(firestore, "combats");
    const mutation = useFirestoreCollectionMutation(ref, {onSuccess});
    const mapMutation = useAddCombatMap();

    const handleMutate = async(newCombat: Combat) => {
      const { 
        campaignDocId,
        name = "",
        combatCharacterArray = [],
    } = newCombat;
      const response = await mutation.mutateAsync({
          campaignDocId,
          name,
          combatCharacterArray
      })

      await mapMutation.mutateAsync({
        combatDocId: response?.id,
        campaignDocId: newCombat?.campaignDocId,
        combatMapCharacterArray: combatCharacterArray?.map((character) => ({
          playerDocId: character?.playerDocId || "",
          enemyId: character?.enemyId || "",
          npcDocId: character?.npcDocId || "",
          position: {
            x: 100,
            y: 100
          },
          uniqueId: character?.uniqueId
        })),
      })
    }
  
    return {
      ...mutation,
      mutate: handleMutate
    }
  }

export const useAddCombat = (onSuccess = () => {}) => {
  return useMutation({
    mutationKey: ["add-combat"],
    onSuccess,
    mutationFn: async (newCombat: Combat) => {
      runTransaction(firestore, async () => {
        const combatsRef = collection(firestore, "combats");
        const combatMapsRef = collection(firestore, "combatMaps");

        const response = await addDoc(combatsRef, newCombat)
        const docId = response?.id;

        const {combatCharacterArray = []} = newCombat;
        const mapData = {
          combatDocId: response?.id,
          campaignDocId: newCombat?.campaignDocId,
          combatMapCharacterArray: combatCharacterArray?.map((character) => ({
            playerDocId: character?.playerDocId || "",
            enemyId: character?.enemyId || "",
            npcDocId: character?.npcDocId || "",
            position: {
              x: 100,
              y: 100
            },
            uniqueId: character?.uniqueId
          })),
        };

        addDoc(combatMapsRef, mapData);
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
          const combatMapQuery = await query(collection(firestore, "combatMaps"), where("combatDocId", "==", combatId));
          const combatMapsSnapshot = await getDocs(combatMapQuery);
          if (combatMapsSnapshot.size > 0) {
            const batch = writeBatch(firestore);
            combatMapsSnapshot.docs.forEach(async (doc) => {
              const docid = doc.id;
              batch.delete(doc.ref);
              const imageRef = storageRef(storage,  `images/combats/${docid}`);
              try{
                await deleteObject(imageRef)
              } catch (e) {
                console.log(e)
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

