import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/actions/securityActions";
import Notifications from "../components/Notification/notification";
import { getCurrentUserProfile } from "../services/actions/userActions";
import { receiver } from "../components/client/socket";
import { getNotifications } from "../services/actions/notificationActions";
import { AppLogo, Notification } from "./icons";
import Cookies from "js-cookie";
import UserStatus from "../components/Profile/user-status";

function Header() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [showNotif, setShowNotif] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [notifs, setNotifData] = useState([]);
  const [unreadCount, setUnreadCount] = useState("");
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

  // get current user
  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile
  );

  useEffect(() => {
    if (currProfile) {
      setCurrentUser(currProfile.data);
    }
  }, [currProfile]);

  //get notifications
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
        expand="sm"
        variant="light"
        // fixed="top"
        className="header-blur"
      >
        <Container>
          <Navbar.Brand href="/posts">
            <AppLogo w={"50px"} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto ms-4">
              <div className="responsive-elements">
                {" "}
                <Nav.Link className="button-wrapper mb-1" as="div">
                  <UserStatus />
                </Nav.Link>
              </div>
              <Nav.Link href="/posts">Dashboard</Nav.Link>
              <Nav.Link
                href={
                  currentUser ? `/profile?user=${currentUser.username}` : ""
                }
              >
                Calendar
              </Nav.Link>

              <div className="responsive-elements">
                <Nav.Link onClick={handleNotifShow}>Notifications</Nav.Link>

                <Nav.Link
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                  className="w-100"
                  data-testid="logout-btn-responsive"
                >
                  Sign out
                </Nav.Link>
              </div>
            </Nav>
            <Nav className=" align-items-center gap-1">
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
                <NavDropdown.Item className="button-wrapper mb-1" as="div">
                  <UserStatus />
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={
                    currentUser ? `/profile?user=${currentUser.username}` : ""
                  }
                >
                  Your Profile
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                  data-testid="logout-btn"
                >
                  Sign out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
