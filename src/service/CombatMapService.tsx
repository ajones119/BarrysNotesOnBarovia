import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { CombatMap } from '@model/CombatMap';

export const useUpdateCombatMap = (combat: CombatMap) => {
    const combatMapCollection = collection(firestore, "combatMaps");
    const ref = doc(combatMapCollection, combat?.docId || "1")
    const mutation = useFirestoreDocumentMutation(ref);

    const update = (updatedCombat: CombatMap) => {
        delete(updatedCombat.docId)
        mutation.mutate({
            ...updatedCombat
        })
      }

    return update;
}

export const useAddCombatMap = () => {
    const ref = collection(firestore, "combatMaps");
    const mutation = useFirestoreCollectionMutation(ref);
    return mutation;
}

export const useDeleteCombatMap = (docId: string) => {
    const col = collection(firestore, "combatMaps");
    const ref = doc(col, docId);
    const mutation = useFirestoreDocumentDeletion(ref);
    return mutation;
}

export const useCombatMap = (combatId: string) => {
    console.log("COMBAT ID FOR MAP", combatId)
    const ref = query(collection(firestore, "combatMaps"), where("combatDocId", "==", combatId));

    const CombatQuery = useFirestoreQuery([`${combatId}-campaignCombatMapsList`], ref, { subscribe: true });
  
  
    const { data, isLoading, isRefetching, refetch } = CombatQuery;
  
    const CombatData = data?.docs.map(combat => ({
        ...combat?.data(),
        docId: combat.id,
      }) as CombatMap) || [];
      console.log("compatMap", data?.docs)
    return { combatMap: CombatData[0], isLoading, isRefetching, refetch };
}