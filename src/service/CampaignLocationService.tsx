import { useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, query, setDoc, where } from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocumentDeletion, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { CampaignLocation } from '@model/Location';
import { uploadBytes, ref as storageRef, getDownloadURL, deleteObject } from "firebase/storage";
import { useMutation } from 'react-query';

export const useCreateCampaignLocation = (onSuccess: () => void) => {
    return useMutation({
        mutationKey: ["add-location"],
        onSuccess,
        mutationFn: async (newLocation: CampaignLocation) => {
            const ref = collection(firestore, "campaignLocations");
            const response = await addDoc(ref, {...newLocation, locationImageURL: ""});
            const id = response.id;
            let imageURL = ""

            if (newLocation?.locationImageURL instanceof File) {
                const imageRef = storageRef(storage, `images/campaignLocations/${id}`);
                await uploadBytes(imageRef, newLocation?.locationImageURL);
                imageURL = await getDownloadURL(imageRef);
            } else {
                imageURL = newLocation?.locationImageURL || "";
            }

            if (imageURL) {
                const locationRef = doc(firestore, "campaignLocations", id);
                await setDoc(locationRef, {
                    locationImageURL: imageURL
            }, {merge: true})
            }
        }
    })
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

export function useEditLocation(onSuccess = () => {}) {
    return useMutation({
        mutationKey: ["edit-location"],
        onSuccess,
        mutationFn: async (location: CampaignLocation) => {
            const docId = location?.docId;
            if (!docId) return;
        
            let imageURL = ""
        
            if (location?.locationImageURL instanceof File) {
                const imageRef = storageRef(storage, `images/campaignLocations/${docId}`);
                await uploadBytes(imageRef, location?.locationImageURL);
                imageURL = await getDownloadURL(imageRef);
            } else {
                imageURL = location?.locationImageURL || "";
            }
        
            delete(location.docId);
            const locationRef = doc(firestore, "campaignLocations", docId)
            await setDoc(locationRef, {
                ...location,
                locationImageURL: imageURL
            })
        }
    })
}

// make sure we only delete locations with no children
export const useDeleteCampaignLocation = (onSuccess = () => {}) => {
    return useMutation({
        mutationKey: ["delete-location"],
        onSuccess,
        mutationFn: async (docid: string) => {
            const imageRef = storageRef(storage,  `images/campaignLocations/${docid}`);
            const docRef = doc(firestore, "campaignLocations", docid)
            await deleteDoc(docRef);
            await deleteObject(imageRef)
        }
    })
}