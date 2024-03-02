import React from 'react';
import { collection, doc, query, setDoc, where } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { CombatMap } from '@model/CombatMap';
import { useMutation } from 'react-query';
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";

export const useUpdateCombatMap = (combat: CombatMap) => {
    return useMutation({
        mutationKey: ["combat-mutate"],
        mutationFn: async (updatedCombat: CombatMap) => {
            const combatMapCollection = collection(firestore, "combatMaps");
            const ref = doc(combatMapCollection, combat?.docId || "1")
            let imageURL = "";
            if (updatedCombat?.map?.mapImage){
                if (updatedCombat?.map?.mapImage instanceof File) {
                    const imageRef = storageRef(storage, `images/combats/${updatedCombat?.docId}`);
                    await uploadBytes(imageRef, updatedCombat?.map?.mapImage);
                    imageURL = await getDownloadURL(imageRef)
                } else {
                    imageURL = typeof updatedCombat?.map?.mapImage === "string" ? updatedCombat?.map?.mapImage || "" : "";
                }

                updatedCombat["map"]["mapImage"] = imageURL;
            }

            await setDoc(ref, {
                ...updatedCombat
            }, {merge: true})
        }
    })
}

export const useAddCombatMap = () => {
    const ref = collection(firestore, "combatMaps");
    const mutation = useFirestoreCollectionMutation(ref);
    return mutation;
}

export const useCombatMap = (combatId: string) => {
    const ref = query(collection(firestore, "combatMaps"), where("combatDocId", "==", combatId));

    const CombatQuery = useFirestoreQuery([`${combatId}-campaignCombatMapsList`], ref, { subscribe: true });
  
  
    const { data, isLoading, isRefetching, refetch } = CombatQuery;
  
    const CombatData = data?.docs.map(combat => ({
        ...combat?.data(),
        docId: combat.id,
      }) as CombatMap) || [];
    return { combatMap: CombatData[0], isLoading, isRefetching, refetch };
}