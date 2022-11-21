import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/securityActions";
import Notifications from "../notification";
import { getCurrentUserProfile } from "../../actions/userActions";
import { io } from "socket.io-client";
import { getNotifications } from "../../actions/notificationActions";

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotif, setShowNotif] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [notif, setNotif] = useState(null);
  const socket = io("ws://localhost:5000");

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  const handleNotifShow = () => setShowNotif(true);
  const handleNotifClose = () => setShowNotif(false);

  const handleLogout = (e) => {
    e.preventDefault();
    const token = localStorage.token;

    const refToken = {
      refresh: token,
    };

    dispatch(logout(refToken, navigate));
    socket.emit("remove", "removed");
  };

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile
  );

  useEffect(() => {
    if (currProfile) {
      setCurrentUser(currProfile.data);
    }
  }, [currProfile]);

  useEffect(() => {
    socket.on("data", (arg) => {
      if (arg) {
        if (arg[0].username.token === localStorage.getItem("username")) {
          console.log(arg);
          dispatch(getNotifications());
        }
      }
    });
  }, [dispatch, socket]);

  var notifications = useSelector(
    (notificationReducer) => notificationReducer.notifications.notifs.results
  );

  useEffect(() => {
    if (notifications) {
      setNotif(notifications.length);
    }
  }, [notifications]);

  console.log(notif);
  return (
    <div>
      <Notifications notifShow={showNotif} close={handleNotifClose} />
      <Navbar
        collapseOnSelect
        expand="xl"
        variant="light"
        fixed="top"
        className="header-blur"
      >
        <Container>
          <Navbar.Brand href="/posts">eventmatcher</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Nav className="me-aut align-items-center gap-3">
                <Nav.Link href="/posts">Dashboard</Nav.Link>
                <Nav.Link onClick={handleNotifShow}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width={20}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </Nav.Link>

                <NavDropdown
                  title={
                    <img
                      src={currentUser ? currentUser.gravatarImage : ""}
                      className="nav_userProf"
                      alt="Img"
                    />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    href={
                      currentUser ? `/profile?user=${currentUser.username}` : ""
                    }
                  >
                    Your profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={(e) => {
                      handleLogout(e);
                    }}
                  >
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
