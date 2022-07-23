import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import img from "../../logo192.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/securityActions";
import UserProfile from "../user-profile";
import Notifications from "../notification";

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showNotif, setShowNotif] = useState(false);

  const handleNotifShow = () => setShowNotif(true);
  const handleNotifClose = () => setShowNotif(false);

  const handleLogout = (e) => {
    /* localStorage.clear();
    window.location.reload() */
    e.preventDefault();
    const token = localStorage.token;

    const refToken = {
      refresh: token,
    };

    dispatch(logout(refToken, navigate));
  };

  return (
    <div>
      <UserProfile accountShow={show} close={handleClose} />
      <Notifications notifShow={showNotif} close={handleNotifClose} />
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
                <Nav.Link href="#" onClick={handleNotifShow}>
                  Notifications
                </Nav.Link>
                <Nav.Link href="#" onClick={handleShow}>
                  Account
                </Nav.Link>

                <Nav.Link
                  href="#"
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                >
                  Logout
                </Nav.Link>
                {/* <NavDropdown title="More" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#">Support</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={(e) => {
                      handleLogout(e);
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
