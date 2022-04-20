import React, { Component } from "react";
import { Nav, Navbar } from "react-bootstrap";

import Barry from "../images/barry-cartoon.png";
class NavBar extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
        <Navbar.Brand href="/BarrysNotesOnBarovia/#/">
          <img
            className="barry-pic"
            src={Barry}
            alt="pic"
            height="30px"
            width="auto"
          />
          BNoB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/BarrysNotesOnBarovia/#/">Home</Nav.Link>
            <Nav.Link href="/BarrysNotesOnBarovia/#/Campaigns/">
              Campaigns
            </Nav.Link>
            <Nav.Link href="/BarrysNotesOnBarovia/#/Characters/">
              Characters
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
