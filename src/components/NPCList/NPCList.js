import { Col, Container, Row } from "react-bootstrap";
import NPCListEntry from "./NPCListEntry";

const containerStyle = { marginTop: "20px" };

export const NPCList = ({ npcs = [] }) => {
  return (
    <div>
      <Container style={containerStyle}>
        <Row xs={1} md={2} className="mt-40">
          {npcs.map((npc) => (
            <Col>
              <NPCListEntry npc={npc} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default NPCList;
