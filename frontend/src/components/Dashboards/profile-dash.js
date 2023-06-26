import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import Calendar from "../Calendar/calendar";
import CalendarEventItem from "../Calendar/calendar-event-item";
import UserProfile from "../Profile/user-profile";

function ProfileDash() {
  const [currUserData, setCurrUserData] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);

  const child_data = (data) => {
    if (data) {
      setCalendarEvents(data);
    }
  };

  const child_data2 = (data) => {
    if (data) {
      setCurrUserData(data);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container" id="calendar">
        <div className="content">
          <Container>
            <CalendarEventItem calendarEvents={calendarEvents} />
          </Container>
        </div>

        <div className="sidebar_calendarDash">
          <div className="sidebar-wrapper">
            <div className="sidebar_right">
              <Container>
                <Card>
                  <Card.Body>
                    <UserProfile userData={child_data2} />
                  </Card.Body>
                </Card>

                <div className="calendar-wrapper">
                  <Calendar
                    userId={currUserData.id}
                    calendarData={child_data}
                  />
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDash;
