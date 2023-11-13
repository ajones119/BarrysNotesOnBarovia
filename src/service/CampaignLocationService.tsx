import { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "@components/Button/LoadingButton";
import { CampaignLocation } from '@model/Location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const useCreateCampaignLocation = (onSuccess: () => void) => {
    const ref = collection(firestore, "campaignLocations");
    const mutation = useFirestoreCollectionMutation(ref);

    useEffect(() => onSuccess(), [mutation.isSuccess])

    return ({
        campaignDocId,
        parentLocationId = "",
        name,
        description = "",
        npcs = [],
        locationImageURL = ""
    }: CampaignLocation) => {
        mutation.mutate({
            campaignDocId,
            parentLocationId,
            name,
            description,
            npcs,
            locationImageURL
        });
    }
}

export function useCampaignLocations(campaignId = "") {
    const ref = query(
        collection(firestore, "campaignLocations"),
        where("campaignDocId", "==", campaignId)
        );
  
    const campaignLocationsQuery = useFirestoreQuery([`${campaignId}-campaignsLocationsList`], ref, { subscribe: true });
    
    const { data, isLoading } = campaignLocationsQuery;
  
    const campaignsLocationsData = data?.docs.map(campaignLocation => {
      const {
        campaignDocId = "",
        name,
        description = "",
        npcs = [],
        parentLocationId = "",
        locationImageURL = ""
      } = campaignLocation.data()

      return {
        docId: campaignLocation.id,
        campaignDocId,
        parentLocationId,
        name,
        description,
        npcs,
        locationImageURL
      };
    });
  
    return { campaignLocations: campaignsLocationsData, isLoading };
}

export function SetCampaignLocation(campaignLocation?: CampaignLocation, onSuccess = () => {}) {
    const campaignLocations = collection(firestore, "campaignLocations");
    const ref = doc(campaignLocations, campaignLocation?.docId || "a");
    const mutation = useFirestoreDocumentMutation(ref);

    useEffect(() => onSuccess(), [mutation.isSuccess])

    return ({
        campaignDocId,
        parentLocationId,
        name,
        description,
        npcs,
        locationImageURL
    }: CampaignLocation) => {
        mutation.mutate({
            campaignDocId,
            parentLocationId,
            name,
            description,
            npcs,
            locationImageURL
        });
    }
}

// ADD NESTED DELETION SO THAT NESTED DATA GET'S DELETED!!!!

export const useDeleteCampaignLocationButton = (campaignLocation?: CampaignLocation, onClick = () => {}, disabled = false) => {
    const col = collection(firestore, "campaignLocations");
    const ref = doc(col, campaignLocation?.docId || "0");
    const mutation = useFirestoreDocumentDeletion(ref);
    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
    
    const handleClick = () => {
      !!location && mutation.mutate();
  
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
      <LoadingButton color="error" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick} disabled={disabled}><FontAwesomeIcon icon={faTrash} /></LoadingButton>
    );
  }