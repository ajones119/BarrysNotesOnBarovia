import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../../App.css";
import NewCharacterForm from "../../components/NewCharacterForm/NewCharacterForm";

class NewCharacter extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <div className="content">
          <h1> New Character </h1>
          <Row>
            <Col>
              <NewCharacterForm />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default NewCharacter;
