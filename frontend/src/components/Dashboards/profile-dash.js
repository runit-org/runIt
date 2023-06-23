import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Calendar from "../Calendar/calendar";
import CalendarEventItem from "../Calendar/calendar-event-item";
import { UserContext } from "../Context/user-context";

function ProfileDash() {
  // eslint-disable-next-line no-unused-vars
  const [calendarEvents, setCalendarEvents] = useState([]);
  const contextUser = useContext(UserContext);

  const child_data = (data) => {
    if (data) {
      setCalendarEvents(data);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container" id="calendar">
        <div className="content">
          <Container>
            <Calendar userId={contextUser.id} calendarData={child_data} />
          </Container>
        </div>

        <div className="sidebar_calendarDash">
          <div className="sidebar-wrapper">
            <div className="sidebar_right">
              <Container>
                <CalendarEventItem calendarEvents={calendarEvents} />
              </Container>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDash;
