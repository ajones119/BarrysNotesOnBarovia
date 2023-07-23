import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "../components/Button/LoadingButton"
import { NPC } from '../model/NPC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function useCampaignNPCs(campaignDocId: string) {
  const ref = query(collection(firestore, "npcs"), where("campaignDocId", "==", campaignDocId));

  const NPCsQuery = useFirestoreQuery([`${campaignDocId}-campaignNPCsList`], ref, { subscribe: true });
  
  
  const { data, isLoading, refetch } = NPCsQuery;

  const NPCsData = data?.docs.map(npc => {
    const {
      name,
      characterImageURL,
      backstory,
      campaignDocId,
      statBlockURL
    } = npc.data()
    return new NPC(
      npc.id,
      name,
      characterImageURL,
      backstory,
      campaignDocId,
      statBlockURL
    );
  });

  return { NPCs: NPCsData, isLoading, refetch };
}

export const useAddNPCButton = (newNPC: NPC, onClick: () => void, validate: () => boolean, campaignId: string) => {
  const ref = collection(firestore, "npcs");
  const mutation = useFirestoreCollectionMutation(ref);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);

  const { name = "", characterImageURL = "", backstory = "", statBlockURL = "" } = newNPC;

  const handleClick = () => {

    const valid = validate();
    if (valid) {
      mutation.mutate({ name, characterImageURL, backstory, statBlockURL, campaignDocId: campaignId })
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