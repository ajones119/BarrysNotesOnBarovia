import React, { useState, useEffect } from 'react';
import { collection, doc } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "../components/Button/LoadingButton"
import { Campaign } from '../model/Campaign';
import { Button } from '../components/Button/Button';


export const useUpdateInitiative = (campaign: Campaign, currentDocId: string = "", nextDocId: string = "", onClick: () => void) => {
    const campaignCollection = collection(firestore, "campaigns");
    const ref = doc(campaignCollection, campaign.docId)
    const mutation = useFirestoreDocumentMutation(ref);
    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);

    const campaignCopy = { ...campaign }
    delete(campaignCopy.docId)

    const handleClick = () => {
        mutation.mutate({
            ...campaignCopy,
            currentDocId,
            nextDocId,
        })
  
      setButtonStatus(mutation.status as ButtonStatuses)
      onClick();
    }
  
    useEffect(() => {
      const timer = setTimeout(() => setButtonStatus(ButtonStatuses.Idle), 2000)
      return () => {
        clearTimeout(timer)
      }
    }, [buttonStatus])
  
    return (
      <Button color="success" size="large" onClick={handleClick}>Next Turn</Button>
    );
  }
