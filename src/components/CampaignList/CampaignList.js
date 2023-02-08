import { Col, Container, Row } from "react-bootstrap";
import CampaignListEntry from "./CampaignListEntry";
import { Grid } from "@mui/material"

const containerStyle = { marginTop: "20px" };

export const CampaignList = ({ campaigns = [] }) => {
  return (
    <div>
      <Grid
        container
        justifyContent="space-around"
        alignItems="center"
        direction="row"
      >
        {campaigns.map((campaign) => (
          <Grid
            item
            xs={6}
            md={4}
            justifyContent="space-around"
            alignItems="center"
            direction="row"
          >
            <CampaignListEntry campaign={campaign} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CampaignList;
