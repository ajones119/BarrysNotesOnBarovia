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
        //where("isPersonal", "==", false)
    );
  
    const notesQuery = useFirestoreQuery([`${campaignDocId}-campaignNotesList`], ref, { subscribe: true });
    
    const { data, isLoading, refetch } = notesQuery;
  
    const notesData = data?.docs.map(note =>( {...note.data(), docId: note.id, date: note.data()?.date?.toDate()})) || [];

    return { notes: notesData, isLoading, refetch };
  }

  export const useAddNoteButton = (newNote: Note, onClick: () => void, validate: () => boolean) => {
    const ref = collection(firestore, "notes");
    const mutation = useFirestoreCollectionMutation(ref);
    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
  
    const { characterDocId = "", campaignDocId = "", date = "", content = "" } = newNote;
  
    const handleClick = () => {
      const valid = validate();
      console.log("VALID", valid)
      console.log("NOTE", newNote)
      if (valid) {
        mutation.mutate({
            characterDocId,
            campaignDocId,
            date,
            content
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
      <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Save Note</LoadingButton>
    );
  }

export const useDeleteNoteButton = (note: Note, onClick = () => {}) => {
  const col = collection(firestore, "notes");
  const ref = doc(col, note.docId);
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
    <LoadingButton color="error" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}><FontAwesomeIcon icon={faTrash} /></LoadingButton>
  );
}