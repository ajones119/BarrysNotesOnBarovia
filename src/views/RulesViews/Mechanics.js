import React from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import "../../App.css";
import Conditions from "../../components/Rules/Mechanics/Conditions";
import Environment from "../../components/Rules/Mechanics/Environment";
import Movement from "../../components/Rules/Mechanics/Movement";
import Resting from "../../components/Rules/Mechanics/Resting";

export const Mechanics = () => {
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
          <Conditions />
        </Tab>
        <Tab eventKey="environment" title="Environment">
          <Environment />
        </Tab>
        <Tab eventKey="movement" title="Movement">
          <Movement />
        </Tab>
        <Tab eventKey="rest" title="Resting">
          <Resting />
        </Tab>
        <Tab eventKey="savingThrows" title="Abilities">
          <p>Abilities</p>
        </Tab>
        <Tab eventKey="time" title="Time">
          <p>Time</p>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Mechanics;
