import { useState, useEffect } from 'react';
import { collection, doc, query } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreDocumentMutation, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Campaign } from "@model/Campaign";
import { ButtonStatuses, LoadingButton } from "@components/Button/LoadingButton";

export function useCampaigns(): {campaigns: Campaign[], isLoading: boolean} {
  const ref = query(collection(firestore, "campaigns"));

  const campaignQuery = useFirestoreQuery(["campaignsList"], ref, { subscribe: true });
  
  const { data, isLoading } = campaignQuery;

  const campaignsData = data?.docs.map(campaign => ({ docId: campaign.id, ...campaign.data()} as Campaign)) || [];

  return { campaigns: campaignsData, isLoading };
}

export function useCampaign(campaignDocId: string = ""): {campaign: Campaign, isLoading: boolean} {
  const ref = doc(firestore, "campaigns", campaignDocId);

  const campaignQuery = useFirestoreDocument(["singleCampaign", campaignDocId], ref, {subscribe: true});
  
  const { data, isLoading } = campaignQuery;

  const campaignData = data?.data() || {};

  const campaign: Campaign = {docId: campaignDocId, title: campaignData?.title, ...campaignData}

  return { campaign, isLoading };
}

export const useAddCampaignButton = (newCampaign: Campaign, onClick: () => void, validate: () => boolean) => {
  const ref = collection(firestore, "campaigns");
  const mutation = useFirestoreCollectionMutation(ref);
  const [buttonStatus, setButtonStatus] = useState<ButtonStatuses>(ButtonStatuses.Idle);

  const { title = "", campaignImageURL = "", dungeonMaster = "", description = "" } = newCampaign;

  const handleClick = () => {
    const valid = validate();
    if (valid) {
      mutation.mutate({ title, campaignImageURL, dungeonMaster, description })
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
    <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Save Campaign</LoadingButton>
  );
}

export const useUpdateCampaign = (campaign: Campaign) => {
  const campaignCollection = collection(firestore, "campaigns");
  const ref = doc(campaignCollection, campaign.docId)
  const mutation = useFirestoreDocumentMutation(ref);

  const update = (updatedCampaign: Campaign) => {
    delete(updatedCampaign.docId)
      mutation.mutate({
          ...updatedCampaign
      })
    }

  return update;
}
