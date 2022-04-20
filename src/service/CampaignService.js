import { Campaign } from "../model/Campaign";
import firebase from "./firebase";

const firestoreDatabase = firebase.firestore().collection("campaigns");

export async function saveNewCampaign(newCampaign) {
  await firestoreDatabase.add({
    title: newCampaign.title,
    campaignImageURL: newCampaign.campaignImageURL,
    dungeonMaster: newCampaign.dungeonMaster,
    description: newCampaign.description,
  });
}

export async function updateCampaign(campaign) {
  await firestoreDatabase.doc(`${campaign.docId}`).set({
    title: campaign.title,
    campaignImageURL: campaign.campaignImageURL,
    dungeonMaster: campaign.dungeonMaster,
    description: campaign.description,
  });
}

export async function getCampaigns(setCampaigns) {
  firestoreDatabase.onSnapshot((querySnapshot) => {
    const campaigns = [];
    querySnapshot.forEach((doc) => {
      campaigns.push(
        new Campaign(
          doc.id,
          doc.data().title,
          doc.data().campaignImageURL,
          doc.data().dungeonMaster,
          doc.data().description
        )
      );
    });

    setCampaigns(campaigns);
  });
}

export async function getCampaignDetailsByDocId(docId, setCampaign) {
  firestoreDatabase
    .doc(`${docId}`)
    .get()
    .then((doc) => {
      let campaign = new Campaign(
        doc.id,
        doc.data().title,
        doc.data().campaignImageURL,
        doc.data().dungeonMaster,
        doc.data().description
      );
      setCampaign(campaign);
    });
}
