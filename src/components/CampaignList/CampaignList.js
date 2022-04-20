import { Col, Container, Row } from "react-bootstrap";
import CampaignListEntry from "./CampaignListEntry";

const containerStyle = { marginTop: "20px" };

export const CampaignList = ({ campaigns = [] }) => {
  return (
    <div>
      <Container style={containerStyle}>
        <Row xs={1} md={2} className="mt-40">
          {campaigns.map((campaign) => (
            <Col>
              <CampaignListEntry campaign={campaign} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CampaignList;
