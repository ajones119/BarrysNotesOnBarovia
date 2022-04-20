import React from "react";
import { useParams } from "react-router-dom";
import "../../App.css";
import NewCampaignForm from "../../components/NewCampaignForm/NewCampaignForm";

export const EditCampaign = () => {
  const { Id: docId } = useParams();

  return (
    <div className="App">
      <div className="content">
        <NewCampaignForm docId={docId} forEdit />
      </div>
    </div>
  );
};

export default EditCampaign;
