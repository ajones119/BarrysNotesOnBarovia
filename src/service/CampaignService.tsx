import { addDoc, collection, doc, query, setDoc} from "firebase/firestore";
import { firestore, storage } from "./firebase";
import { useFirestoreDocument, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Campaign } from "@model/Campaign";
import { useMutation } from "react-query";
import { uploadBytes, ref as storageRef, getDownloadURL } from "firebase/storage";

export function useCampaigns(): {campaigns: Campaign[], isLoading: boolean} {
  const ref = query(collection(firestore, "campaigns"));
  const campaignQuery = useFirestoreQuery(["campaignsList"], ref, { subscribe: true });
  const { data, isLoading } = campaignQuery;
  const campaignsData = data?.docs.map(campaign => ({ docId: campaign.id, ...campaign.data()} as Campaign)) || [];

  return { campaigns: campaignsData, isLoading };
}

export function useCampaign(campaignDocId: string = "") {
  const ref = doc(firestore, "campaigns", campaignDocId);
  const campaignQuery = useFirestoreDocument(["singleCampaign", campaignDocId], ref, {subscribe: true});
  const { data } = campaignQuery;
  const campaignData = data?.data() as Campaign;
  const campaign = {docId: campaignDocId, ...campaignData}

  return {...campaignQuery, data: campaign};
}

export const useAddCampaignButton = (onSuccess?: () => void) => {
  const ref = collection(firestore, "campaigns");
  return useMutation({
    mutationKey: ["addCampaign"],
    mutationFn: async ({newCampaign, image}: {newCampaign: Campaign, image: File}) => {
      const response = await addDoc(ref, {...newCampaign});
      const id = response.id;

      const imageRef = storageRef(storage, `images/campaigns/${id}`);
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef)
      const campaignDocRef = doc(firestore, 'campaigns', id)
      await setDoc(campaignDocRef, {
        campaignImageURL: downloadURL
      }, {merge: true})
    },
    onSuccess
  })
}

export const useUpdateCampaign = (campaignID: string) => {
  const campaignCollection = collection(firestore, "campaigns");
  const ref = doc(campaignCollection, campaignID)
  const mutation = useFirestoreDocumentMutation(ref);

  const update = (updatedCampaign: Campaign) => {
    delete(updatedCampaign.docId)
      mutation.mutate({
          ...updatedCampaign
      })
    }

  return update;
}
