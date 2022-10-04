import React from "react";
import { ListGroup } from "react-bootstrap";
import { Col, Container, Row } from "react-bootstrap";
import ReactSwitch from "react-switch";
import ToolsListEntry from "./ToolsListEntry";

const TOOLS = [
  {
    name: "Classes",
    link: "https://www.dndbeyond.com/classes",
  },
  {
    name: "Encounter Builder",
    link: "https://www.dndbeyond.com/encounter-builder",
  },
  {
    name: "Equipment",
    link: "https://www.dndbeyond.com/equipment",
  },
  {
    name: "Feats",
    link: "https://www.dndbeyond.com/feats",
  },
  {
    name: "Initiative Tracker",
    link: "https://www.dndbeyond.com/monsters",
  },
  {
    name: "Magic Items",
    link: "https://www.dndbeyond.com/magic-items",
  },
  {
    name: "Monsters",
    link: "https://www.dndbeyond.com/monsters",
  },
  {
    name: "Random Name Generator",
    link: "https://www.fantasynamegenerators.com/dungeons-and-dragons.php",
  },
  {
    name: "Spells",
    link: "https://www.dndbeyond.com/spells",
  },
];

export const ToolsList = ({ tools = TOOLS }) => {
  return (
    <div>
      <Container>
        <ListGroup variant="flush">
          {tools.map((tool) => (
            <Col>
              <ToolsListEntry tool={tool} />
            </Col>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default ToolsList;
