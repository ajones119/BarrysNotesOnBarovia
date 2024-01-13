import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "@components/Button/LoadingButton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

export const useAddCombatButton = (newCombat: Combat, onClick: () => void, validate: () => boolean) => {
    const ref = collection(firestore, "combats");
    const mutation = useFirestoreCollectionMutation(ref);
    const mapMutation = useAddCombatMap();
    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
  
    const { 
        campaignDocId,
        name = "",
        combatCharacterArray = [],
    } = newCombat;
  
    const handleClick = async() => {
      const valid = validate();
      if (valid) {
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
  
        if (!mutation.error){
          onClick();
        }
  
      setButtonStatus(mutation.status as ButtonStatuses)
    }
  
    useEffect(() => {
      const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000)
      return () => {
        clearTimeout(timer)
      }
    }, [buttonStatus])
  
    return (
      <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Save Encounter</LoadingButton>
    );
  }

export const useUpdateInitiative = (combat: Combat) => {
    const combatCollection = collection(firestore, "combats");
    const ref = doc(combatCollection, combat?.docId)
    const mutation = useFirestoreDocumentMutation(ref);

    const update = (updatedCombat: Combat) => {
      console.log("UPDATED COMBAT")
      delete(updatedCombat.docId)
        mutation.mutate({
            ...updatedCombat
        })
      }

    return update;
  }

  export const useDeleteCombatButton = (combat: Combat, onClick = () => {}) => {
    const col = collection(firestore, "combats");
    const ref = doc(col, combat.docId);
    const mutation = useFirestoreDocumentDeletion(ref);

    const {combatMap, isLoading} = useCombatMap(combat?.docId || "");
    const mapsDelete = useDeleteCombatMap(combatMap?.docId || "1")

    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
  
    const handleClick = async () => {
      await mutation.mutateAsync();
      await mapsDelete.mutateAsync()
  
        if (!mutation.error){
          onClick();
        }
  
      setButtonStatus(mutation.status as ButtonStatuses)
    }
  
    useEffect(() => {
      const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000)
      return () => {
        clearTimeout(timer)
      }
    }, [buttonStatus])
  
    return (
      <LoadingButton color="error" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}><FontAwesomeIcon icon={faTrash} /></LoadingButton>
    );
  }