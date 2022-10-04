import React from "react";
import { Container, Form, Row } from "react-bootstrap";

const style = { whiteSpace: "pre-line" };

export const MainClassSelector = () => {
  return (
    <Container>
      <Row>
        <h4>Class</h4>
      </Row>
      <Row>
        <select id="mainClass">
          <option value="">None</option>
          <option value="Artificer">Artificer</option>
          <option value="Barbarian">Barbarian</option>
          <option value="Bard">Bard</option>
          <option value="Blood Hunter">Blood Hunter</option>
          <option value="Cleric">Cleric</option>
          <option value="Druid">Druid</option>
          <option value="Fighter">Fighter</option>
          <option value="Monk">Monk</option>
          <option value="Paladin">Paladin</option>
          <option value="Ranger">Ranger</option>
          <option value="Rogue">Rogue</option>
          <option value="Sorcerer">Sorcerer</option>
          <option value="Warlock">Warlock</option>
          <option value="Wizard">Wizard</option>
        </select>
      </Row>
    </Container>
  );
};

export default MainClassSelector;
