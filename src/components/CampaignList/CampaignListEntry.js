import { useState } from "react";
import {
  Card,
  Container,
  Button,
  Collapse,
  ButtonGroup,
} from "react-bootstrap";
import defaultBackground from "../../images/homeBackground.jpg";

const style = {
  paddingBottom: "20px",
  display: "block",
  marginRight: "auto",
  marginLeft: "auto",
};

const textStyle = {
  color: "black",
};

export const CampaignListEntry = ({ campaign }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={style}>
      <Container>
        <Button variant="outline-dark" onClick={() => setOpen(!open)}>
          <Card style={{ width: "100%" }}>
            <Card.Img
              variant="top"
              src={campaign.campaignImageURL}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = defaultBackground;
              }}
            />
            <Card.Body>
              <Card.Title style={textStyle}>{campaign.title}</Card.Title>
            </Card.Body>
            <Collapse in={open}>
              <div>
                <Card body style={textStyle}>
                  <ButtonGroup>
                    <Button variant="warning" disabled>
                      Edit the Basics
                    </Button>
                    <Button
                      variant="primary"
                      href={"/#/Campaigns/" + campaign.docId}
                    >
                      View Details
                    </Button>
                  </ButtonGroup>
                </Card>
              </div>
            </Collapse>
          </Card>
        </Button>
      </Container>
    </div>
  );
};

export default CampaignListEntry;

//href={"/#/Campaigns/" + campaign.docId}
