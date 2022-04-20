import React, { useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import "../../App.css";
import CampaignList from "../../components/CampaignList/CampaignList";
import { getCampaigns } from "../../service/CampaignService";

export const Campaigns = () => {
  const [campaigns, setCampaigns] = React.useState();

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
              <Button
                variant="success"
                href="/BarrysNotesOnBarovia/#/Campaigns/new-campaign"
              >
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
      </div>
    </div>
  );
};

export default Campaigns;
