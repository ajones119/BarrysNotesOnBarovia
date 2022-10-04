import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Row, Col, Container, Modal } from "react-bootstrap";
import "../../App.css";
import CampaignList from "../../components/CampaignList/CampaignList";
import { CreateModal } from "../../components/CreateModal/CreateModal";
import NewCampaignForm from "../../components/NewCampaignForm/NewCampaignForm";
import { getCampaigns } from "../../service/CampaignService";

export const Campaigns = () => {
  const [campaigns, setCampaigns] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getCampaigns(setCampaigns);
  }, []);

  return (
    <div className="App">
      <div className="content">
        <h1> Campaigns </h1>
        <Container>
          <Row>
            <Col>
              <Button variant="success" onClick={handleShow}>
                Start a New Campaign
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <CampaignList campaigns={campaigns} />
            </Col>
          </Row>
        </Container>
        <CreateModal
          title="Create Campaign"
          handleClose={handleClose}
          show={show}
          content={<NewCampaignForm handleModalSave={handleClose} />}
        />
      </div>
    </div>
  );
};

export default Campaigns;
