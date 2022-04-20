import React, { Component } from "react";
import { Button, Row, Col } from "react-bootstrap";
import "../../App.css";
import NewCampaignForm from "../../components/NewCampaignForm/NewCampaignForm";

class NewCampaign extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <div className="content">
          <h1> New Campaign </h1>
          <Row>
            <Col>
              <NewCampaignForm />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default NewCampaign;
