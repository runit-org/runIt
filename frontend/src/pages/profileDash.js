import React, { useContext } from "react";
import { Card, Container } from "react-bootstrap";
import Calendar from "../components/calendar/calendarItem";
import CalendarEventItem from "../components/calendar/calendarEventItem";
import UserProfile from "../components/profile/userProfile";
import { CalendarContext } from "../context/calendarProvider";
import VerticalNav from "../layouts/verticalNav";
import { NavigationObj } from "../utilities/navigationObj";
import { useLocation, useSearchParams } from "react-router-dom";
import UserProfileHandler from "../components/profile/utilities/actionHandlers";
import { UserContext } from "../context/userProvider";
import { SectionHeader } from "../layouts/sectionHeader.js";

function ProfileDash() {
  const { currentDay } = useContext(CalendarContext);
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const { currentUser } = useContext(UserContext);
  const user = UserProfileHandler(
    param ? param : currentUser.currentUser.username
  );

  const renderSwitch = (param) => {
    switch (true) {
      case location.pathname.includes("calendar"):
        return {
          center: (
            <>
              <SectionHeader>
                {param.username}'s events on {currentDay.toLocaleDateString()}
              </SectionHeader>
              <CalendarEventItem userId={param.id} />
            </>
          ),
          right: (
            <div className="calendar-wrapper">
              <Calendar userId={param.id} />
            </div>
          ),
        };
      case location.pathname.includes("settings"):
        return {
          center: (
            <Card>
              <Card.Body>
                <UserProfile />
              </Card.Body>
            </Card>
          ),
          right: (
            <Card>
              <Card.Body>
                <UserProfile />
              </Card.Body>
            </Card>
          ),
        };
      case location.pathname.includes("history"):
        return "bar";
      case location.pathname.includes("feedback-support"):
        return "bar";
      default:
        return "foo";
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container" id="calendar">
        <div className="sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar_left">
              <VerticalNav navObj={NavigationObj(user).profileNav} />
            </div>
          </div>
        </div>

        <div className="content">
          <Container className="content-wrapper">
            {renderSwitch(user ? user : "").center}
          </Container>
        </div>

        <div className="sidebar_calendarDash">
          <div className="sidebar-wrapper">
            <Container className="content-wrapper">
              {renderSwitch(user ? user : "").right}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDash;
