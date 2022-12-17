import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/securityActions";
import Notifications from "../notification";
import { getCurrentUserProfile } from "../../actions/userActions";
import { receiver } from "../client/socket";
import { getNotifications } from "../../actions/notificationActions";
import { AppLogo, Notification } from "./icons";
import Cookies from "js-cookie";

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotif, setShowNotif] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [notifs, setNotifData] = useState([]);
  const [unreadCount, setUnreadCount] = useState("");

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  const handleNotifShow = () => setShowNotif(true);
  const handleNotifClose = () => setShowNotif(false);

  const handleLogout = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    const refToken = {
      refresh: token,
    };

    dispatch(logout(refToken, navigate));
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
    dispatch(getNotifications());
  }, [dispatch]);

  var notifications = useSelector(
    (notificationReducer) => notificationReducer.notifications.notifs.results
  );

  useEffect(() => {
    if (notifications) {
      setNotifData(notifications);
    }
  }, [notifications]);

  useEffect(() => {
    setUnreadCount(
      notifs.filter((notif) => notif.statusName === "UNREAD").length
    );
  }, [notifs]);

  useEffect(() => {
    receiver(dispatch);
  }, [dispatch]);

  return (
    <div>
      <Notifications
        notifShow={showNotif}
        close={handleNotifClose}
        notifs={notifs}
      />
      <Navbar
        collapseOnSelect
        expand="xl"
        variant="light"
        fixed="top"
        className="header-blur"
      >
        <Container>
          <Navbar.Brand href="/posts">
            <AppLogo w={"50px"} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text id="nav-end-items">
              <Nav className="me-aut align-items-center gap-3">
                <Nav.Link href="/posts">Dashboard</Nav.Link>
                <Nav.Link onClick={handleNotifShow} id="notification-icon">
                  <Notification />
                  {notifs ? (
                    unreadCount > 0 ? (
                      <div className="notification-badge" />
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
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
