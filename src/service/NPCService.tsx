import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreDocumentMutation, useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "@components/Button/LoadingButton"
import { NPC } from '@model/NPC';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BaseCharacter } from '@model/BaseCharacter';

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

export const useCreateNPC = (onSuccess: () => void) => {
  const ref = collection(firestore, "npcs");
  const mutation = useFirestoreCollectionMutation(ref, {onSuccess: onSuccess});

  return {
      mutate: (newNPC: BaseCharacter) => mutation.mutate(newNPC),
      isLoading: mutation.isLoading
  }
}

export const useEditNPC = (npc: BaseCharacter | null = null, onSuccess: () => void) => {
  const docId = npc?.docId || "bad value";
  const npcs = collection(firestore, "npcs");
  const ref = doc(npcs, docId) ;
  const mutation = useFirestoreDocumentMutation(ref,{}, {onSettled: onSuccess});
  

  return {
      mutate: (newNPC: BaseCharacter) => {
          delete newNPC?.docId
          mutation.mutate(newNPC)
      },
      isLoading: mutation.isLoading
  }
}

export const useDeleteNPC = (npc: BaseCharacter, onSuccess?: () => void) => {
  const npcs = collection(firestore, "npcs");
  const ref = doc(npcs, npc.docId);
  const mutation = useFirestoreDocumentDeletion(ref, {onSettled: onSuccess});

  return {
      mutate: () => mutation.mutate(),
      isLoading: mutation.isLoading,
      error: mutation.error
  }
}
