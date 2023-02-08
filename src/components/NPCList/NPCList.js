import { Grid } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import NPCListEntry from "./NPCListEntry";

const containerStyle = { marginTop: "20px" };

export const NPCList = ({ npcs = [] }) => {
  return (
    <div>
      <Grid container direction="row" justifyItems="center" alignItems="space-around" style={containerStyle}>
        {npcs
          .slice(0)
          .reverse()
          .map((npc) => (
            <Grid item xs={12} md={4}>
              <NPCListEntry npc={npc} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default NPCList;
