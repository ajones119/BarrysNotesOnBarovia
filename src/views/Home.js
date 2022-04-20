import React, { Component } from "react";
import "../App.css";
import { Col, Row } from "react-bootstrap";

import Barry from "../images/barry-cartoon.png";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <div className="content">
          <h1> Barry's Notes on Barovia</h1>
          <h3>
            {" "}
            Barry The Barovian's recollections on The Valley of Barovia and the
            adventurers who ...
          </h3>
          <Row>
            <Col>
              <img className="barry-pic" src={Barry} alt="pic" />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
