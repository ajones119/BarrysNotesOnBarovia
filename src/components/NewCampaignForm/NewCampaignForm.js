import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Campaign } from "../../model/Campaign";
import {
  getCampaignDetailsByDocId,
  saveNewCampaign,
  updateCampaign,
} from "../../service/CampaignService";
import TextArea from "../FormInputs/TextArea";
import TextInput from "../FormInputs/TextInput";
import { validateTextInputIsNotEmpty } from "../FormInputs/Validators";

const style = { marginTop: "5px", marginBottom: "5px" };

export const NewCampaignForm = ({ forEdit = false, docId }) => {
  const INVALID_CAMPAIGN_TITLE_TEXT = "Must be a valid Campaign Title";
  const INVALID_CAMPAIGN_IMAGE_URL_TEXT = "Must be a valid Campaign image URL";
  const INVALID_CAMPAIGN_DUNGEON_MASTER_TEXT = "Must be a valid Dungeon Master";

  const [campaignTitle, setCampaignTitle] = React.useState("");
  const [isCampaignTitleValid, setIsCampaignTitleValid] = React.useState(true);
  const [campaignImageURL, setCampaignImageURL] = React.useState("");
  const [isCampaignImageURLValid, setIsCampaignImageURLValid] =
    React.useState(true);
  const [campaignDungeonMaster, setCampaignDungeonMaster] = React.useState("");
  const [isCampaignDungeonMasterValid, setIsCampaignDungeonMasterValid] =
    React.useState(true);
  const [campaignDescription, setCampaignDescription] = React.useState("");
  const [campaign, setCampaign] = React.useState({});

  const history = useHistory();

  useEffect(() => {
    if (docId && forEdit) {
      getCampaignDetailsByDocId(docId, setCampaign);
    }
  }, [docId]);

  useEffect(() => {
    if (campaign.docId && forEdit) {
      setCampaignTitle(campaign.title);
      setCampaignImageURL(campaign.campaignImageURL);
      setCampaignDungeonMaster(campaign.dungeonMaster);
      setCampaignDescription(campaign.description);
    }
  }, [campaign]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const valid = validateNewCampaignForm();

    if (valid) {
      let newCampaign = new Campaign(
        docId ? docId : "",
        campaignTitle,
        campaignImageURL,
        campaignDungeonMaster,
        campaignDescription
      );
      if (forEdit && docId) {
        updateCampaign(newCampaign).then(() => {
          history.push("/Campaigns/");
        });
      } else {
        saveNewCampaign(newCampaign).then(() => {
          history.push("/Campaigns/");
        });
      }
    }
  };

  const validateNewCampaignForm = () => {
    validateTextInputIsNotEmpty(setIsCampaignTitleValid, campaignTitle);
    validateTextInputIsNotEmpty(setIsCampaignImageURLValid, campaignImageURL);
    validateTextInputIsNotEmpty(
      setIsCampaignDungeonMasterValid,
      campaignDungeonMaster
    );

    return isCampaignTitleValid && isCampaignImageURLValid;
  };

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Row>
          <Col>
            <TextInput
              setTextFromParent={setCampaignTitle}
              title="Campaign Title"
              invalidInputText={INVALID_CAMPAIGN_TITLE_TEXT}
              isValidText={isCampaignTitleValid}
              defaultValue={campaign ? campaign.title : ""}
            />
          </Col>
          <Col>
            <TextInput
              setTextFromParent={setCampaignImageURL}
              title="Campaign Image URL"
              invalidInputText={INVALID_CAMPAIGN_IMAGE_URL_TEXT}
              isValidText={isCampaignImageURLValid}
              defaultValue={campaign ? campaign.campaignImageURL : ""}
            />
          </Col>
          <Col>
            <TextInput
              setTextFromParent={setCampaignDungeonMaster}
              title="Campaign Dungeon Master"
              invalidInputText={INVALID_CAMPAIGN_DUNGEON_MASTER_TEXT}
              isValidText={isCampaignDungeonMasterValid}
              defaultValue={campaign ? campaign.dungeonMaster : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <TextArea
              setTextFromParent={setCampaignDescription}
              title="Campaign Description"
              rows="5"
              cols="100"
              invalidInputText=""
              isValidText={true}
              defaultValue={campaign ? campaign.description : ""}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="submit" style={style}>
              Save Campaign
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default NewCampaignForm;
