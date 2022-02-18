import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import img from "../logo192.png";

function Header() {
 

const handleLogout = () => {
    localStorage.clear();
    window.location.reload()
  };
 
  return (
    <div>
      <Navbar collapseOnSelect expand="xl" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/posts">
            <img
              alt=""
              src={img}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            EventMatcher
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Nav className="me-aut">
                <Nav.Link href="#">Account</Nav.Link>
                <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">
                    Support
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;