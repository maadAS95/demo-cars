import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import {
  faTwitter,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home">CARS DEMO</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="">About Us</Nav.Link>
        </Nav>
        <Nav style={{ marginLeft: "70%" }}>
          <Nav.Link href="">
            <FontAwesomeIcon icon={faTwitter} />
          </Nav.Link>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faFacebook} />
          </Nav.Link>
          <Nav.Link href="/">
            <FontAwesomeIcon icon={faInstagram} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
