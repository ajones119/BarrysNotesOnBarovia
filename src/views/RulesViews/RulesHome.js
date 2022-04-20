import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Tabs,
  Tab,
  Nav,
  Card,
} from "react-bootstrap";
import "../../App.css";
import Combat from "./Combat";
import Equipment from "./Equipment";

import Mechanics from "./Mechanics";

const cardStyle = { marginTop: "20px" };

export const RulesHome = () => {
  return (
    <div className="App">
      <div className="content">
        <Container>
          <Card style={cardStyle}>
            <Card.Header as="h3">Rules</Card.Header>
            <Tab.Container id="left-tabs" defaultActiveKey="mechanics">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="mechanics">Mechanics</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="equipment">Equipment</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="combat">Combat</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="mechanics">
                      <Mechanics />
                    </Tab.Pane>
                    <Tab.Pane eventKey="equipment">
                      <Equipment />
                    </Tab.Pane>
                    <Tab.Pane eventKey="combat">
                      <Combat />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default RulesHome;
