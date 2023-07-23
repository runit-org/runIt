import React, { useContext, useState } from "react";
import { Card, Container } from "react-bootstrap";
import Calendar from "../components/calendar/calendarItem";
import CalendarEventItem from "../components/calendar/calendarEventItem";
import UserProfile from "../components/profile/userProfile";
import { DayEventsHandler } from "../components/calendar/utilities/actionHandler";
import { CalendarContext } from "../context/calendarProvider";

function ProfileDash() {
  const [currUserData, setCurrUserData] = useState([]);
  const { currentDay } = useContext(CalendarContext);

  const dayEvents = DayEventsHandler(
    currUserData.id,
    currentDay.getDate(),
    currentDay.getMonth() + 1,
    currentDay.getFullYear()
  );

  const child_data = (data) => {
    if (data) {
      setCurrUserData(data);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container" id="calendar">
        <div className="content">
          <Container className="content-wrapper">
            <div className="ps-1">
              <p className="fw-bold m-0">
                {currUserData.username}'s events on{" "}
                {currentDay.toLocaleDateString()}
              </p>
            </div>
            <CalendarEventItem calendarEvents={dayEvents ? dayEvents : ""} />
          </Container>
        </div>

        <div className="sidebar_calendarDash">
          <div className="sidebar-wrapper">
            <Container className="content-wrapper">
              <Card>
                <Card.Body>
                  <UserProfile userData={child_data} />
                </Card.Body>
              </Card>

              <div className="calendar-wrapper">
                <Calendar userId={currUserData.id} />
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDash;