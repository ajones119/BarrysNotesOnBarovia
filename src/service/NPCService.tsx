import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreDocumentMutation, useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "@components/Button/LoadingButton"
import { NPC } from '@model/NPC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function useCampaignNPCs(campaignDocId: string) {
  const ref = query(collection(firestore, "npcs"), where("campaignDocId", "==", campaignDocId));

  const NPCsQuery = useFirestoreQuery([`${campaignDocId}-campaignNPCsList`], ref, { subscribe: true });
  
  
  const { data, isLoading, refetch } = NPCsQuery;

  const NPCsData = data?.docs.map(npc => {
    
    return new NPC(
      npc.id,
      npc.data()
    );
  });

  return { NPCs: NPCsData, isLoading, refetch };
}

export const useAddNPCButton = (newNPC: NPC, onClick: () => void, validate: () => boolean, campaignId: string) => {
  const ref = collection(firestore, "npcs");
  const mutation = useFirestoreCollectionMutation(ref);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);

  const handleClick = () => {
    const valid = validate();
    if (valid) {
      mutation.mutate({ ...newNPC, campaignDocId: campaignId })
    }

    if (!mutation.error && valid){
      setButtonStatus(mutation.status as ButtonStatuses)

      onClick();
    } else {
      setButtonStatus(ButtonStatuses.Error as ButtonStatuses)

    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [buttonStatus])

  return (
    <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Save NPC</LoadingButton>
  );
}

export const useDeleteNPCButton = (npc: NPC, onClick = () => {}) => {
  const col = collection(firestore, "npcs");
  const ref = doc(col, npc.docId);
  const mutation = useFirestoreDocumentDeletion(ref);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
  
  const handleClick = () => {
    mutation.mutate();

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


export const useUpdateNPCButton = (newNPC: NPC, onClick: () => void, validate: () => boolean) => {
  const npcs = collection(firestore, "npcs");
  const ref = newNPC.docId && doc(npcs, newNPC.docId);
  const mutation = useFirestoreDocumentMutation(ref);

  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);

  const handleClick = () => {
    const valid = validate();
    if (valid) {
      mutation.mutate({ ...newNPC })
    }

    if (!mutation.error && valid){
      setButtonStatus(mutation.status as ButtonStatuses)

      onClick();
    } else {
      setButtonStatus(ButtonStatuses.Error as ButtonStatuses)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000)
    return () => {
      clearTimeout(timer)
    }
  }, [buttonStatus])

  return (
    <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Update NPC</LoadingButton>
  );
}