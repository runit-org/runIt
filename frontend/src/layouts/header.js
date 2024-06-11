import React, { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../components/notification/notification";
import { getCurrentUserProfile } from "../services/actions/userActions";
import { receiver } from "../components/client/socket";
import { getNotifications } from "../services/actions/notificationActions";
import { AppLogo, Notification } from "./icons";
import UserStatus from "../components/profile/userStatus";
import { useHandleLogout } from "../hooks/useHandleLogout";
import { VerifiedRender } from "../routes/verifiedRender";
import { POSTS, PROFILE, SETTINGS } from "../routes/routes";
import { NavigationObj } from "../utilities/navigationObj";
import { UserContext } from "../context/userProvider";
import { Loading } from "./loader";

function Header() {
  const dispatch = useDispatch();
  const [showNotif, setShowNotif] = useState(false);
  const [notifs, setNotifData] = useState([]);
  const [unreadCount, setUnreadCount] = useState("");
  const handleNotifShow = () => setShowNotif(true);
  const handleNotifClose = () => setShowNotif(false);
  const logout = useHandleLogout();

  // get current user
  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  const { currentUser } = useContext(UserContext);

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
        className="header-blur"
      >
        <Container>
          <Navbar.Brand href={`/${POSTS}`}>
            <AppLogo w={"50px"} />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto ms-4">
              <div className="responsive-elements">
                <VerifiedRender>
                  <Nav.Link className="button-wrapper mb-1" as="div">
                    <UserStatus />
                  </Nav.Link>
                </VerifiedRender>
                <Nav.Link onClick={handleNotifShow}>Notifications</Nav.Link>
                {NavigationObj(currentUser).profileNavCurrUser.map(
                  (item, index) => {
                    return (
                      <Nav.Link href={`/${PROFILE}/${item.href}`} key={index}>
                        {item.title}
                      </Nav.Link>
                    );
                  }
                )}
                <Nav.Link
                  onClick={(e) => {
                    logout(e);
                  }}
                  className="w-100"
                  data-testid="logout-btn-responsive"
                >
                  Sign out
                </Nav.Link>
              </div>
            </Nav>
            {/* notification */}
            <Nav className=" align-items-center gap-1">
              <Nav.Link onClick={handleNotifShow} id="notification-icon">
                <Notification />
                {notifs && unreadCount > 0 && (
                  <div className="notification-badge" />
                )}
              </Nav.Link>
              {/* dropdown */}
              <NavDropdown
                title={
                  currentUser.gravatarImage ? (
                    <img
                      src={currentUser.gravatarImage}
                      className="nav_userProf"
                      alt="Img"
                      loading="lazy"
                    />
                  ) : (
                    <Loading />
                  )
                }
                id="basic-nav-dropdown"
              >
                <VerifiedRender>
                  <NavDropdown.Item className="button-wrapper mb-1" as="div">
                    <UserStatus />
                  </NavDropdown.Item>
                </VerifiedRender>
                <NavDropdown.Item
                  href={
                    currentUser
                      ? `/${PROFILE}/${SETTINGS}?user=${currentUser.username}`
                      : ""
                  }
                >
                  Your Profile
                </NavDropdown.Item>

                <NavDropdown.Item
                  onClick={(e) => {
                    logout(e);
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
