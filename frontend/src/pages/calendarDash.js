import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import Calendar from "../components/calendar/calendarItem";
import CalendarEventItem from "../components/calendar/calendarEventItem";

import { SectionHeader } from "../layouts/sectionHeader.js";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/userProvider";
import UserProfileHandler from "../components/profile/utilities/actionHandlers";
import { CalendarContext } from "../context/calendarProvider";

function CalendarDash() {
  const { currentDay } = useContext(CalendarContext);
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const { currentUser } = useContext(UserContext);
  const user = UserProfileHandler(param ? param : currentUser.username);

  return (
    <>
      {user ? (
        <>
          <div className="content">
            <Container className="content-wrapper">
              <SectionHeader>
                {user.username}'s events on {currentDay.toLocaleDateString()}
              </SectionHeader>
              <CalendarEventItem userId={user.id} />
            </Container>
          </div>

          <div className="sidebar_calendarDash">
            <div className="sidebar-wrapper">
              <Container className="content-wrapper">
                <div className="calendar-wrapper">
                  <Calendar userId={user.id} />
                </div>
              </Container>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default CalendarDash;
