import React, { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "@components/Button/LoadingButton"
import { Note } from '@model/Note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export function useCampaignNotes(campaignDocId: string): {notes: Note[], isLoading: boolean, refetch: () => void} {
    const ref = query(
        collection(firestore, "notes"),
        where("campaignDocId", "==", campaignDocId),
    );
  
    const notesQuery = useFirestoreQuery([`${campaignDocId}-campaignNotesList`], ref, { subscribe: true });
    
    const { data, isLoading, refetch } = notesQuery;
  
    const notesData = data?.docs.map(note =>( {...note.data(), docId: note.id, date: note.data()?.date?.toDate()})) || [];

    return { notes: notesData, isLoading, refetch };
  }

  export const useAddNote = (onSuccess?: () => void) => {
    const ref = collection(firestore, "notes");
    const mutation = useFirestoreCollectionMutation(ref, {onSuccess});
  
    return {...mutation, mutate: (newNote: Note) => mutation.mutate(newNote)}
  }

export const useDeleteNote = (noteID: string) => {
  const col = collection(firestore, "notes");
  const ref = doc(col, noteID);
  const mutation = useFirestoreDocumentDeletion(ref);
  return mutation;
}