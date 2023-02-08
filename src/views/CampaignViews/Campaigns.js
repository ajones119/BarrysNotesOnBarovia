import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import CampaignList from "../../components/CampaignList/CampaignList";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import NewCampaignForm from "../../components/NewCampaignForm/NewCampaignForm";
import { getCampaigns } from "../../service/CampaignService";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import "../baseViewsStyle.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Campaigns = () => {
  const [campaigns, setCampaigns] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getCampaigns(setCampaigns);
  }, []);

  return (
    <div className="no-scroll-bar">
      <h1 style={{ color: "white" }}>
        Campaigns{" "}
        <Button variant="success" onClick={handleShow}>
          <FontAwesomeIcon icon={faPlusCircle} />
        </Button>
      </h1>
      <CampaignList campaigns={campaigns} />
      <CreateModal
        title="Create Campaign"
        handleClose={handleClose}
        show={show}
        content={<NewCampaignForm handleModalSave={handleClose} />}
      />
    </div>
  );
};

export default Campaigns;
