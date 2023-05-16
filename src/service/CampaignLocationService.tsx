import { useState, useEffect } from 'react';
import { collection, doc, query, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { ButtonStatuses, LoadingButton } from "../components/Button/LoadingButton";
import { CampaignLocation } from '../model/Location';


export const useAddCampaignLocationButton = (newCampaignLocation: CampaignLocation, onClick: () => void, validate: () => boolean) => {
    const ref = collection(firestore, "campaignLocations");
    const mutation = useFirestoreCollectionMutation(ref);
    const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);
    console.log("SAVE LOCATION", newCampaignLocation)
    const {
        campaignDocId = "",
        name = "",
        description = "",
        npcs = [],
        parentLocationId,
        childItemIds = [],
        locationImageURL = ""
    } = newCampaignLocation;
  
    const handleClick = () => {
        const valid = validate();
        console.log(valid)
        if (valid) {
        mutation.mutate({ 
            campaignDocId,
            name,
            parentLocationId,
            description,
            npcs,
            childItemIds,
            locationImageURL
        })
        console.log("name", name)
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
        <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Save Base Location</LoadingButton>
    );
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
        childItemIds = [],
        locationImageURL = ""
      } = campaignLocation.data()

      return new CampaignLocation(
        campaignLocation.id,
        campaignDocId,
        parentLocationId,
        name,
        description,
        npcs,
        childItemIds,
        locationImageURL
      );
    });
  
    console.log("LOCATION DATA", campaignsLocationsData)

    return { campaignLocations: campaignsLocationsData, isLoading };
}

export function SetCampaignLocation(campaignLocation: CampaignLocation) {
    const campaignLocations = collection(firestore, "campaignLocations");
    const ref = doc(campaignLocations, campaignLocation.docId);
    const mutation = useFirestoreDocumentMutation(ref);

    return ({
        campaignDocId,
        parentLocationId,
        name,
        description,
        npcs,
        childItemIds,
        locationImageURL
    }: CampaignLocation) => {
        mutation.mutate({
            campaignDocId,
            parentLocationId,
            name,
            description,
            npcs,
            childItemIds,
            locationImageURL
        });
    }
}