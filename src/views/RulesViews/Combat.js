import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import "../../App.css";

export const Combat = () => {
  const [key, setKey] = React.useState("home");
  return (
    <Container>
      <Tabs
        id="controlled-tab"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Home">
          <p>Rules Home</p>
        </Tab>
        <Tab eventKey="conditions" title="Conditions">
          <p>Conditions</p>
        </Tab>
        <Tab eventKey="environment" title="Environment">
          <p>Environment</p>
        </Tab>
        <Tab eventKey="movement" title="Movement">
          <p>Environment</p>
        </Tab>
        <Tab eventKey="rest" title="Rest">
          <p>Rest</p>
        </Tab>
        <Tab eventKey="savingThrows" title="Saving Throws">
          <p>SavingThrows</p>
        </Tab>
        <Tab eventKey="time" title="Time">
          <p>Time</p>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Combat;
