import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Combat } from '@model/Combat';
import { useAddCombatMap, useCombatMap, useDeleteCombatMap } from './CombatMapService';

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
      console.log(newCombat)
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

  export const useDeleteCombat = (combatID: string) => {
    const col = collection(firestore, "combats");
    const ref = doc(col, combatID);
    const mutation = useFirestoreDocumentDeletion(ref);

    const {combatMap, isLoading} = useCombatMap(combatID || "");
    const mapsDelete = useDeleteCombatMap(combatMap?.docId || "1")
  
    const handleMutate = async () => {
      if (!isLoading) {
        await mutation.mutateAsync();
        await mapsDelete.mutateAsync()
      }

    }
  
  
    return {...mutation, mutate: handleMutate};
  }