import { useState } from "react";
import {
  Card,
  Container,
  Button,
  Collapse,
  ButtonGroup,
} from "react-bootstrap";
import defaultBackground from "../../images/homeBackground.jpg";
import { CreateModal } from "../CreateModal/CreateModal";
import NewCampaignForm from "../NewCampaignForm/NewCampaignForm";

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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
                    <Button variant="warning" onClick={handleShow}>
                      Edit the Basics
                    </Button>
                    <Button
                      variant="primary"
                      href={
                        "/BarrysNotesOnBarovia/#/Campaigns/" + campaign.docId
                      }
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
      <CreateModal
        title="Edit Campaign"
        handleClose={handleClose}
        show={show}
        content={
          <NewCampaignForm
            docId={campaign.docId}
            forEdit
            handleModalSave={handleClose}
          />
        }
      />
    </div>
  );
};

export default CampaignListEntry;

//href={"/#/Campaigns/" + campaign.docId}
