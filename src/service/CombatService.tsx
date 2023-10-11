import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "@components/Button/LoadingButton"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Combat } from '@model/Combat';

export function useCampaignCombats(campaignDocId: string) {
  const ref = query(collection(firestore, "combats"), where("campaignDocId", "==", campaignDocId));

  const CombatQuery = useFirestoreQuery([`${campaignDocId}-campaignCombatsList`], ref, { subscribe: true });
  
  
  const { data, isLoading, refetch } = CombatQuery;

  const CombatData = data?.docs.map(combat => {

    const {
      campaignDocId,
      combatCharacterArray = [],
      name = "",
      currentTurnIndex = 0
    } = combat.data();
    
    return new Combat(
      combat.id,
      campaignDocId,
      combatCharacterArray,
      name,
      currentTurnIndex
    );
  });

  return { combats: CombatData, isLoading, refetch };
}

export const useCombat = (combatDocId = "") => {
  const ref = doc(firestore, "combats", combatDocId);

  const campaignQuery = useFirestoreDocument(["singleCombat", combatDocId], ref, {subscribe: true});
  
  const { data, isLoading, isRefetching } = campaignQuery;

  const combatData = data?.data() || {};

  const combat = new Combat(
    combatDocId,
    combatData?.campaignDocId,
    combatData?.combatCharacterArray,
    combatData?.name,
    combatData?.currentTurnIndex
  );

  return { combat, isLoading, isRefetching };
}

export const useAddCombatButton = (newCombat: Combat, onClick: () => void, validate: () => boolean) => {
    const ref = collection(firestore, "combats");
    const mutation = useFirestoreCollectionMutation(ref);
    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
  
    const { 
        campaignDocId,
        name = "",
        combatCharacterArray = [],
        currentTurnIndex = 0
    } = newCombat;
  
    const handleClick = () => {
      const valid = validate();
      if (valid) {
        mutation.mutate({
            campaignDocId,
            name,
            combatCharacterArray,
            currentTurnIndex,
        })
        console.log("ERROR", mutation.error)
      }
  
        if (!mutation.error){
          console.log("onClick")
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
    const ref = doc(combatCollection, combat.docId)
    const mutation = useFirestoreDocumentMutation(ref);

    const update = (updatedCombat: Combat) => {
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
    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
    
    const handleClick = () => {
      mutation.mutate();
  
        if (!mutation.error){
          console.log("onClick")
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