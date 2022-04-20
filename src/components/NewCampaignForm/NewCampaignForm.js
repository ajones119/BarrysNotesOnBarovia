import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Campaign } from "../../model/Campaign";
import { saveNewCampaign } from "../../service/CampaignService";
import TextArea from "../FormInputs/TextArea";
import TextInput from "../FormInputs/TextInput";
import { validateTextInputIsNotEmpty } from "../FormInputs/Validators";

export const NewCampaignForm = () => {
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const valid = validateNewCampaignForm();

    if (valid) {
      let newCampaign = new Campaign(
        "",
        campaignTitle,
        campaignImageURL,
        campaignDungeonMaster,
        campaignDescription
      );
      saveNewCampaign(newCampaign);
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
            />
          </Col>
          <Col>
            <TextInput
              setTextFromParent={setCampaignImageURL}
              title="Campaign Image URL"
              invalidInputText={INVALID_CAMPAIGN_IMAGE_URL_TEXT}
              isValidText={isCampaignImageURLValid}
            />
          </Col>
          <Col>
            <TextInput
              setTextFromParent={setCampaignDungeonMaster}
              title="Campaign Dungeon Master"
              invalidInputText={INVALID_CAMPAIGN_DUNGEON_MASTER_TEXT}
              isValidText={isCampaignDungeonMasterValid}
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
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" type="submit">
              Save Campaign
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default NewCampaignForm;
