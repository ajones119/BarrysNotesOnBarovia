import { collection, doc, query } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Campaign } from "@model/Campaign";

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
  const campaignData = data?.data() || {};
  const campaign: Campaign = {docId: campaignDocId, title: campaignData?.title, ...campaignData}

  return {...campaignQuery, data: campaign};
}

export const useAddCampaignButton = (onSuccess?: () => void) => {
  const ref = collection(firestore, "campaigns");
  const mutation = useFirestoreCollectionMutation(ref, {onSuccess});
  return {...mutation, mutate: (newCampaign: Campaign) => mutation.mutate(newCampaign)}
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
