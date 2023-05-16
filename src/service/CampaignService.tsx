import { useState, useEffect } from 'react';
import { collection, doc, query } from "firebase/firestore";
import { firestore } from "./firebase";
import { useFirestoreCollectionMutation, useFirestoreDocument, useFirestoreQuery } from "@react-query-firebase/firestore";
import { Campaign } from "../model/Campaign";
import { ButtonStatuses, LoadingButton } from "../components/Button/LoadingButton";

export function useCampaigns() {
  const ref = query(collection(firestore, "campaigns"));

  const campaignQuery = useFirestoreQuery(["campaignsList"], ref, { subscribe: true });
  
  const { data, isLoading } = campaignQuery;

  const campaignsData = data?.docs.map(campaign => {
    const {
        title,
        campaignImageURL,
        dungeonMaster,
        description
    } = campaign.data()
    return new Campaign(
        campaign.id,
        title,
        campaignImageURL,
        dungeonMaster,
        description
    );
  });

  return { campaigns: campaignsData, isLoading };
}

export function useCampaign(campaignDocId: string) {
  const ref = doc(firestore, "campaigns", campaignDocId);

  const campaignQuery = useFirestoreDocument(["singleCampaign", campaignDocId], ref);
  
  const { data, isLoading } = campaignQuery;

  const campaignData = data?.data() || {};

  const campaign = new Campaign(
    campaignData.docId,
    campaignData.title,
    campaignData.campaignImageURL,
    campaignData.dungeonMaster,
    campaignData.description,
  );

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
    <LoadingButton color="success" size="large" isLoading={mutation.isLoading} status={buttonStatus} onClick={handleClick}>Save Campaign</LoadingButton>
  );
}